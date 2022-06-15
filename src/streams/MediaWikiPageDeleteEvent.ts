/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import Page, {hasMediaWikiPage} from "./common/Page";
import User, {isMediaWikiUser} from "./common/User";
import Comment, {hasMediaWikiComment} from "./common/Comment";
import {isMediaWikiEvent, MediaWikiEvent} from "./EventStream";

/** Represents a MW Page Delete event. */
export default interface MediaWikiPageDeleteEvent extends
    MediaWikiEvent, Page, Comment {

    /** Represents the user that performed this change. */
    performer?: User;

    /** Chronology Protector client ID. */
    chronology_id: string;

    /** The head revision of the page at the time of this event. */
    rev_id: number;

    /**
     * The number of revisions of this page at the time of this event.
     * During a delete, this number of revisions will be archived.
     */
    rev_count: number;

}

export function isMediaWikiPageDeleteEvent(object: any): object is MediaWikiPageDeleteEvent {
	return typeof object === "object"
		&& typeof object.chronology_id === "string"
		&& typeof object.rev_id === "number"
		&& typeof object.rev_count === "number"
		&& (!object.comment || hasMediaWikiComment(object))
		&& hasMediaWikiPage(object)
		&& isMediaWikiUser((object as any).performer)
		&& isMediaWikiEvent(object);
}
