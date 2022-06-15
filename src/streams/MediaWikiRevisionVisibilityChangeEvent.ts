/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import User, {isMediaWikiUser} from "./common/User";
import {isMediaWikiEvent, MediaWikiEvent} from "./EventStream";
import Page, {hasMediaWikiPage} from "./common/Page";
import Comment from "./common/Comment";
import Revision, {hasMediaWikiRevision} from "./common/Revision";

interface Visibility {

    /** Whether the revision's text is visible. */
    text: boolean;

    /** Whether the author of the revision's text is visible. */
    user: boolean;

    /** Whether the comment of the revision is visible. */
    comment: boolean;

}

    /** Represents a MW Revision Visibility Change event. */
export default interface MediaWikiRevisionVisibilityChangeEvent extends
    MediaWikiEvent, Page, Comment, Revision {

    /** Represents the user that performed this change. */
    performer?: User;

    /** Chronology Protector client ID. */
    chronology_id: string;

    /** The visibility state of this revision. */
    visibility: Visibility;

    /**
     * The prior state of the entity before this event. Revisions always
     * have visibility settings, so this object will always contain the
     * visibility settings for the revision before this event.
     */
    prior_state: {

        /** The prior visibility state of this revision. */
        visibility: Visibility;

    }

}

export function isMediaWikiRevisionVisibilityChangeEvent(object: any): object is MediaWikiRevisionVisibilityChangeEvent {
	return typeof object === "object"
		&& typeof object.chronology_id === "string"
		&& typeof object.visibility === "object"
		&& typeof object.visibility.text === "boolean"
		&& typeof object.visibility.user === "boolean"
		&& typeof object.visibility.comment === "boolean"
		&& typeof object.prior_state.visibility === "object"
		&& typeof object.prior_state.visibility.text === "boolean"
		&& typeof object.prior_state.visibility.user === "boolean"
		&& typeof object.prior_state.visibility.comment === "boolean"
		&& hasMediaWikiPage(object)
		&& hasMediaWikiRevision(object)
		&& isMediaWikiUser((object as any).performer)
		&& isMediaWikiEvent(object);
}
