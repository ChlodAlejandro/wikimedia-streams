import WikimediaStream, { WikimediaEventStream } from '../src';
import {
	isMediaWikiEvent,
	isWikimediaEvent,
	isWikimediaEventMeta
} from '../src/streams/EventStream';
import {
	testComment,
	testMediaWikiEvent,
	testPage,
	testRevision,
	testUser
} from './common/CommonTests';
import { isMediaWikiPageDeleteEvent } from '../src/streams/MediaWikiPageDeleteEvent';
import { isMediaWikiPageLinksChangeEvent } from '../src/streams/MediaWikiPageLinksChangeEvent';
import { isMediaWikiPageMoveEvent } from '../src/streams/MediaWikiPageMoveEvent';
import {
	isMediaWikiPagePropertiesChangeEvent
} from '../src/streams/MediaWikiPagePropertiesChangeEvent';
import {
	isMediaWikiRevisionVisibilityChangeEvent
} from '../src/streams/MediaWikiRevisionVisibilityChangeEvent';
import {
	isMediaWikiRevisionTagsChangeEvent
} from '../src/streams/MediaWikiRevisionTagsChangeEvent';

beforeAll( () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	expect( WikimediaStream.VERSION ).toBe( require( '../package.json' ).version );

	WikimediaStream.defaultUserAgent = `wikimedia-streams-ci/${
		WikimediaStream.VERSION
	} (chlod@chlod.net; github@ChlodAlejandro/wikimedia-streams) ${
		WikimediaStream.genericUserAgent
	}`;
} );

beforeEach( ( doneFn ) => {
	setTimeout( doneFn, 1000 );
} );

function generateStream( topic: WikimediaEventStream ): Promise<WikimediaStream> {
	return new Promise<WikimediaStream>( res => {
		const stream = new WikimediaStream(
			topic, { autoStart: false }
		);
		stream.open( {
			since: new Date(
				Date.now() - ( 365 * 24 * 60 * 60 * 1e3 )
			).toISOString()
		} ).then( () => {
			res( stream );
		} );
	} );
}

test.each( [
	<const>'eventgate-main.test.event',
	<const>'test'
] )( '%s', async ( topic ) => {
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isWikimediaEvent( data ) ).toBe( false );
		expect( typeof data.$schema ).toBe( 'string' );
		expect( isWikimediaEventMeta( data.meta ) ).toBe( false );
		expect( typeof data.meta ).toBe( 'object' );
		expect( typeof data.meta.request_id ).toBe( 'string' );
		expect( typeof data.meta.id ).toBe( 'string' );
		expect( typeof data.meta.dt ).toBe( 'string' );
		expect( typeof data.meta.stream ).toBe( 'string' );
		expect( new Date( data.meta.dt ).getTime() ).not.toBeNaN();
		expect(
			WikimediaStream.isSpecificWikimediaStream( data.meta.stream ) ||
			data.meta.stream
		).toBe( true );
		expect( typeof data.meta.topic ).toBe( 'string' );
		expect( typeof data.meta.partition ).toBe( 'number' );
		expect( typeof data.meta.offset ).toBe( 'number' );
		expect( typeof data.test ).toBe( 'string' );
		if ( data.test_map ) {
			expect( typeof data.test_map ).toEqual( 'object' );
		}
		if ( ++successCount > 20 ) {
			stream.close();
		}
	} );
	await stream.waitUntilClosed();
	expect.hasAssertions();
} );

test.each( [
	<const>'mediawiki.page-create',
	<const>'page-create',
	<const>'mediawiki.revision-create',
	<const>'revision-create'
] )( '%s', async ( topic ) => {
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiEvent( data ) || data ).toBe( true );
		testMediaWikiEvent( data );
		testPage( data );
		testComment( data );
		testRevision( data );
		if ( data.performer ) {
			testUser( data.performer );
		}
		if ( ++successCount > 20 ) {
			stream.close();
		}
	} );
	await stream.waitUntilClosed();
	expect.hasAssertions();
} );

test.each( [
	<const>'mediawiki.page-delete',
	<const>'page-delete'
] )( '%s', async ( topic ) => {
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiPageDeleteEvent( data ) || data ).toBe( true );
		testMediaWikiEvent( data );
		testPage( data );
		testComment( data );
		if ( data.performer ) {
			testUser( data.performer );
		}
		expect( typeof data.rev_id ).toBe( 'number' );
		expect( typeof data.rev_count ).toBe( 'number' );
		if ( ++successCount > 20 ) {
			stream.close();
		}
	} );
	await stream.waitUntilClosed();
	expect.hasAssertions();
} );

test.each( [
	<const>'mediawiki.page-links-change',
	<const>'page-links-change'
] )( '%s', async ( topic ) => {
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiPageLinksChangeEvent( data ) || data ).toBe( true );
		testMediaWikiEvent( data );
		testPage( data );
		if ( data.performer ) {
			testUser( data.performer );
		}
		expect( typeof data.rev_id ).toBe( 'number' );
		if ( data.removed_links ) {
			expect( Array.isArray( data.removed_links ) || data ).toBe( true );
			for ( const link of data.removed_links ) {
				expect( typeof link.link ).toBe( 'string' );
				expect( typeof link.external ).toBe( 'boolean' );
			}
		}
		if ( data.added_links ) {
			expect( Array.isArray( data.added_links ) || data ).toBe( true );
			for ( const link of data.added_links ) {
				expect( typeof link.link ).toBe( 'string' );
				expect( typeof link.external ).toBe( 'boolean' );
			}
		}
		if ( ++successCount > 20 ) {
			stream.close();
		}
	} );
	await stream.waitUntilClosed();
	expect.hasAssertions();
} );

test.each( [
	<const>'mediawiki.page-move',
	<const>'page-move'
] )( '%s', async ( topic ) => {
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiPageMoveEvent( data ) || data ).toBe( true );
		testMediaWikiEvent( data );
		testPage( data );
		testComment( data );
		if ( data.performer ) {
			testUser( data.performer );
		}
		expect( typeof data.rev_id ).toBe( 'number' );
		expect( typeof data.prior_state ).toBe( 'object' );
		expect( typeof data.prior_state.page_title ).toBe( 'string' );
		expect( typeof data.prior_state.page_namespace ).toBe( 'number' );
		expect( typeof data.prior_state.rev_id ).toBe( 'number' );
		if ( data.new_redirect_page ) {
			expect( typeof data.new_redirect_page.page_id ).toBe( 'number' );
			expect( typeof data.new_redirect_page.page_title ).toBe( 'string' );
			expect( typeof data.new_redirect_page.page_namespace ).toBe( 'number' );
			expect( typeof data.new_redirect_page.rev_id ).toBe( 'number' );
		}
		if ( ++successCount > 20 ) {
			stream.close();
		}
	} );
	await stream.waitUntilClosed();
	expect.hasAssertions();
} );

test.each( [
	<const>'mediawiki.page-properties-change',
	<const>'page-properties-change'
] )( '%s', async ( topic ) => {
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiPagePropertiesChangeEvent( data ) || data ).toBe( true );
		testMediaWikiEvent( data );
		testPage( data );
		if ( data.performer ) {
			testUser( data.performer );
		}
		expect( typeof data.rev_id ).toBe( 'number' );
		let propertiesFound = false;
		if ( data.removed_properties ) {
			expect( typeof data.removed_properties ).toBe( 'object' );
			propertiesFound = true;
		}
		if ( data.added_properties ) {
			expect( typeof data.added_properties ).toBe( 'object' );
			propertiesFound = true;
		}
		expect( propertiesFound ).toBeTruthy();
		if ( ++successCount > 20 ) {
			stream.close();
		}
	} );
	await stream.waitUntilClosed();
	expect.hasAssertions();
} );

test.each( [
	<const>'mediawiki.page-undelete',
	<const>'page-undelete'
] )( '%s', async ( topic ) => {
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiPagePropertiesChangeEvent( data ) || data ).toBe( true );
		testMediaWikiEvent( data );
		testPage( data );
		if ( data.performer ) {
			testUser( data.performer );
		}
		expect( typeof data.rev_id ).toBe( 'number' );
		if ( data.prior_state ) {
			expect( typeof data.prior_state ).toBe( 'object' );
			expect( typeof data.prior_state.page_id ).toBe( 'number' );
		}
		if ( ++successCount > 20 ) {
			stream.close();
		}
	} );
	await stream.waitUntilClosed();
	expect.hasAssertions();
} );

test.each( [
	<const>'mediawiki.revision-tags-change'
] )( '%s', async ( topic ) => {
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiRevisionTagsChangeEvent( data ) || data ).toBe( true );
		testMediaWikiEvent( data );
		testPage( data );
		testComment( data );
		testRevision( data );
		expect( data.tags ).toBeInstanceOf( Array );
		for ( const tag of data.tags ) {
			expect( typeof tag ).toBe( 'string' );
		}
		expect( data.prior_state.tags ).toBeInstanceOf( Array );
		for ( const priorTag of data.prior_state.tags ) {
			expect( typeof priorTag ).toBe( 'string' );
		}
		if ( ++successCount > 20 ) {
			stream.close();
		}
	} );
	await stream.waitUntilClosed();
	expect.hasAssertions();
} );

test.each( [
	<const>'mediawiki.revision-visibility-change'
] )( '%s', async ( topic ) => {
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiRevisionVisibilityChangeEvent( data ) || data ).toBe( true );
		testMediaWikiEvent( data );
		testPage( data );
		testComment( data );
		testRevision( data );
		if ( data.performer ) {
			testUser( data.performer );
		}
		expect( typeof data.visibility ).toBe( 'object' );
		expect( typeof data.visibility.text ).toBe( 'boolean' );
		expect( typeof data.visibility.user ).toBe( 'boolean' );
		expect( typeof data.visibility.comment ).toBe( 'boolean' );
		expect( typeof data.prior_state.visibility ).toBe( 'object' );
		expect( typeof data.prior_state.visibility.text ).toBe( 'boolean' );
		expect( typeof data.prior_state.visibility.user ).toBe( 'boolean' );
		expect( typeof data.prior_state.visibility.comment ).toBe( 'boolean' );
		if ( ++successCount > 20 ) {
			stream.close();
		}
	} );
	await stream.waitUntilClosed();
	expect.hasAssertions();
} );
