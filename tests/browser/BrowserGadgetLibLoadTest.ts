import type { WikimediaStream } from '../..';
import type { EventEmitter } from 'events';
import BrowserHelper from './BrowserHelper';
import * as path from 'path';
import fs from 'fs/promises';
import { testWikimediaStreams } from './CommonBrowserTestChecks';

declare global {
	interface Window {
		mw: {
			loader: {
				moduleRegistry: Record<string, any>;
				getState( module: string ): string;
				using( modules: string[], callback?: ( ...args: any[] ) => void ):
					Promise<( module: string ) => any>;
			}
		};
		EventEmitter: typeof EventEmitter;
		WikimediaStream: { WikimediaStream: typeof WikimediaStream };
	}
}

const libPath = path.join( __dirname, '..', '..', 'dist', 'browser', 'lib.js' );

describe( 'Module load test: Browser (Gadget library)', () => {

	let page: BrowserHelper;

	beforeAll( async () => {
		page = await BrowserHelper.build()
			.then( p => p.loadWikipediaPage( 'Wikipedia:Sandbox' ) )
			.then( async p => {
				await p.executeScript(
					( await fs.readFile( path.join( __dirname, 'gadget-mock.js' ) ) )
						.toString( 'utf8' )
						.replace(
							/\/\/ \{\{\{lib\.js}}}/,
							( await fs.readFile( libPath ) )
								.toString( 'utf8' )
						)
				);
				return p;
			} )
			.then( async p => {
				await p.wait( () => {
					return p.executeScript( `
						return mw.loader.moduleRegistry[
							'ext.gadget.wikimedia-streams'
						].state === 'ready'
					` );
				} );
				return p;
			} );
	} );

	afterAll( async () => {
		await page.close();
	} );

	test( 'resource is defined', async () => {
		await expect( page.evaluate(
			() => window.mw.loader.using( [ 'ext.gadget.wikimedia-streams' ] )
				.then( () => {
					return window.mw.loader.moduleRegistry[ 'ext.gadget.wikimedia-streams' ].state;
				} )
		) ).resolves.toBe( 'ready' );
		await expect( page.evaluate( () => {
			return new Promise( ( res, rej ) => {
				setTimeout( () => {
					rej( new Error( 'Script did not load in time' ) );
				}, 10e3 );
				window.mw.loader.using( [ 'ext.gadget.wikimedia-streams' ] )
					.then( ( require ) => {
						const WikimediaStream = require( 'ext.gadget.wikimedia-streams' );
						window.WikimediaStream = WikimediaStream;
						res( typeof WikimediaStream.default );
					} );
			} );
		} ) ).resolves.toBe( 'function' );
	} );

	testWikimediaStreams( () => page );

} );
