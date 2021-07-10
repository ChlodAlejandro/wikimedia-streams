/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import User from "./common/User";
import {MediaWikiEvent} from "./EventStream";
import Page from "./common/Page";
import Comment from "./common/Comment";
import Revision from "./common/Revision";

/** Represents a MW Revision Create event. */
export default interface MediaWikiRevisionCreateEvent extends
    MediaWikiEvent, Page, Comment, Revision {

    /** Represents the user that performed this change. */
    performer?: User;

    /** Chronology Protector client ID. */
    chronology_id: string;

}