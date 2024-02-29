import type { WikimediaStream } from '../..';
import type { EventEmitter } from 'events';
import { isMediaWikiEvent } from '../../src/streams/EventStream';
import {
	testComment,
	testMediaWikiEvent,
	testPage,
	testRevision, testUser
} from '../common/CommonTestChecks';
import BrowserHelper from './BrowserHelper';

declare global {
	interface Window {
		EventEmitter: typeof EventEmitter;
		WikimediaStream: { WikimediaStream: typeof WikimediaStream };
	}
}

export function testWikimediaStreams( page: () => BrowserHelper ) {

	test( 'EventSource found', async () => {
		await expect( page().evaluate( () => {
			return typeof window.EventSource;
		} ) ).resolves.toBe( 'function' );
	} );

	test( 'script loaded', async () => {
		await expect( page().evaluate( () => {
			return typeof window.WikimediaStream;
		} ) ).resolves.toBe( 'object' );
		await expect( page().evaluate( () => {
			return typeof window.WikimediaStream.WikimediaStream;
		} ) ).resolves.toBe( 'function' );
	} );

	test( 'mediawiki.recentchange', async () => {
		await expect( page().evaluate( async () => {
			const stream =
				new window.WikimediaStream.WikimediaStream( 'mediawiki.recentchange' );
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

	test( 'mediawiki.revision-create', async () => {
		const events: any[] = await page().evaluate( async () => {
			const stream =
				new window.WikimediaStream.WikimediaStream( 'mediawiki.revision-create' );
			let resolveData: ( data: any ) => void;
			const dataPromise: Promise<any[]> = new Promise( ( res ) => {
				resolveData = res;
			} );
			const data = [];
			stream.on( 'mediawiki.revision-create', ( _data ) => {
				if ( data.length >= 20 ) {
					stream.close();
					resolveData( data );
				} else {
					data.push( _data );
				}
			} );
			return dataPromise;
		} );
		for ( const event of events ) {
			expect( isMediaWikiEvent( event ) || event ).toBe( true );
			testMediaWikiEvent( event );
			testPage( event );
			testComment( event );
			testRevision( event );
			if ( event.performer ) {
				testUser( event.performer );
			}
		}
		expect.hasAssertions();
	} );

}
