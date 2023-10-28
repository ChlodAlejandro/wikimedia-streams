/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import Page, { hasMediaWikiPage } from './common/Page';
import Comment, { hasMediaWikiComment } from './common/Comment';
import { isMediaWikiEvent, MediaWikiEvent } from './EventStream';
import User, { isMediaWikiUser } from './common/User';

/** Represents a MW Revision Create event. */
export default interface MediaWikiPageMoveEvent extends MediaWikiEvent, Page, Comment {

	/** Represents the user that performed this change. */
	performer?: User;

	/** The head revision of the page at the time of this event. */
	rev_id: number;

	/**
	 * The prior state of the entity before this event. If a top level
	 * entity field is not present in this object, then its value has
	 * not changed since the prior event.
	 */
	prior_state: {

		/** The normalized title of this page before this event. */
		page_title: string;

		/** The namespace ID this page belonged to before this event. */
		page_namespace: number;

		/** The head revision of this page before this event. */
		rev_id: number;

	},

	/**
	 * Information about the new redirect page auto-created at the old
	 * title as a result of this page move. This field is optional and
	 * will be absent if no redirect page was created.
	 */
	new_redirect_page?: {

		/** The page ID of the newly created redirect page. */
		page_id: number;

		/** The page title of the newly created redirect page. */
		page_title: string;

		/** This will be the same as prior_state.page_namespace. */
		page_namespace: number;

		/** The revision created for the newly created redirect page. */
		rev_id: number;

	}

}

/**
 *
 * @param object
 */
export function isMediaWikiPageMoveEvent( object: any ): object is MediaWikiPageMoveEvent {
	return typeof object === 'object' &&
		typeof object.rev_id === 'number' &&
		typeof object.prior_state === 'object' &&
		typeof object.prior_state.page_title === 'string' &&
		typeof object.prior_state.page_namespace === 'number' &&
		typeof object.prior_state.rev_id === 'number' &&
		( !object.comment || hasMediaWikiComment( object ) ) &&
		hasMediaWikiPage( object ) &&
		(
			!( object as any ).performer ||
			isMediaWikiUser( ( object as any ).performer )
		) &&
		isMediaWikiEvent( object );
}
