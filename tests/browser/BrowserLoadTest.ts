import type { WikimediaStream } from '../..';
import type { EventEmitter } from 'events';
import BrowserHelper from './BrowserHelper';
import * as path from 'path';

declare global {
	interface Window {
		EventEmitter: typeof EventEmitter;
		WikimediaStream: { WikimediaStream: typeof WikimediaStream };
	}
}

const ee3Url = 'https://tools-static.wmflabs.org/cdnjs/ajax/libs/eventemitter3/5.0.1/index.min.js';

describe( 'Module load test: Browser', () => {

	let page: BrowserHelper;

	beforeAll( async () => {
		page = await BrowserHelper.build()
			.then( p => p.loadWikipediaPage( 'Wikipedia:Sandbox' ) )
			.then( p =>
				p.loadRemoteScript( ee3Url, 'window.EventEmitter = EventEmitter;' )
			)
			.then( p =>
				p.loadScript( path.join( __dirname, '..', '..', 'dist', 'browser', 'index.js' ) )
			);
	} );

	afterAll( async () => {
		await page.close();
	} );

	test( 'EventEmitter found', async () => {
		await expect( page.evaluate( () => {
			return typeof window.EventEmitter;
		} ) ).resolves.toBe( 'function' );
	} );

	test( 'EventSource found', async () => {
		await expect( page.evaluate( () => {
			return typeof window.EventSource;
		} ) ).resolves.toBe( 'function' );
	} );

	test( 'script loaded', async () => {
		await expect( page.evaluate( () => {
			return typeof window.WikimediaStream;
		} ) ).resolves.toBe( 'object' );
		await expect( page.evaluate( () => {
			return typeof window.WikimediaStream.WikimediaStream;
		} ) ).resolves.toBe( 'function' );
	} );

	test( 'test stream open', async () => {
		await expect( page.evaluate( () => {
			const stream = new window.WikimediaStream.WikimediaStream( 'mediawiki.recentchange' );
			let resolveData: ( data: any ) => void;
			const dataPromise = new Promise( ( res ) => {
				resolveData = res;
			} );
			stream.once( 'mediawiki.recentchange', ( _data ) => {
				stream.close();
				resolveData( _data );
			} );
			return dataPromise.then( d => typeof d );
		} ) ).resolves.toBe( 'object' );
	} );

} );
