/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import Comment from "./common/Comment";
import Log, {hasMediaWikiLog} from "./common/Log";
import {isWikimediaEvent, WikimediaEventBase} from "./EventStream";

/** Represents a MW RecentChange event. <https://www.mediawiki.org/wiki/Manual:RCFeed> */
export interface MediaWikiRecentChangeEventBase extends
    WikimediaEventBase, Comment {

    /**
     * Type of recentchange event (rc_type). One of "edit", "new", "log",
     * "categorize", or "external". (See Manual:Recentchanges table#rc_type)
     */
    type: "edit" | "new" | "log" | "categorize" | "external";

    /** Full page name, from Title::getPrefixedText. */
    title: string;

    /** ID of the recentchange event (rcid). */
    id?: number;

    /**
     * ID of relevant namespace of affected page (rc_namespace, page_namespace).
     * This is -1 ("Special") for log events.
     */
    namespace: number;

    /** Unix timestamp (derived from rc_timestamp). */
    timestamp: number;

    /** (rc_user_text) */
    user: string;

    /** (rc_bot) */
    bot: boolean;

    /** $wgCanonicalServer */
    server_url: string;

	/** The hostname section of the server URL */
	server_name: string;

    /** $wgScriptPath */
    server_script_path: string;

    /** wfWikiID ($wgDBprefix, $wgDBname) */
    wiki: string;

}

export interface MediaWikiRecentChangeLogEvent extends MediaWikiRecentChangeEventBase, Log {
    type: "log",
    comment: "";
    parsedComment: "";
}

export interface MediaWikiRecentChangeNewEvent extends MediaWikiRecentChangeEventBase {
    type: "new",
    length: {
        new: number;
    };
    revision: {
        new: number;
    };

    /** (rc_minor) */
    minor: boolean;

    /**
     * (rc_patrolled). This property only exists if patrolling is supported
     * for this event (based on $wgUseRCPatrol, $wgUseNPPatrol).
     */
    patrolled?: boolean;
}

export interface MediaWikiRecentChangeEditEvent extends Omit<MediaWikiRecentChangeNewEvent, "type"> {
    type: "edit",
    length: {
        old: number;
        new: number;
    };
    revision: {
        old: number;
        new: number;
    };
}

export interface MediaWikiRecentChangeCategorizeEvent extends MediaWikiRecentChangeEventBase {
    type: "categorize"
    parsedcomment: string;
}

type MediaWikiRecentChangeEvent =
    MediaWikiRecentChangeLogEvent
    | MediaWikiRecentChangeNewEvent
    | MediaWikiRecentChangeEditEvent
    | MediaWikiRecentChangeCategorizeEvent;

export default MediaWikiRecentChangeEvent;

// Not using a TypeScript `is` return type to avoid mistyping the event object before checks.
function isMediaWikiRecentChangeEventBase(object: any): boolean {
	return typeof object === "object"
		&& [
			"edit", "new", "log", "categorize", "external"
		].includes(object.type)
		&& typeof object.title === "string"
		&& (object.id == null || typeof object.id === "number")
		&& typeof object.namespace === "number"
		&& typeof object.timestamp === "number"
		&& typeof object.user === "string"
		&& typeof object.bot === "boolean"
		&& typeof object.server_url === "string"
		&& typeof object.server_name === "string"
		&& typeof object.server_script_path === "string"
		&& typeof object.wiki === "string"
		&& isWikimediaEvent(object)
}

export function isMediaWikiRecentChangeLogEvent(object: any): object is MediaWikiRecentChangeLogEvent {
	return isMediaWikiRecentChangeEventBase(object)
		&& object.type === "log"
		&& typeof object.comment === "string"
		&& typeof object.parsedcomment === "string"
		&& hasMediaWikiLog(object);
}

export function isMediaWikiRecentChangeNewEvent(object: any): object is MediaWikiRecentChangeNewEvent {
	return isMediaWikiRecentChangeEventBase(object)
		&& object.type === "new"
		&& typeof object.length === "object"
		&& typeof object.length.new === "number"
		&& typeof object.revision === "object"
		&& typeof object.revision.new === "number"
		&& typeof object.minor === "boolean"
		&& typeof object.patrolled === "boolean";
}

export function isMediaWikiRecentChangeEditEvent(object: any): object is MediaWikiRecentChangeEditEvent {
	return isMediaWikiRecentChangeEventBase(object)
		&& object.type === "edit"
		&& typeof object.length === "object"
		&& typeof object.length.old === "number"
		&& typeof object.length.new === "number"
		&& typeof object.revision === "object"
		&& typeof object.revision.old === "number"
		&& typeof object.revision.new === "number";
}

export function isMediaWikiRecentChangeCategorizeEvent(object: any): object is MediaWikiRecentChangeCategorizeEvent {
	return isMediaWikiRecentChangeEventBase(object)
		&& object.type === "categorize"
		&& typeof object.parsedcomment === "string";
}

export function isMediaWikiRecentChangeEvent(object: any): object is MediaWikiRecentChangeEvent {
	return isMediaWikiRecentChangeLogEvent(object)
		|| isMediaWikiRecentChangeNewEvent(object)
		|| isMediaWikiRecentChangeEditEvent(object)
		|| isMediaWikiRecentChangeCategorizeEvent(object);
}
