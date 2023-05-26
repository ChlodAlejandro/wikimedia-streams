import WikimediaStream from '../src';
import { version } from '../package.json';
import { WikimediaEventStream } from '../src/WikimediaStream';
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
import { isMediaWikiRevisionScoreEvent } from '../src/streams/MediaWikiRevisionScoreEvent';
import {
	isMediaWikiRevisionVisibilityChangeEvent
} from '../src/streams/MediaWikiRevisionVisibilityChangeEvent';
import {
	isMediaWikiRevisionTagsChangeEvent
} from '../src/streams/MediaWikiRevisionTagsChangeEvent';

beforeAll( () => {
	expect( WikimediaStream.VERSION ).toBe( version );
} );

beforeEach( ( doneFn ) => {
	setTimeout( doneFn, 2000 );
} );

function generateStream( topic: WikimediaEventStream ): Promise<WikimediaStream> {
	return new Promise<WikimediaStream>( res => {
		const stream = new WikimediaStream(
			topic, { autoStart: false }
		);
		stream.on( 'open', () => {
			res( stream );
		} );
		stream.open( {
			since: new Date(
				Date.now() - ( 365 * 24 * 60 * 60 * 1e3 )
			).toISOString()
		} );
	} );
}

test.each( [
	<const>'eventgate-main.test.event',
	<const>'test'
] )( '%s', async ( topic ) => {
	expect.hasAssertions();
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
		expect( WikimediaStream.isSpecificWikimediaStream( data.meta.stream ) ).toBe( true );
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
} );

test.each( [
	<const>'mediawiki.page-create',
	<const>'page-create',
	<const>'mediawiki.revision-create',
	<const>'revision-create'
] )( '%s', async ( topic ) => {
	expect.hasAssertions();
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiEvent( data ) ).toBe( true );
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
} );

test.each( [
	<const>'mediawiki.page-delete',
	<const>'page-delete'
] )( '%s', async ( topic ) => {
	expect.hasAssertions();
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiPageDeleteEvent( data ) ).toBe( true );
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
} );

test.each( [
	<const>'mediawiki.page-links-change',
	<const>'page-links-change'
] )( '%s', async ( topic ) => {
	expect.hasAssertions();
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiPageLinksChangeEvent( data ) ).toBe( true );
		testMediaWikiEvent( data );
		testPage( data );
		if ( data.performer ) {
			testUser( data.performer );
		}
		expect( typeof data.rev_id ).toBe( 'number' );
		if ( data.removed_links ) {
			expect( Array.isArray( data.removed_links ) ).toBe( true );
			for ( const link of data.removed_links ) {
				expect( typeof link.link ).toBe( 'string' );
				expect( typeof link.external ).toBe( 'boolean' );
			}
		}
		if ( data.added_links ) {
			expect( Array.isArray( data.added_links ) ).toBe( true );
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
} );

test.each( [
	<const>'mediawiki.page-move',
	<const>'page-move'
] )( '%s', async ( topic ) => {
	expect.hasAssertions();
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiPageMoveEvent( data ) ).toBe( true );
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
} );

test.each( [
	<const>'mediawiki.page-properties-change',
	<const>'page-properties-change'
] )( '%s', async ( topic ) => {
	expect.hasAssertions();
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiPagePropertiesChangeEvent( data ) ).toBe( true );
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
} );

test.each( [
	<const>'mediawiki.page-undelete',
	<const>'page-undelete'
] )( '%s', async ( topic ) => {
	expect.hasAssertions();
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiPagePropertiesChangeEvent( data ) ).toBe( true );
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
} );

test.each( [
	<const>'mediawiki.revision-score',
	<const>'revision-score'
] )( '%s', async ( topic ) => {
	expect.hasAssertions();
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiRevisionScoreEvent( data ) ).toBe( true );
		testMediaWikiEvent( data );
		testPage( data );
		if ( data.performer ) {
			testUser( data.performer );
		}
		expect( typeof data.rev_id ).toBe( 'number' );
		if ( data.rev_parent_id ) {
			expect( typeof data.rev_parent_id ).toBe( 'number' );
		}
		expect( typeof data.rev_timestamp ).toBe( 'string' );
		expect( new Date( data.rev_timestamp ).getTime() ).not.toBeNaN();

		if ( data.scores ) {
			expect( typeof data.scores ).toBe( 'object' );
			for ( const [ modelName, model ] of Object.entries( data.scores ) ) {
				expect( typeof modelName ).toBe( 'string' );
				expect( typeof model ).toBe( 'object' );
				expect( typeof model.model_name ).toBe( 'string' );
				expect( typeof model.model_version ).toBe( 'string' );
				expect( model.prediction ).toBeInstanceOf( Array );
				for ( const prediction of model.prediction ) {
					expect( typeof prediction ).toBe( 'string' );
				}
				expect( typeof model.probability ).toBe( 'object' );
				for ( const [ name, prob ] of Object.entries( model.probability ) ) {
					expect( typeof name ).toBe( 'string' );
					expect( typeof prob ).toBe( 'number' );
				}
			}
		}
		if ( data.errors ) {
			expect( typeof data.errors ).toBe( 'object' );
			for ( const [ modelName, model ] of Object.entries( data.errors ) ) {
				expect( typeof modelName ).toBe( 'string' );
				expect( typeof model ).toBe( 'object' );
				expect( typeof model.model_name ).toBe( 'string' );
				expect( typeof model.model_version ).toBe( 'string' );
				expect( typeof model.type ).toBe( 'string' );
				expect( typeof model.message ).toBe( 'string' );
			}
		}

		if ( ++successCount > 20 ) {
			stream.close();
		}
	} );
	await stream.waitUntilClosed();
} );

test.each( [
	<const>'mediawiki.revision-tags-change'
] )( '%s', async ( topic ) => {
	expect.hasAssertions();
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiRevisionTagsChangeEvent( data ) ).toBe( true );
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
} );

test.each( [
	<const>'mediawiki.revision-visibility-change'
] )( '%s', async ( topic ) => {
	expect.hasAssertions();
	let successCount = 0;
	const stream = await generateStream( topic );
	stream.on( topic, ( data ) => {
		expect( isMediaWikiRevisionVisibilityChangeEvent( data ) ).toBe( true );
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
} );
