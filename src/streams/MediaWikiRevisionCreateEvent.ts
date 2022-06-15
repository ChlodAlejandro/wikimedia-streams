/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import User, {isMediaWikiUser} from "./common/User";
import {isMediaWikiEvent, MediaWikiEvent} from "./EventStream";
import Page, {hasMediaWikiPage} from "./common/Page";
import Comment, {hasMediaWikiComment} from "./common/Comment";
import Revision, {hasMediaWikiRevision} from "./common/Revision";

/** Represents a MW Revision Create event. */
export default interface MediaWikiRevisionCreateEvent extends
    MediaWikiEvent, Page, Comment, Revision {

    /** Represents the user that performed this change. */
    performer?: User;

    /** Chronology Protector client ID. */
    chronology_id: string;

}

export function isMediaWikiRevisionCreateEvent(object: any): object is MediaWikiRevisionCreateEvent {
	return typeof object === "object"
		&& typeof object.chronology_id === "string"
		&& (!object.comment || hasMediaWikiComment(object))
		&& hasMediaWikiPage(object)
		&& hasMediaWikiRevision(object)
		&& isMediaWikiUser((object as any).performer)
		&& isMediaWikiEvent(object);
}
