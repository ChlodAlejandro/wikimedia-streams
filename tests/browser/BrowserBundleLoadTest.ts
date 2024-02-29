import type { WikimediaStream } from '../..';
import type { EventEmitter } from 'events';
import BrowserHelper from './BrowserHelper';
import * as path from 'path';
import { testWikimediaStreams } from './CommonBrowserTestChecks';

declare global {
	interface Window {
		EventEmitter: typeof EventEmitter;
		WikimediaStream: { WikimediaStream: typeof WikimediaStream };
	}
}

describe( 'Module load test: Browser (UMD bundle)', () => {

	let page: BrowserHelper;

	beforeAll( async () => {
		page = await BrowserHelper.build()
			.then( p => p.loadWikipediaPage( 'Wikipedia:Sandbox' ) )
			.then( p =>
				p.loadScript( path.join( __dirname, '..', '..', 'dist', 'browser', 'bundle.js' ) )
			);
	} );

	afterAll( async () => {
		await page.close();
	} );

	testWikimediaStreams( () => page );

} );
