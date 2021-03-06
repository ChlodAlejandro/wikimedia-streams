import {EventEmitter} from "events";
import EventSource, {EventSourceInitDict} from "eventsource";
import WikimediaEventBase from "./streams/EventStream";
import type MediaWikiRevisionCreateEvent from "./streams/MediaWikiRevisionCreateEvent";
import type MediaWikiPageDeleteEvent from "./streams/MediaWikiPageDeleteEvent";
import type MediaWikiPageLinksChangeEvent from "./streams/MediaWikiPageLinksChangeEvent";
import type MediaWikiPageMoveEvent from "./streams/MediaWikiPageMoveEvent";
import type MediaWikiPagePropertiesChangeEvent from "./streams/MediaWikiPagePropertiesChangeEvent";
import type MediaWikiPageUndeleteEvent from "./streams/MediaWikiPageUndeleteEvent";
import type MediaWikiRecentChangeEvent from "./streams/MediaWikiRecentChangeEvent";
import type MediaWikiRevisionScoreEvent from "./streams/MediaWikiRevisionScoreEvent";
import type MediaWikiRevisionVisibilityChangeEvent from "./streams/MediaWikiRevisionVisibilityChangeEvent";
import type EventGateTestEvent from "./streams/EventGateTestEvent";
import path from "path";
import MediaWikiRevisionTagsChangeEvent from "./streams/MediaWikiRevisionTagsChangeEvent";

/**
 * The list of Wikimedia EventStreams types, excluding aliases (found in
 * {@link WikimediaEventStreamAliases} instead).
 *
 * @see {@link https://stream.wikimedia.org/?doc|List of streams}
 */
export const WikimediaEventStreams = <const>[
    "eventgate-main.test.event",
    "mediawiki.page-create",
    "mediawiki.page-delete",
    "mediawiki.page-links-change",
    "mediawiki.page-move",
    "mediawiki.page-properties-change",
    "mediawiki.page-undelete",
    "mediawiki.recentchange",
    "mediawiki.revision-create",
    "mediawiki.revision-score",
	"mediawiki.revision-tags-change",
    "mediawiki.revision-visibility-change"
];

/**
 * The list of Wikimedia EventStreams aliases. These streams point to other
 * streams.
 *
 * @see {@link https://stream.wikimedia.org/?doc|List of streams}
 */
export const WikimediaEventStreamAliases = <const>{
    "page-create": "mediawiki.page-create",
    "page-delete": "mediawiki.page-delete",
    "page-links-change": "mediawiki.page-links-change",
    "page-move": "mediawiki.page-move",
    "page-properties-change": "mediawiki.page-properties-change",
    "page-undelete": "mediawiki.page-undelete",
    "recentchange": "mediawiki.recentchange",
    "revision-create": "mediawiki.revision-create",
    "revision-score": "mediawiki.revision-score",
    "test": "eventgate-main.test.event"
};

/**
 * Type definition for each event stream. Respective type declarations for the
 * event stream payloads can be found in their respective files.
 */
type WikimediaEventStreamEventTypes = {
    "eventgate-main.test.event": EventGateTestEvent,
    "test": EventGateTestEvent,
    "mediawiki.page-create": MediaWikiRevisionCreateEvent,
    "page-create": MediaWikiRevisionCreateEvent,
    "mediawiki.page-delete": MediaWikiPageDeleteEvent,
    "page-delete": MediaWikiPageDeleteEvent,
    "mediawiki.page-links-change": MediaWikiPageLinksChangeEvent,
    "page-links-change": MediaWikiPageLinksChangeEvent,
    "mediawiki.page-move": MediaWikiPageMoveEvent,
    "page-move": MediaWikiPageMoveEvent,
    "mediawiki.page-properties-change": MediaWikiPagePropertiesChangeEvent,
    "page-properties-change": MediaWikiPagePropertiesChangeEvent,
    "mediawiki.page-undelete": MediaWikiPageUndeleteEvent,
    "page-undelete": MediaWikiPageUndeleteEvent,
    "mediawiki.recentchange": MediaWikiRecentChangeEvent,
    "recentchange": MediaWikiRecentChangeEvent,
    "mediawiki.revision-create": MediaWikiRevisionCreateEvent,
    "revision-create": MediaWikiRevisionCreateEvent,
    "mediawiki.revision-score": MediaWikiRevisionScoreEvent,
    "revision-score": MediaWikiRevisionScoreEvent,
	"mediawiki.revision-tags-change": MediaWikiRevisionTagsChangeEvent,
    "mediawiki.revision-visibility-change": MediaWikiRevisionVisibilityChangeEvent
}

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
 * @example `{ "mediawiki.page-create": ["page-create"], ... }`
 */
export const WikimediaEventStreamAliasesKey
    : Partial<Record<SpecificWikimediaEventStream, AliasWikimediaEventStream[]>> =
    (() : Partial<Record<SpecificWikimediaEventStream, AliasWikimediaEventStream[]>> => {
        const outputKey = {};

        for (const [alias, target] of Object.entries(WikimediaEventStreamAliases)) {
            if (outputKey[target] == null)
                outputKey[target] = [];

            outputKey[target].push(alias);
        }

        return outputKey;
    })();

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
type WikimediaStreamEventListener<T extends keyof WikimediaEventStreamEventTypes> =
    (data: WikimediaEventStreamEventTypes[T], event: MessageEvent) => void;

/*
 * Narrows down EventEmitter.
 */
export declare interface WikimediaStream {

    once<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    once(event: "open" | "close", listener: () => void): this;
    once(event: "error", listener: (error: MessageEvent<any>) => void): this;

    on<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    on(event: "open" | "close", listener: () => void): this;
    on(event: "error", listener: (error: MessageEvent<any>) => void): this;

    addListener<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    addListener(event: "open" | "close", listener: () => void): this;
    addListener(event: "error", listener: (error: MessageEvent<any>) => void): this;

    off<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    off(event: "open" | "close", listener: () => void): this;
    off(event: "error", listener: (error: MessageEvent<any>) => void): this;

    removeListener<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    removeListener(event: "open" | "close", listener: () => void): this;
    removeListener(event: "error", listener: (error: MessageEvent<any>) => void): this;

    removeAllListeners(
        event?: "open" | "error" | "close" | WikimediaEventStream
    ): this;

    listeners(event: "open" | "error" | "close" | WikimediaEventStream): Function[];

    rawListeners(event: "open" | "error" | "close" | WikimediaEventStream): Function[];

    emit<T extends keyof WikimediaEventStreamEventTypes>(
        eventName: T,
        data: WikimediaEventStreamEventTypes[T],
        event: MessageEvent
    ): boolean;
    emit(event: "open" | "close"): this;
    emit(event: "error", error: MessageEvent<any>): this;

    listenerCount(event: "open" | "error" | "close" | WikimediaEventStream): number;

    prependListener<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    prependListener(event: "open" | "close", listener: () => void): this;
    prependListener(event: "error", listener: (error: MessageEvent<any>) => void): this;

    prependOnceListener<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    prependOnceListener(event: "open" | "close", listener: () => void): this;
    prependOnceListener(event: "error", listener: (error: MessageEvent<any>) => void): this;

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
    private lastEventId: string;
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
     * The current status of this stream.
     */
    public get status(): EventSourceState {
        return this.eventSource == null ? -1 : this.eventSource.readyState;
    }

    /**
     * The version of this package. Used for the default `User-Agent` header.
     */
    static readonly VERSION = require(path.join(__dirname, "..", "package.json")).version;

    /**
     * Checks if a given string is a valid {@link WikimediaEventStream}.
     * @param stream The string to check.
     */
    static isWikimediaStream(
        stream: string
    ) : stream is SpecificWikimediaEventStream {
        return Array.from<string>(WikimediaEventStreams).includes(stream)
            || Object.keys(WikimediaEventStreamAliases).includes(stream);
    }

    /**
     * Checks if a given string is a valid {@link AliasWikimediaEventStream} ID.
     * @param stream The string to check.
     */
    static isWikimediaStreamAlias(
        stream: WikimediaEventStream
    ) : stream is AliasWikimediaEventStream {
        return WikimediaEventStreamAliases[stream] != null;
    }

    /**
     * Checks if a given string is a valid {@link SpecificWikimediaEventStream} ID.
     * @param stream The string to check.
     */
    static isSpecificWikimediaStream(
        stream: WikimediaEventStream
    ) : stream is SpecificWikimediaEventStream {
        return WikimediaEventStreamAliases[stream] == null;
    }

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
        options: EventSourceInitDict = {}
    ) {
        super();

        // Convert stream ID to array if not array.
        if (!Array.isArray(streams))
            streams = [streams];

        // Find the specific streams for each ID given and push them to this.streams.
        const specificStreams : SpecificWikimediaEventStream[] = [];
        for (let stream of streams) {
            if (WikimediaStream.isWikimediaStreamAlias(stream)) {
                specificStreams.push(WikimediaEventStreamAliases[stream]);
            } else
                specificStreams.push(stream);
        }
        this.streams = specificStreams;

        // Open this stream.
        this.open(options);
    }

    /**
     * Start listening to the stream.
     *
     * @param options
     *   Additional options for the EventSource.
     */
    public open(options: EventSourceInitDict = {}): void {
        // If the EventSource is currently open, close it.
        if (this.eventSource && this.eventSource.readyState !== this.eventSource.CLOSED)
            this.close();

        options.headers ??= {};

        // Send Last-Event-ID to pick up from cancels, overriding the
        // Last-Event-ID header provided in options.
        if (this.lastEventId != null) {
            options.headers["Last-Event-ID"] = this.lastEventId;
        }
        // Send generic User-Agent when one has not been provided.
        if (
            Object.keys(options.headers)
                .some((header) => header.toLowerCase() === "user-agent") === false
        ) {
            options.headers["User-Agent"] = `wikimedia-streams/${WikimediaStream.VERSION}`;
        }

        this.eventSource = new EventSource(
            `https://stream.wikimedia.org/v2/stream/${this.streams.join(",")}`,
             options
        );

        this.eventSource.addEventListener("open", () => {
            this.emit("open");
        });

        this.eventSource.addEventListener("error", (e: MessageEvent<any>) => {
            this.emit("error", e);
            // Reopen if error was fatal.
            if (this.eventSource.readyState !== this.eventSource.OPEN) {
                this.open(options);
            }
        });

        this.eventSource.addEventListener("close", () => {
            // Reopen if connection was closed.
            this.open(options);
        });

        this.eventSource.addEventListener("message", async (event: MessageEvent) => {
            this.lastEventId = event.lastEventId;

            const data : WikimediaEventBase = JSON.parse(event.data);

            // Emit event.
            this.emit(data.meta.stream, data, event);
            // Emit event to aliases of event stream.
            if (WikimediaEventStreamAliasesKey[data.meta.stream]) {
                for (const alias of WikimediaEventStreamAliasesKey[data.meta.stream]) {
                    this.emit(alias, data, event);
                }
            }
        });

        // Periodically check if the EventSource is still open, and reconnect if it isn't.
        this.openCheckInterval = setInterval(() => {
            if (this.eventSource.readyState === this.eventSource.CLOSED) {
                this.open(options);
            }
        }, 1000);
    }

    /**
     * Stop listening to the stream.
     */
    public close(): void {
        clearInterval(this.openCheckInterval);
        this.openCheckInterval = null;

        this.eventSource.close();
        this.eventSource = null;
        this.emit("close");
    }

    eventNames(): ("open" | "error" | "close" | WikimediaEventStream)[] {
        return <("open" | "error" | "close" | WikimediaEventStream)[]>[
            "open",
            "error",
            "close",
            ...WikimediaEventStreams,
            ...Object.keys(WikimediaEventStreamAliases)
        ];
    }

}

export default WikimediaStream;
