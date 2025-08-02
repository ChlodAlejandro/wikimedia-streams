import type EventGateTestEvent from './EventGateTestEvent';
import type MediaWikiRevisionCreateEvent from './MediaWikiRevisionCreateEvent';
import type MediaWikiPageDeleteEvent from './MediaWikiPageDeleteEvent';
import type MediaWikiPageLinksChangeEvent from './MediaWikiPageLinksChangeEvent';
import type MediaWikiPageMoveEvent from './MediaWikiPageMoveEvent';
import type MediaWikiPagePropertiesChangeEvent from './MediaWikiPagePropertiesChangeEvent';
import type MediaWikiPageUndeleteEvent from './MediaWikiPageUndeleteEvent';
import type MediaWikiRecentChangeEvent from './MediaWikiRecentChangeEvent';
import type MediaWikiRevisionTagsChangeEvent from './MediaWikiRevisionTagsChangeEvent';
import type MediaWikiRevisionVisibilityChangeEvent from './MediaWikiRevisionVisibilityChangeEvent';

/**
 * The list of Wikimedia EventStreams types, excluding aliases (found in
 * {@link WikimediaEventStreamAliases} instead).
 *
 * @see {@link https://stream.wikimedia.org/?doc|List of streams}
 */
export const WikimediaEventStreams = <const>[
	'eventgate-main.test.event',
	'mediawiki.page-create',
	'mediawiki.page-delete',
	'mediawiki.page-links-change',
	'mediawiki.page-move',
	'mediawiki.page-properties-change',
	'mediawiki.page-undelete',
	'mediawiki.recentchange',
	'mediawiki.revision-create',
	'mediawiki.revision-tags-change',
	'mediawiki.revision-visibility-change'
];
/**
 * The list of Wikimedia EventStreams aliases. These streams point to other
 * streams.
 *
 * @see {@link https://stream.wikimedia.org/?doc|List of streams}
 */
export const WikimediaEventStreamAliases = <const>{
	'page-create': 'mediawiki.page-create',
	'page-delete': 'mediawiki.page-delete',
	'page-links-change': 'mediawiki.page-links-change',
	'page-move': 'mediawiki.page-move',
	'page-properties-change': 'mediawiki.page-properties-change',
	'page-undelete': 'mediawiki.page-undelete',
	recentchange: 'mediawiki.recentchange',
	'revision-create': 'mediawiki.revision-create',
	test: 'eventgate-main.test.event'
};
/**
 * Type definition for each event stream. Respective type declarations for the
 * event stream payloads can be found in their respective files.
 *
 * Follow the order that the streams are defined in the documentation.
 * @see {@link https://stream.wikimedia.org/?doc|List of streams}
 */
export type WikimediaEventStreamEventTypes = {
	'eventgate-main.test.event': EventGateTestEvent,
	'mediawiki.page-create': MediaWikiRevisionCreateEvent,
	'mediawiki.page-delete': MediaWikiPageDeleteEvent,
	'mediawiki.page-links-change': MediaWikiPageLinksChangeEvent,
	'mediawiki.page-move': MediaWikiPageMoveEvent,
	'mediawiki.page-properties-change': MediaWikiPagePropertiesChangeEvent,
	'mediawiki.page-undelete': MediaWikiPageUndeleteEvent,
	'mediawiki.recentchange': MediaWikiRecentChangeEvent,
	'mediawiki.revision-create': MediaWikiRevisionCreateEvent,
	'mediawiki.revision-tags-change': MediaWikiRevisionTagsChangeEvent,
	'mediawiki.revision-visibility-change': MediaWikiRevisionVisibilityChangeEvent
	'page-create': MediaWikiRevisionCreateEvent,
	'page-delete': MediaWikiPageDeleteEvent,
	'page-links-change': MediaWikiPageLinksChangeEvent,
	'page-move': MediaWikiPageMoveEvent,
	'page-properties-change': MediaWikiPagePropertiesChangeEvent,
	'page-undelete': MediaWikiPageUndeleteEvent,
	'recentchange': MediaWikiRecentChangeEvent,
	'revision-create': MediaWikiRevisionCreateEvent,
	'test': EventGateTestEvent,
};
/**
 * The ID of a non-alias Wikimedia event stream.
 */
export type SpecificWikimediaEventStream = typeof WikimediaEventStreams[number];
/**
 * The ID of an alias Wikimedia event stream.
 */
export type AliasWikimediaEventStream = keyof typeof WikimediaEventStreamAliases;
/**
 * The ID of a Wikimedia event stream.
 */
export type WikimediaEventStream = SpecificWikimediaEventStream | AliasWikimediaEventStream;
/**
 * An object mapping specific Wikimedia event streams to an array of all their aliases.
 *
 * @example `{ "mediawiki.page-create": ["page-create"], ... }`
 */
export const WikimediaEventStreamAliasesKey
	: Partial<Record<SpecificWikimediaEventStream, AliasWikimediaEventStream[]>> =
	( (): Partial<Record<SpecificWikimediaEventStream, AliasWikimediaEventStream[]>> => {
		const outputKey = {};

		for ( const [ alias, target ] of Object.entries( WikimediaEventStreamAliases ) ) {
			if ( outputKey[ target ] == null ) {
				outputKey[ target ] = [];
			}

			outputKey[ target ].push( alias );
		}

		return outputKey;
	} )();
