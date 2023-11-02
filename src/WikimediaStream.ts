import { EventEmitter } from 'events';
import EventSource, { EventSourceInitDict } from 'eventsource';
import WikimediaEventBase, { WikimediaEventMeta } from './streams/EventStream';
import type MediaWikiRevisionCreateEvent from './streams/MediaWikiRevisionCreateEvent';
import type MediaWikiPageDeleteEvent from './streams/MediaWikiPageDeleteEvent';
import type MediaWikiPageLinksChangeEvent from './streams/MediaWikiPageLinksChangeEvent';
import type MediaWikiPageMoveEvent from './streams/MediaWikiPageMoveEvent';
import type MediaWikiPagePropertiesChangeEvent from './streams/MediaWikiPagePropertiesChangeEvent';
import type MediaWikiPageUndeleteEvent from './streams/MediaWikiPageUndeleteEvent';
import type MediaWikiRecentChangeEvent from './streams/MediaWikiRecentChangeEvent';
import type MediaWikiRevisionVisibilityChangeEvent
	from './streams/MediaWikiRevisionVisibilityChangeEvent';
import type EventGateTestEvent from './streams/EventGateTestEvent';
import MediaWikiRevisionTagsChangeEvent from './streams/MediaWikiRevisionTagsChangeEvent';
import { WikimediaStreamFilter } from './WikimediaStreamFilter';

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
 */
export type WikimediaEventStreamEventTypes = {
	'eventgate-main.test.event': EventGateTestEvent,
	'test': EventGateTestEvent,
	'mediawiki.page-create': MediaWikiRevisionCreateEvent,
	'page-create': MediaWikiRevisionCreateEvent,
	'mediawiki.page-delete': MediaWikiPageDeleteEvent,
	'page-delete': MediaWikiPageDeleteEvent,
	'mediawiki.page-links-change': MediaWikiPageLinksChangeEvent,
	'page-links-change': MediaWikiPageLinksChangeEvent,
	'mediawiki.page-move': MediaWikiPageMoveEvent,
	'page-move': MediaWikiPageMoveEvent,
	'mediawiki.page-properties-change': MediaWikiPagePropertiesChangeEvent,
	'page-properties-change': MediaWikiPagePropertiesChangeEvent,
	'mediawiki.page-undelete': MediaWikiPageUndeleteEvent,
	'page-undelete': MediaWikiPageUndeleteEvent,
	'mediawiki.recentchange': MediaWikiRecentChangeEvent,
	'recentchange': MediaWikiRecentChangeEvent,
	'mediawiki.revision-create': MediaWikiRevisionCreateEvent,
	'revision-create': MediaWikiRevisionCreateEvent,
	'mediawiki.revision-tags-change': MediaWikiRevisionTagsChangeEvent,
	'mediawiki.revision-visibility-change': MediaWikiRevisionVisibilityChangeEvent
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

// This is in sync with standard EventSource ready states.
export enum EventSourceState {
	Pending = -1,
	Connecting,
	Open,
	Closed
}

/**
 * Sets the type for listeners that are added to the {@link WikimediaStream} EventEmitter.
 */
export type WikimediaStreamEventListener<T extends keyof WikimediaEventStreamEventTypes> =
	( data: WikimediaEventStreamEventTypes[T], event: MessageEvent ) => void;

/**
 * Sets the type for listeners that are added to the {@link WikimediaStream} EventEmitter.
 */
export type RawWikimediaStreamEventListener<
	T extends WikimediaEventStreamEventTypes[keyof WikimediaEventStreamEventTypes]
> =
	( data: T, event: MessageEvent ) => void;

export type WikimediaStreamLastEventID = {
	/**
	 * The Kafka topic of the stream. This usually includes the datacenter and the
	 * stream topic (e.g. `eqiad.mediawiki.recentchange`).
	 */
	topic: string;
	/**
	 * The Kafka partition of the stream.
	 */
	partition: number;
	/**
	 * The timestamp to begin enumerating from. This should be a JavaScript-like
	 * timestamp (millisecond-based).
	 *
	 * KafkaSSE will always provide either a timestamp or an offset.
	 */
	timestamp?: number;
	/**
	 * The event offset to begin enumerating from.
	 *
	 * KafkaSSE will always provide either a timestamp or an offset.
	 */
	offset?: number;
};

export interface WikimediaStreamOptions extends EventSourceInitDict {
	/**
	 * Whether the stream should automatically be reopened if it closes due to an
	 * error or a periodic disconnect (standard for Wikimedia Foundation streams).
	 *
	 * @default true
	 */
	reopenOnClose?: boolean;
	/**
	 * Specifies the Kafka topics, partitions and offsets from which to begin
	 * streaming. You may not specify topics that are not configured to be part
	 * of this stream endpoint.
	 *
	 * If a timestamp is given, the stream will start from an event closest
	 * to the timestamp provided. If an offset is provided, the stream will start
	 * from the exact event at the provided offset. If both are provided, offset
	 * takes precedence.
	 *
	 * The last event ID received by the stream will always take precedence. If
	 * you want to continue a stream with a custom last event ID after this stream
	 * has already received events, instantiate a new stream.
	 *
	 * @see https://github.com/wikimedia/kafkasse#readme
	 * @example `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
	 */
	lastEventId?: WikimediaStreamLastEventID[];
	/**
	 * If given, this timestamp will be used as the historical starting position
	 * in each the requested streams. since should either be an integer UTC
	 * milliseconds unix epoch timestamp, or a string timestamp parseable by
	 * `Date.parse()`. If the timestamp given does not have any corresponding offsets,
	 * it will be ignored, and the data will begin streaming from the latest position
	 * in the stream. This parameter is ignored if `Last-Event-ID` is set with
	 * offsets (or timestamps) for individual topic partition assignments, e.g.
	 * when resuming after a disconnect.
	 *
	 * NOTE: Historical timestamp assignment is not supported indefinitely. Depending
	 * on backend stream configuration, will likely be only one or a few weeks.
	 */
	since?: string;
	/**
	 * Whether to start after instantiation or not.
	 *
	 * @default true
	 */
	autoStart?: boolean;
	/**
	 * Enable listening to canary events. Canary events are sent multiple times
	 * an hour to ensure that streams are not broken. They are filtered by
	 * default to avoid "fake" events from being received by a client.
	 *
	 * @see https://w.wiki/7$2z EventStreams documentation on canary events
	 * @see https://w.wiki/7$2v Technical documentation on canary events
	 * @default false
	 */
	enableCanary?: boolean;
}

export type ErrorEvent = Event & { type: 'error', message: string | undefined };

/*
 * Narrows down EventEmitter.
 */
export declare interface WikimediaStream {

	once<T extends keyof WikimediaEventStreamEventTypes>(
		event: T,
		listener: WikimediaStreamEventListener<T>
	): this;

	once( event: 'open' | 'close', listener: () => void ): this;

	once( event: 'error', listener: ( error: ErrorEvent ) => void ): this;

	on<T extends keyof WikimediaEventStreamEventTypes>(
		event: T,
		listener: WikimediaStreamEventListener<T>
	): this;

	on( event: 'open' | 'close', listener: () => void ): this;

	on( event: 'error', listener: ( error: ErrorEvent ) => void ): this;

	addListener<T extends keyof WikimediaEventStreamEventTypes>(
		event: T,
		listener: WikimediaStreamEventListener<T>
	): this;

	addListener( event: 'open' | 'close', listener: () => void ): this;

	addListener( event: 'error', listener: ( error: ErrorEvent ) => void ): this;

	off<T extends keyof WikimediaEventStreamEventTypes>(
		event: T,
		listener: WikimediaStreamEventListener<T>
	): this;

	off( event: 'open' | 'close', listener: () => void ): this;

	off( event: 'error', listener: ( error: ErrorEvent ) => void ): this;

	removeListener<T extends keyof WikimediaEventStreamEventTypes>(
		event: T,
		listener: WikimediaStreamEventListener<T>
	): this;

	removeListener( event: 'open' | 'close', listener: () => void ): this;

	removeListener( event: 'error', listener: ( error: ErrorEvent ) => void ): this;

	removeAllListeners(
		event?: 'open' | 'error' | 'close' | WikimediaEventStream
	): this;

	// eslint-disable-next-line @typescript-eslint/ban-types
	listeners( event: 'open' | 'error' | 'close' | WikimediaEventStream ): Function[];

	// eslint-disable-next-line @typescript-eslint/ban-types
	rawListeners( event: 'open' | 'error' | 'close' | WikimediaEventStream ): Function[];

	emit<T extends keyof WikimediaEventStreamEventTypes>(
		eventName: T,
		data: WikimediaEventStreamEventTypes[T],
		event: MessageEvent
	): boolean;

	emit( event: 'open' | 'close' ): this;

	emit( event: 'error', error: ErrorEvent ): this;

	listenerCount( event: 'open' | 'error' | 'close' | WikimediaEventStream ): number;

	prependListener<T extends keyof WikimediaEventStreamEventTypes>(
		event: T,
		listener: WikimediaStreamEventListener<T>
	): this;

	prependListener( event: 'open' | 'close', listener: () => void ): this;

	prependListener( event: 'error', listener: ( error: ErrorEvent ) => void ): this;

	prependOnceListener<T extends keyof WikimediaEventStreamEventTypes>(
		event: T,
		listener: WikimediaStreamEventListener<T>
	): this;

	prependOnceListener( event: 'open' | 'close', listener: () => void ): this;

	prependOnceListener( event: 'error', listener: ( error: ErrorEvent ) => void ): this;

}

/**
 * A WikimediaStream connects to the Wikimedia Event Platform EventStreams
 * domain (found at {@link https://streams.wikimedia.org}) and provides real-time
 * recent changes and actions on Wikimedia wikis.
 */
export class WikimediaStream extends EventEmitter {

	/**
	 * The EventSource which listens to streams on the Wikimedia Event Platform. Uses
	 * the `eventsource` package, which is backwards-compatible with the
	 * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventSource|EventSource} Web API.
	 */
	eventSource: EventSource;
	/**
	 * The last event ID received from the EventSource. Used to seamlessly re-listen to
	 * closed connections.
	 *
	 * @private
	 */
	private _lastEventId: string;
	/**
	 * The streams that this WikimediaStream is currently listening/will listen to.
	 *
	 * @private
	 */
	private readonly streams: SpecificWikimediaEventStream[];
	/**
	 * A NodeJS.Timeout which checks if the EventSource is still open. The interval
	 * checks if the EventSource is still open every second, and reopens it if it's
	 * closed.
	 *
	 * @private
	 */
	private openCheckInterval: NodeJS.Timeout;
	/**
	 * A NodeJS.Timeout which reopens the EventSource every 15 minutes. This ensures
	 * that messages are still being received (with a worst possible lag of 15 minutes)
	 * even if the EventSource disconnects with no error or close event.
	 *
	 * @private
	 */
	private restartInterval: NodeJS.Timeout;

	/**
	 * The current status of this stream.
	 */
	public get status(): EventSourceState {
		return this.eventSource == null ? -1 : this.eventSource.readyState;
	}

	public get lastEventId(): WikimediaStreamLastEventID[] {
		return JSON.parse( this._lastEventId );
	}

	/**
	 * The version of this package. Used for the default `User-Agent` header.
	 */
	static readonly VERSION = '2.1.0';

	/**
	 * The generic user agent to be used by wikimedia-streams when
	 * no default user agent is used or set.
	 */
	static readonly genericUserAgent = `wikimedia-streams/${WikimediaStream.VERSION}`;
	/**
	 * The default user agent to be used by wikimedia-streams.
	 */
	static defaultUserAgent = WikimediaStream.genericUserAgent;

	/**
	 * Checks if a given string is a valid {@link WikimediaEventStream}.
	 *
	 * @param stream The string to check.
	 * @return {} Whether the stream is a valid Wikimedia stream ID or not.
	 */
	static isWikimediaStream(
		stream: string
	): stream is SpecificWikimediaEventStream {
		return Array.from<string>( WikimediaEventStreams ).includes( stream ) ||
			Object.keys( WikimediaEventStreamAliases ).includes( stream );
	}

	/**
	 * Checks if a given string is a valid {@link AliasWikimediaEventStream} ID.
	 *
	 * @param stream The string to check.
	 */
	static isWikimediaStreamAlias(
		stream: WikimediaEventStream
	): stream is AliasWikimediaEventStream {
		return WikimediaEventStreamAliases[ stream ] != null;
	}

	/**
	 * Checks if a given string is a valid {@link SpecificWikimediaEventStream} ID.
	 *
	 * @param stream The string to check.
	 */
	static isSpecificWikimediaStream(
		stream: WikimediaEventStream
	): stream is SpecificWikimediaEventStream {
		return WikimediaEventStreamAliases[ stream ] == null;
	}

	private readonly startingOptions: WikimediaStreamOptions;

	/**
	 * Creates a new Wikimedia RecentChanges listener. This will automatically start the
	 * stream upon construction; you do not need to call {@link WikimediaStream#open} after
	 * instantiating this class.
	 *
	 * @param streams
	 *   The streams to listen to. You may choose any stream defined by the
	 *   {@link https://stream.wikimedia.org/?doc|Wikimedia EventStreams documentation page}.
	 * @param options
	 *   Additional options for the EventSource.
	 */
	public constructor(
		streams: WikimediaEventStream | WikimediaEventStream[],
		options: WikimediaStreamOptions = {}
	) {
		super();
		this.startingOptions = options;

		// Convert stream ID to array if not array.
		if ( !Array.isArray( streams ) ) {
			streams = [ streams ];
		}

		// Find the specific streams for each ID given and push them to this.streams.
		const specificStreams: SpecificWikimediaEventStream[] = [];
		for ( const stream of streams ) {
			if ( WikimediaStream.isWikimediaStreamAlias( stream ) ) {
				specificStreams.push( WikimediaEventStreamAliases[ stream ] );
			} else {
				specificStreams.push( stream );
			}
		}
		this.streams = specificStreams;

		if ( options.lastEventId ) {
			this._lastEventId = JSON.stringify( options.lastEventId );
		}

		// Open this stream.
		if ( options.autoStart ?? true ) {
			// noinspection JSIgnoredPromiseFromCall
			this.open();
		}
	}

	/**
	 * Start listening to the stream.
	 *
	 * @param options
	 *   Additional options for the EventSource.
	 * @return A Promise that resolves once the stream is open.
	 */
	public async open(
		options: Omit<WikimediaStreamOptions, 'autoStart'> = this.startingOptions
	): Promise<void> {
		// If the EventSource is currently open, close it.
		if ( this.eventSource && this.eventSource.readyState !== this.eventSource.CLOSED ) {
			this.close();
		}

		const headers = Object.assign( {}, options.headers ?? {} );

		// Send Last-Event-ID to pick up from cancels, overriding the
		// Last-Event-ID header provided in options.
		if ( this._lastEventId ) {
			headers[ 'Last-Event-ID' ] = this._lastEventId;
		} else if ( options.lastEventId ) {
			headers[ 'Last-Event-ID' ] = JSON.stringify( options.lastEventId );
		} else if ( options.headers?.[ 'Last-Event-ID' ] ) {
			headers[ 'Last-Event-ID' ] = options.headers[ 'Last-Event-ID' ];
		}
		// Send generic User-Agent when one has not been provided.
		if (
			Object.keys( headers )
				.some( ( header ) => header.toLowerCase() === 'user-agent' ) === false
		) {
			headers[ 'User-Agent' ] = WikimediaStream.defaultUserAgent;
		}

		const url = new URL( `https://stream.wikimedia.org/v2/stream/${this.streams.join( ',' )}` );
		if ( options.since ) {
			url.searchParams.append( 'since', options.since );
		}

		this.eventSource = new EventSource(
			url.toString(), {
				headers,
				https: options.https,
				proxy: options.proxy,
				rejectUnauthorized: options.rejectUnauthorized,
				withCredentials: options.withCredentials
			}
		);

		this.attachEventListeners( options );

		if ( options.reopenOnClose ) {
			// Periodically check if the EventSource is still open, and reconnect if it isn't.
			this.openCheckInterval = setInterval( () => {
				if (
					!this.eventSource ||
					this.eventSource.readyState === this.eventSource.CLOSED
				) {
					this.open( options );
				}
			}, 1e3 );
		}
		this.restartInterval = setInterval( () => {
			this.close();
			this.open( options );
		}, 60e3 * 15 );

		return new Promise( ( res ) => {
			this.once( 'open', res );
		} );
	}

	/**
	 * Stop listening to the stream.
	 */
	public close(): void {
		if ( this.openCheckInterval ) {
			clearInterval( this.openCheckInterval );
			this.openCheckInterval = null;
		}
		clearInterval( this.restartInterval );
		this.restartInterval = null;

		this.eventSource?.close();
		this.eventSource = null;

		this.emit( 'close' );
	}

	/**
	 *
	 * @param options
	 */
	attachEventListeners( options: WikimediaStreamOptions ) {
		this.eventSource.addEventListener( 'open', () => {
			this.emit( 'open' );
		} );

		this.eventSource.addEventListener( 'error', ( e ) => {
			if ( ( e as any ).status === 500 || ( e as any ).status === 503 ) {
				// Internal server error.
				// Back off and try again.
				setTimeout( this.open.bind( this, options ), 2e3 );
				return;
			}

			if ( ( e as any ).message !== undefined ) {
				// This wasn't a 15-minute timeout disconnect. Emit error.
				this.emit( 'error', e as any );
			}
			// Attempt reopen if error was fatal.
			if (
				this.eventSource.readyState !== this.eventSource.OPEN &&
				options.reopenOnClose !== false
			) {
				// noinspection JSIgnoredPromiseFromCall
				this.open( options );
			}
		} );

		this.eventSource.addEventListener( 'close', () => {
			if ( options.reopenOnClose !== false ) {
				// Reopen if connection was closed.
				// noinspection JSIgnoredPromiseFromCall
				this.open( options );
			}
		} );

		const skipCanary = !( options.enableCanary ?? false );
		this.eventSource.addEventListener( 'message', async ( event: MessageEvent ) => {
			this._lastEventId = event.lastEventId;

			const data: WikimediaEventBase = JSON.parse( event.data );

			if ( skipCanary && ( data.meta as WikimediaEventMeta )?.domain === 'canary' ) {
				// Block all incoming canary events unless requested by user.
				return;
			}

			// Emit event.
			this.emit( data.meta.stream, data, event );
			// Emit event to aliases of event stream.
			if ( WikimediaEventStreamAliasesKey[ data.meta.stream ] ) {
				for ( const alias of WikimediaEventStreamAliasesKey[ data.meta.stream ] ) {
					this.emit( alias, data, event );
				}
			}
		} );
	}

	/**
	 *
	 */
	eventNames(): ( 'open' | 'error' | 'close' | WikimediaEventStream )[] {
		return <( 'open' | 'error' | 'close' | WikimediaEventStream )[]>[
			'open',
			'error',
			'close',
			...WikimediaEventStreams,
			...Object.keys( WikimediaEventStreamAliases )
		];
	}

	filter<T extends WikimediaEventStream>( eventType: T ):
		WikimediaStreamFilter<WikimediaEventStreamEventTypes[T], T> {
		return new WikimediaStreamFilter<WikimediaEventStreamEventTypes[typeof eventType], T>(
			this, eventType
		);
	}

	/**
	 * Returns a promise that resolves when the stream is closed.
	 */
	waitUntilClosed(): Promise<void> {
		// Already closed.
		if ( this.eventSource == null ) {
			return Promise.resolve();
		}
		return new Promise( res => {
			this.once( 'close', res );
		} );
	}

}

export default WikimediaStream;
