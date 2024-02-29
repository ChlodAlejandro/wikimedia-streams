import Comment, { hasMediaWikiComment } from '../../src/streams/common/Comment';
import Log, { hasMediaWikiLog } from '../../src/streams/common/Log';
import Page, { hasMediaWikiPage } from '../../src/streams/common/Page';
import Revision, { RevisionSlot } from '../../src/streams/common/Revision';
import User, { isMediaWikiRegisteredUser, isMediaWikiUser } from '../../src/streams/common/User';
import {
	isWikimediaEvent, isWikimediaEventMeta,
	MediaWikiEvent,
	WikimediaEventBase
} from '../../src/streams/EventStream';
import WikimediaStream from '../../src';

export function testWikimediaEvent( data: WikimediaEventBase ) {
	expect( isWikimediaEvent( data ) ).toBe( true );
	expect( typeof data.$schema ).toBe( 'string' );

	expect( isWikimediaEventMeta( data.meta ) ).toBe( true );
	expect( typeof data.meta ).toBe( 'object' );
	expect( typeof data.meta.uri ).toBe( 'string' );
	expect( typeof data.meta.request_id ).toBe( 'string' );
	expect( typeof data.meta.id ).toBe( 'string' );
	expect( typeof data.meta.dt ).toBe( 'string' );
	expect( typeof data.meta.domain ).toBe( 'string' );
	expect( typeof data.meta.stream ).toBe( 'string' );
	expect( new Date( data.meta.dt ).getTime() ).not.toBeNaN();
	expect( WikimediaStream.isSpecificWikimediaStream( data.meta.stream ) ).toBe( true );
	expect( typeof data.meta.topic ).toBe( 'string' );
	expect( typeof data.meta.partition ).toBe( 'number' );
	expect( typeof data.meta.offset ).toBe( 'number' );
}

export function testMediaWikiEvent( data: MediaWikiEvent ) {
	testWikimediaEvent( data );
	expect( isWikimediaEvent( data ) ).toBe( true );
	expect( typeof data.database ).toBe( 'string' );
}

/**
 * @param data
 * @param optional Whether the test should fail if no comment was provided.
 */
export function testComment( data: Comment, optional = true ) {
	if ( !optional ) {
		expect( hasMediaWikiComment( data ) ).toBe( true );
	}
	if ( data.comment ) {
		expect( typeof data.comment ).toBe( 'string' );
	}
	if ( data.parsedcomment ) {
		expect( typeof data.parsedcomment ).toBe( 'string' );
	}
}

export function testLog( data: Log ) {
	expect( hasMediaWikiLog( data ) ).toBe( true );
	expect( typeof data.log_id ).toBe( 'number' );
	expect( typeof data.log_type ).toBe( 'string' );
	expect( typeof data.log_action ).toBe( 'string' );
	if ( data.log_params ) {
		expect( typeof data.log_params ).toBe( 'object' );
	}
	if ( data.log_action_comment ) {
		expect( typeof data.log_action_comment ).toBe( 'string' );
	}
}

export function testPage( data: Page ) {
	expect( hasMediaWikiPage( data ) ).toBe( true );
	expect( typeof data.page_id ).toBe( 'number' );
	expect( typeof data.page_title ).toBe( 'string' );
	expect( typeof data.page_namespace ).toBe( 'number' );
	expect( typeof data.page_is_redirect ).toBe( 'boolean' );
}

export function testRevisionSlot( data: RevisionSlot ) {
	expect( typeof data.rev_slot_content_model ).toBe( 'string' );
	expect( typeof data.rev_slot_sha1 ).toBe( 'string' );
	expect( data.rev_slot_sha1 ).toMatch( /^[0-9a-z]+$/gi );
	expect( typeof data.rev_slot_size ).toBe( 'number' );
	expect( typeof data.rev_slot_origin_rev_id ).toBe( 'number' );
}

export function testRevision( data: Revision ) {
	expect( hasMediaWikiPage( data ) ).toBe( true );
	expect( typeof data.rev_id ).toBe( 'number' );
	if ( data.rev_parent_id ) {
		expect( typeof data.rev_parent_id ).toBe( 'number' );
	}
	expect( typeof data.rev_timestamp ).toBe( 'string' );
	expect( new Date( data.rev_timestamp ).getTime() ).not.toBeNaN();
	expect( typeof data.rev_sha1 ).toBe( 'string' );
	expect( typeof data.rev_len ).toBe( 'number' );
	expect( typeof data.rev_minor_edit ).toBe( 'boolean' );
	expect( typeof data.rev_content_model ).toBe( 'string' );
	expect( typeof data.rev_content_format ).toBe( 'string' );
	if ( data.rev_is_revert ) {
		expect( typeof data.rev_is_revert ).toBe( 'boolean' );
	}
	if ( data.rev_content_changed ) {
		expect( typeof data.rev_content_changed ).toBe( 'boolean' );
	}
	if ( data.rev_revert_details ) {
		expect( typeof data.rev_revert_details ).toBe( 'object' );
		expect( data.rev_revert_details.rev_revert_method ).toBeInstanceOf( Array );
		for ( const revertMethod of data.rev_revert_details.rev_revert_method ) {
			expect( [ 'rollback', 'undo', 'manual' ] ).toContain(
				revertMethod
			);
		}
		expect( typeof data.rev_revert_details.rev_is_exact_revert ).toBe( 'boolean' );
		expect( data.rev_revert_details.rev_reverted_revs ).toBeInstanceOf( Array );
		for ( const revertedRev of data.rev_revert_details.rev_reverted_revs ) {
			expect( typeof revertedRev ).toBe( 'number' );
		}
		expect( typeof data.rev_revert_details.rev_original_rev_id ).toBe( 'number' );
	}
	if ( data.rev_slots ) {
		expect( typeof data.rev_slots ).toBe( 'object' );
		expect( Object.keys( data.rev_slots ) ).toContain( 'main' );
		for ( const slotName in data.rev_slots ) {
			expect( typeof slotName ).toBe( 'string' );
			testRevisionSlot( data.rev_slots[ slotName ] );
		}
	}
}

export function testUser( data: User ) {
	expect( isMediaWikiUser( data ) ).toBe( true );
	expect( typeof data.user_text ).toBe( 'string' );
	expect( data.user_groups ).toBeInstanceOf( Array );
	for ( const group of data.user_groups ) {
		expect( typeof group ).toBe( 'string' );
	}
	expect( typeof data.user_is_bot ).toBe( 'boolean' );

	// Anonymous user
	if ( isMediaWikiRegisteredUser( data ) ) {
		expect( typeof data.user_id ).toBe( 'number' );
		expect( typeof data.user_edit_count ).toBe( 'number' );
	} else {
		expect( data ).not.toHaveProperty( 'user_id' );
		expect( data ).not.toHaveProperty( 'user_edit_count' );
	}
}
