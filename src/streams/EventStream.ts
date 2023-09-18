/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import { WikimediaEventStream } from '../WikimediaStream';
import EventGateTestEvent from './EventGateTestEvent';
import MediaWikiPageDeleteEvent from './MediaWikiPageDeleteEvent';
import MediaWikiPageLinksChangeEvent from './MediaWikiPageLinksChangeEvent';
import MediaWikiPageMoveEvent from './MediaWikiPageMoveEvent';
import MediaWikiPagePropertiesChangeEvent from './MediaWikiPagePropertiesChangeEvent';
import MediaWikiPageUndeleteEvent from './MediaWikiPageUndeleteEvent';
import MediaWikiRecentChangeEvent from './MediaWikiRecentChangeEvent';
import MediaWikiRevisionCreateEvent from './MediaWikiRevisionCreateEvent';
import MediaWikiRevisionVisibilityChangeEvent from './MediaWikiRevisionVisibilityChangeEvent';
import MediaWikiRevisionTagsChangeEvent from './MediaWikiRevisionTagsChangeEvent';

export interface WikimediaEventMeta {

	/** Unique URI identifying the event or entity */
	uri: string;

	/** Unique ID of the request that caused the event */
	request_id: string;

	/** Unique ID of this event */
	id: string;

	/**
	 * UTC event datetime, in ISO-8601 format
	 *
	 * @example 2021-07-09T02:50:29Z
	 */
	dt: string;

	/** Domain the event or entity pertains to */
	domain: string;

	/** Name of the stream/queue/dataset that this event belongs in */
	stream: WikimediaEventStream;

	topic: string;
	partition: number;
	offset: number;

}

/**
 * Determines if an object is a WikimediaEventMeta object. Required for all events. If
 * an event does not have the required meta information, it may be malformed.
 *
 * @param object The object to check.
 * @return `true` if the object is a WikimediaEventMeta object, `false if otherwise.
 */
export function isWikimediaEventMeta( object: any ): object is WikimediaEventMeta {
	return typeof object === 'object' &&
		typeof object.uri === 'string' &&
		typeof object.request_id === 'string' &&
		typeof object.id === 'string' &&
		typeof object.dt === 'string' &&
		typeof object.domain === 'string' &&
		typeof object.stream === 'string';

}

export interface WikimediaEventBase {

	/**
	 * A URI identifying the JSONSchema for this event. This should match an schema's $id
	 * in a schema repository. E.g. /schema/title/1.0.0
	 */
	'$schema': string;

	'meta': WikimediaEventMeta;

}

/**
 * Determines if an object is a Wikimedia event. This checks for the schema string and
 * WikimediaEventMeta property (`meta`).
 *
 * @param object The object to check
 */
export function isWikimediaEvent( object: any ): object is WikimediaEventBase {
	return typeof object === 'object' &&
		typeof object.$schema === 'string' &&
		isWikimediaEventMeta( object.meta );
}

export interface MediaWikiEvent extends WikimediaEventBase {
	/** The name of the wiki database this event entity belongs to. */
	database: string;
}

/**
 * Determines if an object is a MediaWiki event. This checks for the schema string, the
 * WikimediaEventMeta property (`meta`), and the database string.
 *
 * @param object The object to check
 */
export function isMediaWikiEvent( object: any ): object is MediaWikiEvent {
	return typeof object === 'object' &&
		typeof object.database === 'string' &&
		isWikimediaEvent( object );
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
	| MediaWikiRevisionTagsChangeEvent
	| MediaWikiRevisionVisibilityChangeEvent;

export default WikimediaEvent;
