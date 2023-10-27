/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import { isMediaWikiEvent, MediaWikiEvent } from './EventStream';
import Page, { hasMediaWikiPage } from './common/Page';
import Comment from './common/Comment';
import Revision, { hasMediaWikiRevision } from './common/Revision';
import User from './common/User';

/** Represents a MW Revision Tags Change event. */
export default interface MediaWikiRevisionTagsChangeEvent
	extends MediaWikiEvent, Page, Comment, Revision {

	/**
	 * An array of all the tags for this MediaWiki revision.
	 */
	tags: string[];
	/**
	 * The prior state of this MediaWiki revision. Includes tags that were already
	 * part of the revision prior to this event.
	 */
	prior_state: {
		/**
		 * An array of the tags for this MediaWiki revision prior to this event.
		 */
		tags: string[];
	};

	/** Represents the user that performed this change. */
	performer?: User;

}

/**
 *
 * @param object
 */
export function isMediaWikiRevisionTagsChangeEvent( object: any ):
	object is MediaWikiRevisionTagsChangeEvent {
	return typeof object === 'object' &&
		Array.isArray( object.tags ) &&
		typeof object.prior_state === 'object' &&
		Array.isArray( object.prior_state.tags ) &&
		hasMediaWikiPage( object ) &&
		hasMediaWikiRevision( object ) &&
		isMediaWikiEvent( object );
}
