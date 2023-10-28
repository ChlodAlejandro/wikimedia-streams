/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import Page, { hasMediaWikiPage } from './common/Page';
import User, { isMediaWikiUser } from './common/User';
import Comment, { hasMediaWikiComment } from './common/Comment';
import { isMediaWikiEvent, MediaWikiEvent } from './EventStream';

/** Represents a MW Page Undelete (restore) event. */
export default interface MediaWikiPageUndeleteEvent extends MediaWikiEvent, Page, Comment {

	/** Represents the user that performed this change. */
	performer?: User;

	/** Chronology Protector client ID. */
	chronology_id?: string;

	/** The head revision of the page at the time of this event. */
	rev_id: number;

	/**
	 * The prior state of the entity before this event. If a top level
	 * entity field is not present in this object, then its value has
	 * not changed since the prior event. If prior_state itself is not
	 * present, then this event had no relevant prior state, indicating
	 * that it is probably the first time this type has been emitted
	 * for this entity. For page undeletes, prior_state will be absent
	 * unless the page_id is no longer the same as the page_id it had
	 * before it was deleted.
	 */
	prior_state?: {

		/** The page ID before this restore as it was in the archive table. */
		page_id: number;

	};

}

/**
 *
 * @param object
 */
export function isMediaWikiPageUndeleteEvent( object: any ): object is MediaWikiPageUndeleteEvent {
	return typeof object === 'object' &&
		typeof object.rev_id === 'number' &&
		typeof object.prior_state === 'object' &&
		typeof object.prior_state.page_id === 'number' &&
		( !object.comment || hasMediaWikiComment( object ) ) &&
		hasMediaWikiPage( object ) &&
		(
			!( object as any ).performer ||
			isMediaWikiUser( ( object as any ).performer )
		) &&
		isMediaWikiEvent( object );
}
