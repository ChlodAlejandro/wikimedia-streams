import { EventEmitter } from "events";
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

/**
 * The list of Wikimedia EventStreams types. Documentation for the
 * streams can be found at <https://stream.wikimedia.org/?doc>.
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
    "mediawiki.revision-visibility-change"
];

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
    "mediawiki.revision-visibility-change": MediaWikiRevisionVisibilityChangeEvent
}

export type SpecificWikimediaEventStream = typeof WikimediaEventStreams[number];
export type AliasWikimediaEventStream = keyof typeof WikimediaEventStreamAliases;
export type WikimediaEventStream = SpecificWikimediaEventStream | AliasWikimediaEventStream;

export const WikimediaEventStreamAliasesKey
    : Partial<Record<SpecificWikimediaEventStream, AliasWikimediaEventStream>> =
    (() : typeof WikimediaEventStreamAliasesKey => {
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
    once(event: "error", listener: (error: ErrorEvent) => void): this;

    on<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    on(event: "open" | "close", listener: () => void): this;
    on(event: "error", listener: (error: ErrorEvent) => void): this;

    addListener<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    addListener(event: "open" | "close", listener: () => void): this;
    addListener(event: "error", listener: (error: ErrorEvent) => void): this;

    off<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    off(event: "open" | "close", listener: () => void): this;
    off(event: "error", listener: (error: ErrorEvent) => void): this;

    removeListener<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    removeListener(event: "open" | "close", listener: () => void): this;
    removeListener(event: "error", listener: (error: ErrorEvent) => void): this;

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
    emit(event: "error", error: ErrorEvent): this;

    listenerCount(event: "open" | "error" | "close" | WikimediaEventStream): number;

    prependListener<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    prependListener(event: "open" | "close", listener: () => void): this;
    prependListener(event: "error", listener: (error: ErrorEvent) => void): this;

    prependOnceListener<T extends keyof WikimediaEventStreamEventTypes>(
        event: T,
        listener: WikimediaStreamEventListener<T>
    ): this;
    prependOnceListener(event: "open" | "close", listener: () => void): this;
    prependOnceListener(event: "error", listener: (error: ErrorEvent) => void): this;

}

/**
 * A WikimediaStream connects to the Wikimedia Event Platform EventStreams
 * domain (found at <https://streams.wikimedia.org>) and provides real-time
 * recent changes and actions on Wikimedia wikis.
 */
export class WikimediaStream extends EventEmitter {

    eventSource: EventSource;
    private lastEventId: string;
    private readonly streams: SpecificWikimediaEventStream[];
    private openCheckInterval: NodeJS.Timeout;

    public get status(): EventSourceState {
        return this.eventSource == null ? -1 : this.eventSource.readyState;
    }

    static readonly VERSION = require(path.join(__dirname, "..", "package.json")).version;

    static isWikimediaStream(
        stream: string
    ) : stream is SpecificWikimediaEventStream {
        return Array.from<string>(WikimediaEventStreams).includes(stream)
            || Object.keys(WikimediaEventStreamAliases).includes(stream);
    }

    static isWikimediaStreamAlias(
        stream: WikimediaEventStream
    ) : stream is AliasWikimediaEventStream {
        return WikimediaEventStreamAliases[stream] != null;
    }

    static isSpecificWikimediaStream(
        stream: WikimediaEventStream
    ) : stream is SpecificWikimediaEventStream {
        return WikimediaEventStreamAliases[stream] == null;
    }

    /**
     * Creates a new Wikimedia RecentChanges listener.
     * @param streams
     */
    public constructor(
        streams: WikimediaEventStream | WikimediaEventStream[],
        options: EventSourceInitDict = {}
    ) {
        super();

        // Validate stream type
        if (!Array.isArray(streams))
            streams = [streams];

        const specificStreams : SpecificWikimediaEventStream[] = [];
        for (let stream of streams) {
            if (WikimediaStream.isWikimediaStreamAlias(stream)) {
                specificStreams.push(WikimediaEventStreamAliases[stream]);
            } else
                specificStreams.push(stream);
        }
        this.streams = specificStreams;

        this.open(options);
    }

    /**
     * Start listening to the stream.
     */
    public open(options: EventSourceInitDict = {}): void {
        if (this.eventSource && this.eventSource.readyState !== this.eventSource.CLOSED)
            this.close();

        // Send Last-Event-ID to pick up from cancels, overriding the
        // Last-Event-ID header provided in options.

        options.headers = this.lastEventId != null ? {
            ...(options.headers ?? {}),
            "Last-Event-ID": this.lastEventId
        } : (options.headers ?? {});

        this.eventSource = new EventSource(
            `https://stream.wikimedia.org/v2/stream/${this.streams.join(",")}`,
             options
        );

        this.eventSource.addEventListener("open", () => {
            this.emit("open");
        });

        this.eventSource.addEventListener("error", (e: ErrorEvent) => {
            this.emit("error", e);
            if (this.eventSource.readyState !== this.eventSource.OPEN) {
                this.open(options);
            }
        });

        this.eventSource.addEventListener("close", () => {
            this.open(options);
        });

        this.eventSource.addEventListener("message", async (event: MessageEvent) => {
            this.lastEventId = event.lastEventId;

            const data : WikimediaEventBase = JSON.parse(event.data);

            this.emit(data.meta.stream, data, event);
            if (WikimediaEventStreamAliasesKey[data.meta.stream]) {
                for (const alias of WikimediaEventStreamAliasesKey[data.meta.stream]) {
                    this.emit(alias, data, event);
                }
            }
        });

        this.openCheckInterval = setInterval(() => {
            if (this.eventSource.readyState !== this.eventSource.OPEN) {
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
        clearInterval(this.openCheckInterval);
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
