import { WikimediaEventStream } from './streams';

// This list is manually updated.
// It allows events to be emitted on both the main stream name and aliased stream name on the client
// side, so that the client can listen to both stream names without having to know about the alias.
// Otherwise, events will only be emitted under the main stream name.
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

export type AliasedWikimediaEventStream = keyof typeof WikimediaEventStreamAliases;

/**
 * The ID of an alias Wikimedia event stream.
 */
export type AliasWikimediaEventStream = keyof typeof WikimediaEventStreamAliases;
/**
 * The ID of a non-alias Wikimedia event stream.
 */
export type SpecificWikimediaEventStream = Exclude<WikimediaEventStream, AliasWikimediaEventStream>;

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
