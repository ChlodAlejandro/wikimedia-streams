/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import Comment from './common/Comment';
import Log from './common/Log';
import { WikimediaEventBase } from './EventStream';

/** Represents a MW RecentChange event. <https://www.mediawiki.org/wiki/Manual:RCFeed> */
export interface MediaWikiRecentChangeEventBase extends WikimediaEventBase, Comment {

	/**
	 * Type of recentchange event (rc_type). One of "edit", "new", "log",
	 * "categorize", or "external". (See Manual:Recentchanges table#rc_type)
	 */
	type: 'edit' | 'new' | 'log' | 'categorize' | 'external';

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

	/** $wgScriptPath */
	server_script_path: string;

	/** wfWikiID ($wgDBprefix, $wgDBname) */
	wiki: string;

}

export interface MediaWikiRecentChangeLogEvent extends MediaWikiRecentChangeEventBase, Log {
	type: 'log',
	comment: '';
	parsedComment: '';
}

export interface MediaWikiRecentChangeNewEvent extends MediaWikiRecentChangeEventBase {
	type: 'new',
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

export interface MediaWikiRecentChangeEditEvent
	extends Omit<MediaWikiRecentChangeNewEvent, 'type'> {
	type: 'edit',
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
	type: 'categorize';
	parsedComment: undefined;
}

type MediaWikiRecentChangeEvent =
	MediaWikiRecentChangeLogEvent
	| MediaWikiRecentChangeNewEvent
	| MediaWikiRecentChangeEditEvent
	| MediaWikiRecentChangeCategorizeEvent;

export default MediaWikiRecentChangeEvent;
