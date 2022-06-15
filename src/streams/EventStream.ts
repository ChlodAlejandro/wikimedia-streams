/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import {WikimediaEventStream} from "../index";
import EventGateTestEvent from "./EventGateTestEvent";
import MediaWikiPageDeleteEvent from "./MediaWikiPageDeleteEvent";
import MediaWikiPageLinksChangeEvent from "./MediaWikiPageLinksChangeEvent";
import MediaWikiPageMoveEvent from "./MediaWikiPageMoveEvent";
import MediaWikiPagePropertiesChangeEvent from "./MediaWikiPagePropertiesChangeEvent";
import MediaWikiPageUndeleteEvent from "./MediaWikiPageUndeleteEvent";
import MediaWikiRecentChangeEvent from "./MediaWikiRecentChangeEvent";
import MediaWikiRevisionCreateEvent from "./MediaWikiRevisionCreateEvent";
import MediaWikiRevisionScoreEvent from "./MediaWikiRevisionScoreEvent";
import MediaWikiRevisionVisibilityChangeEvent from "./MediaWikiRevisionVisibilityChangeEvent";
import MediaWikiRevisionTagsChangeEvent from "./MediaWikiRevisionTagsChangeEvent";

interface WikimediaEventMeta {

    /** Unique URI identifying the event or entity */
    uri: string;

    /** Unique ID of the request that caused the event */
    request_id: string;

    /** Unique ID of this event */
    id: string;

    /**
     * UTC event datetime, in ISO-8601 format
     * @example 2021-07-09T02:50:29Z
     */
    dt: string;

    /** Domain the event or entity pertains to */
    domain: string;

    /** Name of the stream/queue/dataset that this event belongs in */
    stream: WikimediaEventStream;

}

export interface WikimediaEventBase {

    /**
     * A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
     */
    "$schema" : string;

    "meta": WikimediaEventMeta;

}

export interface MediaWikiEvent extends WikimediaEventBase {
    /** The name of the wiki database this event entity belongs to. */
    database: string;
}

type WikimediaEvent =
    EventGateTestEvent
    | MediaWikiPageDeleteEvent
    | MediaWikiPageLinksChangeEvent
    | MediaWikiPageMoveEvent
    | MediaWikiPagePropertiesChangeEvent
    | MediaWikiPageUndeleteEvent
    | MediaWikiRecentChangeEvent
    | MediaWikiRevisionCreateEvent
    | MediaWikiRevisionScoreEvent
	| MediaWikiRevisionTagsChangeEvent
    | MediaWikiRevisionVisibilityChangeEvent;

export default WikimediaEvent;

