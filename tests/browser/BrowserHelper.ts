// https://github.com/ChlodAlejandro/deputy/blob/80a82f7/tests/util/BrowserHelper.ts

import * as webdriver from 'selenium-webdriver';
import { error } from 'selenium-webdriver';
import type { Executor } from 'selenium-webdriver/lib/command';
import * as chrome from 'selenium-webdriver/chrome';
import * as firefox from 'selenium-webdriver/firefox';
import * as fs from 'fs/promises';
import { FileHandle } from 'fs/promises';
import * as path from 'path';
import axios from 'axios';
import WebDriverError = error.WebDriverError;

type PromiseOrNot<T> = T | Promise<T>;

/**
 * Utility class for handling a browser environment during tests.
 */
export default class BrowserHelper extends webdriver.WebDriver {

	static readonly artifactFolder = path.resolve( __dirname, '..', 'artifacts' );

	/**
	 * Builds a BrowserHelper.
	 */
	static async build() {
		const browser = ( process.env.BROWSER || 'chrome' ).toLowerCase();
		const size = { width: 1280, height: 768 };

		const chromeOpts = new chrome.Options()
			.windowSize( size );
		const firefoxOpts = new firefox.Options()
			.windowSize( size );

		if ( ![ '0', 'false', 'no', '' ].includes( process.env.HEADLESS?.toLowerCase() ) ) {
			chromeOpts.addArguments( '--headless=new' );

			if ( browser === 'firefox' ) {
				firefoxOpts.addArguments( '--headless' );
			}
		}

		const logOptions = new webdriver.logging.Preferences();
		logOptions.setLevel( webdriver.logging.Type.BROWSER, webdriver.logging.Level.ALL );
		logOptions.setLevel( webdriver.logging.Type.CLIENT, webdriver.logging.Level.ALL );
		logOptions.setLevel( webdriver.logging.Type.DRIVER, webdriver.logging.Level.ALL );
		logOptions.setLevel( webdriver.logging.Type.PERFORMANCE, webdriver.logging.Level.ALL );
		logOptions.setLevel( webdriver.logging.Type.SERVER, webdriver.logging.Level.ALL );

		chromeOpts.setLoggingPrefs( logOptions );
		firefoxOpts.setLoggingPrefs( logOptions );

		const driver = await new webdriver.Builder()
			.setChromeOptions( chromeOpts )
			.setFirefoxOptions( firefoxOpts )
			.forBrowser( browser )
			.build();

		const logStreams: Record<string, FileHandle> = {};
		try {
			for ( const stream of await driver.manage().logs().getAvailableLogTypes() ) {
				// eslint-disable-next-line security/detect-non-literal-fs-filename
				if ( fs.stat( BrowserHelper.artifactFolder ).catch( () => false ) ) {
					// eslint-disable-next-line security/detect-non-literal-fs-filename
					await fs.mkdir( BrowserHelper.artifactFolder, { recursive: true } );
				}

				// eslint-disable-next-line security/detect-non-literal-fs-filename
				logStreams[ stream ] = ( await fs.open(
					path.join( BrowserHelper.artifactFolder, `selenium-${
						stream.toLowerCase()
					}.log` ), 'a'
				) );
			}
		} catch ( e ) {
			console.warn( 'Browser does not support logs. Going in blind.', e );
		}

		return new BrowserHelper( driver.getSession(), driver.getExecutor(), logStreams );
	}

	private readonly logStreams: Record<string, FileHandle>;

	/**
	 *
	 * @param session
	 * @param executor
	 * @param logStreams
	 */
	constructor(
		session: PromiseOrNot<webdriver.Session>,
		executor: Executor,
		logStreams?: Record<string, FileHandle>
	) {
		super( session, executor );

		if ( logStreams ) {
			this.logStreams = logStreams;
		}
	}

	/**
	 * @inheritDoc
	 */
	async close(): Promise<void> {
		await this.dumpLogs();
		await super.close();

		if ( this.logStreams ) {
			for ( const stream of Object.values( this.logStreams ) ) {
				await stream.close();
			}
		}
	}

	/**
	 * Dumps all logs to the artifacts folder.
	 */
	async dumpLogs(): Promise<void> {
		const writePromises: Promise<any>[] = [];
		for ( const [ type, stream ] of Object.entries( this.logStreams ) ) {
			const logs = await this.manage().logs().get( type );

			for ( const entry of logs ) {
				writePromises.push(
					stream.write( `[${
						new Date( entry.timestamp ).toISOString()
					}][${
						entry.level
					}]${
						entry.type ? `[${entry.type}]` : ''
					} ${ entry.message }` )
				);
			}
		}
		await Promise.all( writePromises ).catch( ( e ) => {
			console.error( 'Error occurred when dumping logs.', e );
		} );
	}

	/**
	 * Loads a Wikipedia page.
	 *
	 * @param targetPage
	 * @param testWiki
	 */
	async loadWikipediaPage(
		targetPage: string,
		testWiki?: boolean
	): Promise<BrowserHelper> {
		await this.get(
			`https://${testWiki ? 'test' : 'en'}.wikipedia.org/wiki/${
				encodeURIComponent( targetPage.trim().replace( / /g, '_' ) )
			}`
		);
		await this.wait( () => {
			// Wait until ResourceLoader is ready for use.
			return this.executeScript( 'return ((window.mw || {}).loader || {}).using' );
		} );
		return this;
	}

	/**
	 * Loads a given script.
	 * @param scriptPath
	 */
	async loadScript( scriptPath: string ): Promise<BrowserHelper> {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		const script = await fs.readFile( scriptPath )
			.then( f => f.toString( 'utf8' ) );
		await this.executeScript( script );
		return this;
	}

	/**
	 * Loads a given script from a URL.
	 * @param scriptUrl
	 * @param extras
	 */
	async loadRemoteScript( scriptUrl: string, extras = '' ): Promise<BrowserHelper> {
		const script = await axios.get( scriptUrl, { responseType: 'text' } )
			.then( r => r.data );
		await this.executeScript( script + '\n' + extras );
		return this;
	}

	/**
	 * Take a screenshot of the active window.
	 *
	 * @return PNG binary data.
	 */
	async screenshot(): Promise<Buffer> {
		return Buffer.from( await this.takeScreenshot(), 'base64' );
	}

	/**
	 *
	 * @param func
	 * @param {...any} args
	 */
	async evaluate<T, U extends ( ...args: any[] ) => PromiseOrNot<T>>(
		func: U,
		...args: Parameters<U>
	): Promise<T> {
		const buildPromise = () => this.executeAsyncScript<T>(
			async function (
				_func: string,
				_args: Parameters<U>,
				callback: ( result: T ) => void
			) {
				// eslint-disable-next-line no-eval,security/detect-eval-with-expression
				callback( await eval( _func )( ..._args ) );
			}, func, args
		);

		let retryCount = 0;
		let success = false;

		while ( !success && retryCount < 5 ) {
			const result = await buildPromise()
				// eslint-disable-next-line @typescript-eslint/no-loop-func
				.then( ( res ) => {
					success = true;
					return res;
				} )
				// eslint-disable-next-line @typescript-eslint/no-loop-func
				.catch( ( e ) => {
					console.warn( `Error when attempting to evaluate script (try ${
						retryCount + 1
					} of 5)`, e );
					success = false;
					return null;
				} );

			if ( !success ) {
				retryCount++;
			} else {
				return result;
			}
		}

		throw new WebDriverError( "Couldn't evaluate script" );
	}

}
