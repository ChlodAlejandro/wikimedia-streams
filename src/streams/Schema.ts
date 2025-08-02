export interface paths {
    "/v2/stream/{streams}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Subscribe to one or multiple streams.
         * @description Use this route to subscribe to a comma separated list of configured streams.
         *
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path: {
                    /** @description Comma separated list of stream names to subscribe to. */
                    streams: ("eventgate-main.test.event" | "mediainfo-streaming-updater.mutation.v2" | "mediawiki.page-create" | "mediawiki.page-delete" | "mediawiki.page-links-change" | "mediawiki.page-move" | "mediawiki.page-properties-change" | "mediawiki.page-undelete" | "mediawiki.page_change.v1" | "mediawiki.page_revert_risk_prediction_change.v1" | "mediawiki.recentchange" | "mediawiki.revision-create" | "mediawiki.revision-tags-change" | "mediawiki.revision-visibility-change" | "page-create" | "page-delete" | "page-links-change" | "page-move" | "page-properties-change" | "page-undelete" | "rdf-streaming-updater.mutation-main.v2" | "rdf-streaming-updater.mutation-scholarly.v2" | "rdf-streaming-updater.mutation.v2" | "recentchange" | "revision-create" | "test")[];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                        "text/event-stream": string;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/eventgate-main.test.event": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * eventgate-main.test.event events
         * @description A test event stream. A new event is posted about once a minute.
         *
         *     Schema title: test/event
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/test/event/1.0.0",
                         *       "meta": {
                         *         "dt": "2019-01-01T00:00:00Z",
                         *         "stream": "test.event.example"
                         *       },
                         *       "test": "specific test value",
                         *       "test_map": {
                         *         "key1": "val1",
                         *         "key2": "val2"
                         *       }
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @default default value */
                            test: string;
                            /** @description We want to support 'map' types using additionalProperties to specify the value types.  (Keys are always strings.)
                             *      */
                            test_map?: {
                                [key: string]: string;
                            };
                        };
                        /** @example {
                         *       "$schema": "/test/event/1.0.0",
                         *       "meta": {
                         *         "dt": "2019-01-01T00:00:00Z",
                         *         "stream": "test.event.example"
                         *       },
                         *       "test": "specific test value",
                         *       "test_map": {
                         *         "key1": "val1",
                         *         "key2": "val2"
                         *       }
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @default default value */
                            test: string;
                            /** @description We want to support 'map' types using additionalProperties to specify the value types.  (Keys are always strings.)
                             *      */
                            test_map?: {
                                [key: string]: string;
                            };
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediainfo-streaming-updater.mutation.v2": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediainfo-streaming-updater.mutation.v2 events
         * @description mediainfo-streaming-updater.mutation.v2 events.
         *
         *     Schema title: mediawiki/wikibase/entity/rdf_change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/wikibase/entity/rdf_change/2.0.0",
                         *       "dt": "2020-06-10T18:56:15Z",
                         *       "entity_id": "Q1",
                         *       "meta": {
                         *         "domain": "www.wikidata.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "request_id": "79c4ddcf-3db2-437d-9c42-2d144cefb8d1",
                         *         "stream": "some-rdf-stream"
                         *       },
                         *       "operation": "diff",
                         *       "rdf_added_data": {
                         *         "data": "data:s data:p data:o",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_deleted_data": {
                         *         "data": "data:rs data:rp data:ro",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_linked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_unlinked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rev_id": 327,
                         *       "sequence": 0,
                         *       "sequence_length": 1
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            /** @description Wikibase entity ID being modified */
                            entity_id: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * @description Type of update received:
                             *       * diff: only the required set of triples to add or remove is present in
                             *         the message
                             *       * import: all the entity triples are present
                             *       * delete: the entity has been deleted from the wikibase instance, no
                             *         RDF data is passed, the consumer must know how to delete the triples
                             *         related to this entity
                             *       * reconcile: indication that prior inconsistencies might have been
                             *         detected and that the data consumed so far for this entity cannot be
                             *         trusted, all the entity data is provided and a full reconciliation
                             *         must happen.
                             *
                             * @enum {string}
                             */
                            operation: "diff" | "import" | "delete" | "reconcile";
                            rdf_added_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_deleted_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_linked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_unlinked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            /** @description The (database) revision ID related to this change. */
                            rev_id: number;
                            /** @description The sequence number of this message used to reconstruct the event when it was considered too large to be encoded as a single message. The number of messages is encoded in sequence_length.
                             *      */
                            sequence: number;
                            /** @description The number of messages that have to be read to reconstruct this message.
                             *      */
                            sequence_length: number;
                            $defs: {
                                rdf_data: {
                                    /** @description the RDF data encoded using mime_type */
                                    data: string;
                                    /** @description Mime type of the RDF data stored in the data field */
                                    mime_type: string;
                                };
                            };
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/wikibase/entity/rdf_change/2.0.0",
                         *       "dt": "2020-06-10T18:56:15Z",
                         *       "entity_id": "Q1",
                         *       "meta": {
                         *         "domain": "www.wikidata.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "request_id": "79c4ddcf-3db2-437d-9c42-2d144cefb8d1",
                         *         "stream": "some-rdf-stream"
                         *       },
                         *       "operation": "diff",
                         *       "rdf_added_data": {
                         *         "data": "data:s data:p data:o",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_deleted_data": {
                         *         "data": "data:rs data:rp data:ro",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_linked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_unlinked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rev_id": 327,
                         *       "sequence": 0,
                         *       "sequence_length": 1
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            /** @description Wikibase entity ID being modified */
                            entity_id: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * @description Type of update received:
                             *       * diff: only the required set of triples to add or remove is present in
                             *         the message
                             *       * import: all the entity triples are present
                             *       * delete: the entity has been deleted from the wikibase instance, no
                             *         RDF data is passed, the consumer must know how to delete the triples
                             *         related to this entity
                             *       * reconcile: indication that prior inconsistencies might have been
                             *         detected and that the data consumed so far for this entity cannot be
                             *         trusted, all the entity data is provided and a full reconciliation
                             *         must happen.
                             *
                             * @enum {string}
                             */
                            operation: "diff" | "import" | "delete" | "reconcile";
                            rdf_added_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_deleted_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_linked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_unlinked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            /** @description The (database) revision ID related to this change. */
                            rev_id: number;
                            /** @description The sequence number of this message used to reconstruct the event when it was considered too large to be encoded as a single message. The number of messages is encoded in sequence_length.
                             *      */
                            sequence: number;
                            /** @description The number of messages that have to be read to reconstruct this message.
                             *      */
                            sequence_length: number;
                            $defs: {
                                rdf_data: {
                                    /** @description the RDF data encoded using mime_type */
                                    data: string;
                                    /** @description Mime type of the RDF data stored in the data field */
                                    mime_type: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.page-create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.page-create events
         * @description MediaWiki page create events. This page create stream
         *     is just the first revision create event for each page.
         *     As such, it reuses the mediawiki/revision/create schema.
         *
         *     Schema title: mediawiki/revision/create
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/revision/create/2.0.0",
                         *       "database": "examplewiki",
                         *       "dt": "2020-06-10T18:56:00Z",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-create",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "rev_content_changed": true,
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_is_revert": false,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_slots": {
                         *         "main": {
                         *           "rev_slot_content_model": "wikitext",
                         *           "rev_slot_origin_rev_id": 123,
                         *           "rev_slot_sha1": "2mx9qnkore72az8niqap1s3ycpu1jej",
                         *           "rev_slot_size": 20
                         *         }
                         *       },
                         *       "rev_timestamp": "2020-06-10T18:56:00Z"
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups?: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text?: string;
                            };
                            /** @description True if the content has changed (rev_sha1 is different than the previous revision one) */
                            rev_content_changed?: boolean;
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description Flag indicating whether the edit was a revert. */
                            rev_is_revert?: boolean;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description Details about the revert. */
                            rev_revert_details?: {
                                /** @description Flag indicating whether the revert was exact, i.e. the contents of the revert revision and restored revision match.
                                 *      */
                                rev_is_exact_revert: boolean;
                                /** @description The ID of an earlier revision that is being repeated or restored.
                                 *      */
                                rev_original_rev_id?: number;
                                /**
                                 * @description The method that was used to perform the revert.
                                 * @enum {string}
                                 */
                                rev_revert_method: "rollback" | "undo" | "manual";
                                /** @description IDs of revisions that were reverted by this edit, ordered from oldest to newest.
                                 *      */
                                rev_reverted_revs: number[];
                            };
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /** @description The revision slots attached to this revision.
                             *      */
                            rev_slots?: {
                                /**
                                 * fragment/mediawiki/revision/slot
                                 * @description Schema fields describing a revision slot
                                 */
                                main: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            } & {
                                [key: string]: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            };
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/revision/create/2.0.0",
                         *       "database": "examplewiki",
                         *       "dt": "2020-06-10T18:56:00Z",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-create",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "rev_content_changed": true,
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_is_revert": false,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_slots": {
                         *         "main": {
                         *           "rev_slot_content_model": "wikitext",
                         *           "rev_slot_origin_rev_id": 123,
                         *           "rev_slot_sha1": "2mx9qnkore72az8niqap1s3ycpu1jej",
                         *           "rev_slot_size": 20
                         *         }
                         *       },
                         *       "rev_timestamp": "2020-06-10T18:56:00Z"
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups?: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text?: string;
                            };
                            /** @description True if the content has changed (rev_sha1 is different than the previous revision one) */
                            rev_content_changed?: boolean;
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description Flag indicating whether the edit was a revert. */
                            rev_is_revert?: boolean;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description Details about the revert. */
                            rev_revert_details?: {
                                /** @description Flag indicating whether the revert was exact, i.e. the contents of the revert revision and restored revision match.
                                 *      */
                                rev_is_exact_revert: boolean;
                                /** @description The ID of an earlier revision that is being repeated or restored.
                                 *      */
                                rev_original_rev_id?: number;
                                /**
                                 * @description The method that was used to perform the revert.
                                 * @enum {string}
                                 */
                                rev_revert_method: "rollback" | "undo" | "manual";
                                /** @description IDs of revisions that were reverted by this edit, ordered from oldest to newest.
                                 *      */
                                rev_reverted_revs: number[];
                            };
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /** @description The revision slots attached to this revision.
                             *      */
                            rev_slots?: {
                                /**
                                 * fragment/mediawiki/revision/slot
                                 * @description Schema fields describing a revision slot
                                 */
                                main: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            } & {
                                [key: string]: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            };
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.page-delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.page-delete events
         * @description mediawiki.page-delete events.
         *
         *     Schema title: mediawiki/page/delete
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/delete/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-delete"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The number of revisions of this page at the time of this event. During a delete, this number of revisions will be archived.
                             *      */
                            rev_count?: number;
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/delete/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-delete"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The number of revisions of this page at the time of this event. During a delete, this number of revisions will be archived.
                             *      */
                            rev_count?: number;
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.page-links-change": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.page-links-change events
         * @description mediawiki.page-links-change events.
         *
         *     Schema title: mediawiki/page/links-change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/links-change/1.0.0",
                         *       "added_links": [
                         *         {
                         *           "external": false,
                         *           "link": "example_link"
                         *         }
                         *       ],
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-links-change"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The new page links. This map would only contain links that were either added or changed, links that were intact would not be present here. If the link was changed, its previous value would be present in the 'removed_links' object.
                             *      */
                            added_links?: {
                                /** @description Whether link is external */
                                external?: boolean;
                                /** @description Link being added */
                                link?: string;
                            }[];
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The old page links. This map would only contain the previous values of the links that were either removed or changed by this event. Links that were intact would not be present here. If the link was changed, its new value would be present in the 'added_links' object.
                             *      */
                            removed_links?: {
                                /** @description Whether link is external */
                                external?: boolean;
                                /** @description Link being removed */
                                link?: string;
                            }[];
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/links-change/1.0.0",
                         *       "added_links": [
                         *         {
                         *           "external": false,
                         *           "link": "example_link"
                         *         }
                         *       ],
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-links-change"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The new page links. This map would only contain links that were either added or changed, links that were intact would not be present here. If the link was changed, its previous value would be present in the 'removed_links' object.
                             *      */
                            added_links?: {
                                /** @description Whether link is external */
                                external?: boolean;
                                /** @description Link being added */
                                link?: string;
                            }[];
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The old page links. This map would only contain the previous values of the links that were either removed or changed by this event. Links that were intact would not be present here. If the link was changed, its new value would be present in the 'added_links' object.
                             *      */
                            removed_links?: {
                                /** @description Whether link is external */
                                external?: boolean;
                                /** @description Link being removed */
                                link?: string;
                            }[];
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.page-move": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.page-move events
         * @description mediawiki.page-move events.
         *
         *     Schema title: mediawiki/page/move
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/move/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-move"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "prior_state": {
                         *         "page_namespace": 0,
                         *         "page_title": "example_old_page_title",
                         *         "rev_id": 122
                         *       },
                         *       "rev_id": 123
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description Information about the new redirect page auto-created at the old title as a result of this page move. This field is optional and will be absent if no redirect page was created.
                             *      */
                            new_redirect_page?: {
                                /** @description The page ID of the newly created redirect page. */
                                page_id: number;
                                /** @description This will be the same as prior_state.page_namespace. */
                                page_namespace: number;
                                /** @description This will be the same as prior_state.page_title. */
                                page_title: string;
                                /** @description The revision created for the newly created redirect page. */
                                rev_id: number;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event. If a top level entity field is not present in this object, then its value has not changed since the prior event.
                             *      */
                            prior_state: {
                                /** @description The namespace ID this page belonged to before this event. */
                                page_namespace: number;
                                /** @description The normalized title of this page before this event. */
                                page_title: string;
                                /** @description The head revision of this page before this event. */
                                rev_id: number;
                            };
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/move/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-move"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "prior_state": {
                         *         "page_namespace": 0,
                         *         "page_title": "example_old_page_title",
                         *         "rev_id": 122
                         *       },
                         *       "rev_id": 123
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description Information about the new redirect page auto-created at the old title as a result of this page move. This field is optional and will be absent if no redirect page was created.
                             *      */
                            new_redirect_page?: {
                                /** @description The page ID of the newly created redirect page. */
                                page_id: number;
                                /** @description This will be the same as prior_state.page_namespace. */
                                page_namespace: number;
                                /** @description This will be the same as prior_state.page_title. */
                                page_title: string;
                                /** @description The revision created for the newly created redirect page. */
                                rev_id: number;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event. If a top level entity field is not present in this object, then its value has not changed since the prior event.
                             *      */
                            prior_state: {
                                /** @description The namespace ID this page belonged to before this event. */
                                page_namespace: number;
                                /** @description The normalized title of this page before this event. */
                                page_title: string;
                                /** @description The head revision of this page before this event. */
                                rev_id: number;
                            };
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.page-properties-change": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.page-properties-change events
         * @description mediawiki.page-properties-change events.
         *
         *     Schema title: mediawiki/page/properties-change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/properties-change/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-properties-change"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The new page properties. This map would only contain properties that were either added or changed, properties that were intact would not be present here. If the property was changed, its previous value would be present in the 'removed_properties' object.
                             *      */
                            added_properties?: Record<string, never>;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The old page properties. This map would only contain the previous values of the properties that were either removed or changed by this event. Properties that were intact would not be present here. If the property was changed, its new value would be present in the 'added_properties' object.
                             *      */
                            removed_properties?: Record<string, never>;
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/properties-change/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-properties-change"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The new page properties. This map would only contain properties that were either added or changed, properties that were intact would not be present here. If the property was changed, its previous value would be present in the 'removed_properties' object.
                             *      */
                            added_properties?: Record<string, never>;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The old page properties. This map would only contain the previous values of the properties that were either removed or changed by this event. Properties that were intact would not be present here. If the property was changed, its new value would be present in the 'added_properties' object.
                             *      */
                            removed_properties?: Record<string, never>;
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.page-undelete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.page-undelete events
         * @description mediawiki.page-undelete events.
         *
         *     Schema title: mediawiki/page/undelete
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/undelete/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-undelete"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "prior_state": {
                         *         "page_id": 123
                         *       },
                         *       "rev_id": 123
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event. If a top level entity field is not present in this object, then its value has not changed since the prior event.  If prior_state itself is not present, then this event had no relevant prior state, indicating that it is probably the first time this type has been emitted for this entity. For page undeletes, prior_state will be absent unless the page_id is no longer the same as the page_id it had before it was deleted.
                             *      */
                            prior_state?: {
                                /** @description The page ID before this restore as it was in the archive table. */
                                page_id: number;
                            };
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/undelete/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-undelete"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "prior_state": {
                         *         "page_id": 123
                         *       },
                         *       "rev_id": 123
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event. If a top level entity field is not present in this object, then its value has not changed since the prior event.  If prior_state itself is not present, then this event had no relevant prior state, indicating that it is probably the first time this type has been emitted for this entity. For page undeletes, prior_state will be absent unless the page_id is no longer the same as the page_id it had before it was deleted.
                             *      */
                            prior_state?: {
                                /** @description The page ID before this restore as it was in the archive table. */
                                page_id: number;
                            };
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.page_change.v1": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.page_change.v1 events
         * @description mediawiki.page_change.v1 events.
         *
         *     Schema title: mediawiki/page/change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/change/1.2.0",
                         *       "changelog_kind": "update",
                         *       "comment": "changed a thing",
                         *       "dt": "2021-01-01T00:00:00.0Z",
                         *       "meta": {
                         *         "domain": "examplewiki",
                         *         "dt": "2021-01-01T00:00:00.0Z",
                         *         "stream": "mediawiki.page_change"
                         *       },
                         *       "page": {
                         *         "is_redirect": true,
                         *         "namespace_id": 1,
                         *         "page_id": 1,
                         *         "page_title": "example",
                         *         "redirect_page_link": {
                         *           "is_redirect": false,
                         *           "namespace_id": 1,
                         *           "page_id": 2,
                         *           "page_title": "Redirect_Target"
                         *         },
                         *         "revision_count": 1
                         *       },
                         *       "page_change_kind": "edit",
                         *       "performer": {
                         *         "user_id": 123,
                         *         "user_text": "yoohoo"
                         *       },
                         *       "revision": {
                         *         "comment": "changed a thing",
                         *         "content_slots": {
                         *           "main": {
                         *             "content_format": "text/x-wiki",
                         *             "content_model": "wikitext",
                         *             "content_sha1": "16619839a55cfb5c61bcf520bf9734e0c67f98cc",
                         *             "content_size": 100,
                         *             "origin_rev_id": 2,
                         *             "slot_role": "main"
                         *           }
                         *         },
                         *         "editor": {
                         *           "user_id": 123,
                         *           "user_text": "example"
                         *         },
                         *         "is_comment_visible": true,
                         *         "is_content_visible": true,
                         *         "is_editor_visible": true,
                         *         "is_minor_edit": false,
                         *         "rev_dt": "2021-01-01T00:00:00.0Z",
                         *         "rev_id": 2,
                         *         "rev_parent_id": 1,
                         *         "rev_sha1": "16619839a55cfb5c61bcf520bf9734e0c67f98cc",
                         *         "rev_size": 100
                         *       },
                         *       "wiki_id": "example"
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * @description The kind of this event in a changelog. This is used to map the event to an action in a data store.
                             *
                             * @enum {string}
                             */
                            changelog_kind: "insert" | "update" | "delete";
                            /** @description The comment left by the user that performed this change. Same as revision.comment on edits.
                             *      */
                            comment?: string;
                            /**
                             * fragment/mediawiki/state/entity/page
                             * @description Page entity that was created at the old title during a page move. This is only set for page move events. Note that the created_redirect_page will also have its own associated page create event.
                             *
                             */
                            created_redirect_page?: {
                                /** @description True if the page is a redirect page at the time of this event. */
                                is_redirect?: boolean;
                                /** @description The id of the namespace this page belongs to. */
                                namespace_id?: number;
                                /** @description The (database) page ID of the page. */
                                page_id: number;
                                /** @description The normalized title of the page. */
                                page_title: string;
                                /** @description NOTE: revision_count is never set for created_redirect_page. It is present here for backwards compatibility only.
                                 *      */
                                revision_count?: number;
                            };
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * fragment/mediawiki/state/entity/page
                             * @description Fields for MediaWiki page entity.
                             */
                            page: {
                                /** @description True if the page is a redirect page at the time of this event. */
                                is_redirect?: boolean;
                                /** @description The id of the namespace this page belongs to. */
                                namespace_id?: number;
                                /** @description The (database) page ID of the page. */
                                page_id: number;
                                /** @description The normalized title of the page. */
                                page_title: string;
                                /**
                                 * fragment/mediawiki/state/entity/page_link
                                 * @description If this page is currently a redirect, then this field contains information about the target page the redirect links to.
                                 *
                                 */
                                redirect_page_link?: {
                                    /** @description The interwiki prefix (iw_prefix) of this link. The presence of this prefix implies a target outside the local wiki. See https://meta.wikimedia.org/wiki/Help:Interwiki_linking
                                     *      */
                                    interwiki_prefix?: string;
                                    /** @description True if the page is a redirect page at the time of this event. */
                                    is_redirect?: boolean;
                                    /** @description The id of the namespace this page belongs to. */
                                    namespace_id?: number;
                                    /** @description The (database) page ID of the page. */
                                    page_id?: number;
                                    /** @description The normalized title of the page. */
                                    page_title?: string;
                                };
                                /** @description The number of revisions of this page at the time of this event. During a delete, this number of revisions will be archived. This field is likely only set for page delete events, as getting this information on all events is expensive.
                                 *      */
                                revision_count?: number;
                            };
                            /**
                             * @description The origin kind of the change to this page as viewed by MediaWiki.
                             *
                             * @enum {string}
                             */
                            page_change_kind: "create" | "undelete" | "edit" | "move" | "delete" | "visibility_change";
                            /**
                             * fragment/mediawiki/state/entity/user
                             * @description Represents the MediaWiki actor that made this change. If this change is an edit, this will be the same as revision.editor.
                             *
                             */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                 *      */
                                groups?: string[];
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                is_bot?: boolean;
                                /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                 *      */
                                is_system?: boolean;
                                /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                 *      */
                                is_temp?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                registration_dt?: string;
                                /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description The user name or text representation of the user that performed this change.
                                 *      */
                                user_text?: string;
                            };
                            /** @description Prior state of this page before this event. Fields are only present if their values have changed.
                             *      */
                            prior_state?: {
                                /**
                                 * fragment/mediawiki/state/entity/page
                                 * @description Fields for MediaWiki page entity.
                                 */
                                page?: {
                                    /** @description True if the page is a redirect page at the time of this event. */
                                    is_redirect?: boolean;
                                    /** @description The id of the namespace this page belongs to. */
                                    namespace_id?: number;
                                    /** @description The (database) page ID of the page. */
                                    page_id?: number;
                                    /** @description The normalized title of the page. */
                                    page_title?: string;
                                    /** @description NOTE: prior_state.page.revision_count is unlikely to be set, as getting the # of revisions previous to this change is difficult. This field is present here for backwards compatibiliy.
                                     *      */
                                    revision_count?: number;
                                };
                                /**
                                 * fragment/mediawiki/state/entity/revision
                                 * @description Fields for MediaWiki revision entity.
                                 */
                                revision?: {
                                    /** @description The comment left by the editor when this revision was made. */
                                    comment?: string;
                                    /**
                                     * fragment/mediawiki/state/entity/revision_slots
                                     * @description Map type representing MediaWiki's revision content slots. This map is keyed by the slot role name, e.g. 'main'.
                                     *
                                     */
                                    content_slots?: {
                                        [key: string]: {
                                            /** @description Content body. NOTE: This field is not required, and is often not set in streams as it can make events very large. It is included here for events that do include the content body.
                                             *      */
                                            content_body?: string;
                                            /** @description The 'content type' of the content.  E.g. wikitext/html. This is similiar to a MIME type. */
                                            content_format?: string;
                                            /** @description MediaWiki's content model of this content. E.g. wikitext, json, etc. */
                                            content_model?: string;
                                            /** @description sha1 sum of the content body. */
                                            content_sha1?: string;
                                            /** @description Byte size of the content body. */
                                            content_size?: number;
                                            /** @description Revision in which this slot was originally created */
                                            origin_rev_id?: number;
                                            /** @description Slot role name. */
                                            slot_role?: string;
                                        };
                                    };
                                    /**
                                     * fragment/mediawiki/state/entity/user
                                     * @description Represents the MediaWiki user that made this edit.
                                     */
                                    editor?: {
                                        /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                         *      */
                                        edit_count?: number;
                                        /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                         *      */
                                        groups?: string[];
                                        /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                         *      */
                                        is_bot?: boolean;
                                        /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                         *      */
                                        is_system?: boolean;
                                        /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                         *      */
                                        is_temp?: boolean;
                                        /**
                                         * Format: date-time
                                         * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                         *
                                         */
                                        registration_dt?: string;
                                        /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                         *      */
                                        user_id?: number;
                                        /** @description The user name or text representation of the user that performed this change.
                                         *      */
                                        user_text?: string;
                                    };
                                    /** @description Whether the comment of the revision is visible. See RevisionRecord->DELETED_COMMENT.
                                     *      */
                                    is_comment_visible?: boolean;
                                    /** @description Whether the revision's content body is visible. If this is false, then content should be redacted. See RevisionRecord->DELETED_TEXT
                                     *      */
                                    is_content_visible?: boolean;
                                    /** @description Whether the revision's editor information is visible. Affects editor field. See RevisionRecord->DELETED_USER
                                     *      */
                                    is_editor_visible?: boolean;
                                    /** @description True if the editor marked this revision as a minor edit. */
                                    is_minor_edit?: boolean;
                                    /**
                                     * Format: date-time
                                     * @description Time this revision was created. This is rev_timestamp in the MediaWiki database.
                                     *
                                     */
                                    rev_dt?: string;
                                    /** @description The (database) revision ID. */
                                    rev_id?: number;
                                    /** @description This revision's parent rev_id. */
                                    rev_parent_id?: number;
                                    /** @description sha1 sum considering all the content slots for this revision.
                                     *      */
                                    rev_sha1?: string;
                                    /** @description Byte size 'sum' of all the content slots for this revision. This 'size' is approximate, but may not be exact, depending on the kind of data that is stored in the content slots.
                                     *      */
                                    rev_size?: number;
                                };
                            };
                            /**
                             * fragment/mediawiki/state/entity/revision
                             * @description Fields for MediaWiki revision entity.
                             */
                            revision: {
                                /** @description The comment left by the editor when this revision was made. */
                                comment?: string;
                                /**
                                 * fragment/mediawiki/state/entity/revision_slots
                                 * @description Map type representing MediaWiki's revision content slots. This map is keyed by the slot role name, e.g. 'main'.
                                 *
                                 */
                                content_slots?: {
                                    [key: string]: {
                                        /** @description Content body. NOTE: This field is not required, and is often not set in streams as it can make events very large. It is included here for events that do include the content body.
                                         *      */
                                        content_body?: string;
                                        /** @description The 'content type' of the content.  E.g. wikitext/html. This is similiar to a MIME type. */
                                        content_format?: string;
                                        /** @description MediaWiki's content model of this content. E.g. wikitext, json, etc. */
                                        content_model?: string;
                                        /** @description sha1 sum of the content body. */
                                        content_sha1?: string;
                                        /** @description Byte size of the content body. */
                                        content_size?: number;
                                        /** @description Revision in which this slot was originally created */
                                        origin_rev_id?: number;
                                        /** @description Slot role name. */
                                        slot_role?: string;
                                    };
                                };
                                /**
                                 * fragment/mediawiki/state/entity/user
                                 * @description Represents the MediaWiki user that made this edit.
                                 */
                                editor?: {
                                    /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                     *      */
                                    edit_count?: number;
                                    /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                     *      */
                                    groups?: string[];
                                    /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                     *      */
                                    is_bot?: boolean;
                                    /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                     *      */
                                    is_system?: boolean;
                                    /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                     *      */
                                    is_temp?: boolean;
                                    /**
                                     * Format: date-time
                                     * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                     *
                                     */
                                    registration_dt?: string;
                                    /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                     *      */
                                    user_id?: number;
                                    /** @description The user name or text representation of the user that performed this change.
                                     *      */
                                    user_text?: string;
                                };
                                /** @description Whether the comment of the revision is visible. See RevisionRecord->DELETED_COMMENT.
                                 *      */
                                is_comment_visible?: boolean;
                                /** @description Whether the revision's content body is visible. If this is false, then content should be redacted. See RevisionRecord->DELETED_TEXT
                                 *      */
                                is_content_visible?: boolean;
                                /** @description Whether the revision's editor information is visible. Affects editor field. See RevisionRecord->DELETED_USER
                                 *      */
                                is_editor_visible?: boolean;
                                /** @description True if the editor marked this revision as a minor edit. */
                                is_minor_edit?: boolean;
                                /**
                                 * Format: date-time
                                 * @description Time this revision was created. This is rev_timestamp in the MediaWiki database.
                                 *
                                 */
                                rev_dt: string;
                                /** @description The (database) revision ID. */
                                rev_id: number;
                                /** @description This revision's parent rev_id. */
                                rev_parent_id?: number;
                                /** @description sha1 sum considering all the content slots for this revision.
                                 *      */
                                rev_sha1?: string;
                                /** @description Byte size 'sum' of all the content slots for this revision. This 'size' is approximate, but may not be exact, depending on the kind of data that is stored in the content slots.
                                 *      */
                                rev_size?: number;
                            };
                            /** @description The wiki ID, which is usually the same as the MediaWiki database name. E.g. enwiki, metawiki, etc.
                             *      */
                            wiki_id: string;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/change/1.2.0",
                         *       "changelog_kind": "update",
                         *       "comment": "changed a thing",
                         *       "dt": "2021-01-01T00:00:00.0Z",
                         *       "meta": {
                         *         "domain": "examplewiki",
                         *         "dt": "2021-01-01T00:00:00.0Z",
                         *         "stream": "mediawiki.page_change"
                         *       },
                         *       "page": {
                         *         "is_redirect": true,
                         *         "namespace_id": 1,
                         *         "page_id": 1,
                         *         "page_title": "example",
                         *         "redirect_page_link": {
                         *           "is_redirect": false,
                         *           "namespace_id": 1,
                         *           "page_id": 2,
                         *           "page_title": "Redirect_Target"
                         *         },
                         *         "revision_count": 1
                         *       },
                         *       "page_change_kind": "edit",
                         *       "performer": {
                         *         "user_id": 123,
                         *         "user_text": "yoohoo"
                         *       },
                         *       "revision": {
                         *         "comment": "changed a thing",
                         *         "content_slots": {
                         *           "main": {
                         *             "content_format": "text/x-wiki",
                         *             "content_model": "wikitext",
                         *             "content_sha1": "16619839a55cfb5c61bcf520bf9734e0c67f98cc",
                         *             "content_size": 100,
                         *             "origin_rev_id": 2,
                         *             "slot_role": "main"
                         *           }
                         *         },
                         *         "editor": {
                         *           "user_id": 123,
                         *           "user_text": "example"
                         *         },
                         *         "is_comment_visible": true,
                         *         "is_content_visible": true,
                         *         "is_editor_visible": true,
                         *         "is_minor_edit": false,
                         *         "rev_dt": "2021-01-01T00:00:00.0Z",
                         *         "rev_id": 2,
                         *         "rev_parent_id": 1,
                         *         "rev_sha1": "16619839a55cfb5c61bcf520bf9734e0c67f98cc",
                         *         "rev_size": 100
                         *       },
                         *       "wiki_id": "example"
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * @description The kind of this event in a changelog. This is used to map the event to an action in a data store.
                             *
                             * @enum {string}
                             */
                            changelog_kind: "insert" | "update" | "delete";
                            /** @description The comment left by the user that performed this change. Same as revision.comment on edits.
                             *      */
                            comment?: string;
                            /**
                             * fragment/mediawiki/state/entity/page
                             * @description Page entity that was created at the old title during a page move. This is only set for page move events. Note that the created_redirect_page will also have its own associated page create event.
                             *
                             */
                            created_redirect_page?: {
                                /** @description True if the page is a redirect page at the time of this event. */
                                is_redirect?: boolean;
                                /** @description The id of the namespace this page belongs to. */
                                namespace_id?: number;
                                /** @description The (database) page ID of the page. */
                                page_id: number;
                                /** @description The normalized title of the page. */
                                page_title: string;
                                /** @description NOTE: revision_count is never set for created_redirect_page. It is present here for backwards compatibility only.
                                 *      */
                                revision_count?: number;
                            };
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * fragment/mediawiki/state/entity/page
                             * @description Fields for MediaWiki page entity.
                             */
                            page: {
                                /** @description True if the page is a redirect page at the time of this event. */
                                is_redirect?: boolean;
                                /** @description The id of the namespace this page belongs to. */
                                namespace_id?: number;
                                /** @description The (database) page ID of the page. */
                                page_id: number;
                                /** @description The normalized title of the page. */
                                page_title: string;
                                /**
                                 * fragment/mediawiki/state/entity/page_link
                                 * @description If this page is currently a redirect, then this field contains information about the target page the redirect links to.
                                 *
                                 */
                                redirect_page_link?: {
                                    /** @description The interwiki prefix (iw_prefix) of this link. The presence of this prefix implies a target outside the local wiki. See https://meta.wikimedia.org/wiki/Help:Interwiki_linking
                                     *      */
                                    interwiki_prefix?: string;
                                    /** @description True if the page is a redirect page at the time of this event. */
                                    is_redirect?: boolean;
                                    /** @description The id of the namespace this page belongs to. */
                                    namespace_id?: number;
                                    /** @description The (database) page ID of the page. */
                                    page_id?: number;
                                    /** @description The normalized title of the page. */
                                    page_title?: string;
                                };
                                /** @description The number of revisions of this page at the time of this event. During a delete, this number of revisions will be archived. This field is likely only set for page delete events, as getting this information on all events is expensive.
                                 *      */
                                revision_count?: number;
                            };
                            /**
                             * @description The origin kind of the change to this page as viewed by MediaWiki.
                             *
                             * @enum {string}
                             */
                            page_change_kind: "create" | "undelete" | "edit" | "move" | "delete" | "visibility_change";
                            /**
                             * fragment/mediawiki/state/entity/user
                             * @description Represents the MediaWiki actor that made this change. If this change is an edit, this will be the same as revision.editor.
                             *
                             */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                 *      */
                                groups?: string[];
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                is_bot?: boolean;
                                /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                 *      */
                                is_system?: boolean;
                                /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                 *      */
                                is_temp?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                registration_dt?: string;
                                /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description The user name or text representation of the user that performed this change.
                                 *      */
                                user_text?: string;
                            };
                            /** @description Prior state of this page before this event. Fields are only present if their values have changed.
                             *      */
                            prior_state?: {
                                /**
                                 * fragment/mediawiki/state/entity/page
                                 * @description Fields for MediaWiki page entity.
                                 */
                                page?: {
                                    /** @description True if the page is a redirect page at the time of this event. */
                                    is_redirect?: boolean;
                                    /** @description The id of the namespace this page belongs to. */
                                    namespace_id?: number;
                                    /** @description The (database) page ID of the page. */
                                    page_id?: number;
                                    /** @description The normalized title of the page. */
                                    page_title?: string;
                                    /** @description NOTE: prior_state.page.revision_count is unlikely to be set, as getting the # of revisions previous to this change is difficult. This field is present here for backwards compatibiliy.
                                     *      */
                                    revision_count?: number;
                                };
                                /**
                                 * fragment/mediawiki/state/entity/revision
                                 * @description Fields for MediaWiki revision entity.
                                 */
                                revision?: {
                                    /** @description The comment left by the editor when this revision was made. */
                                    comment?: string;
                                    /**
                                     * fragment/mediawiki/state/entity/revision_slots
                                     * @description Map type representing MediaWiki's revision content slots. This map is keyed by the slot role name, e.g. 'main'.
                                     *
                                     */
                                    content_slots?: {
                                        [key: string]: {
                                            /** @description Content body. NOTE: This field is not required, and is often not set in streams as it can make events very large. It is included here for events that do include the content body.
                                             *      */
                                            content_body?: string;
                                            /** @description The 'content type' of the content.  E.g. wikitext/html. This is similiar to a MIME type. */
                                            content_format?: string;
                                            /** @description MediaWiki's content model of this content. E.g. wikitext, json, etc. */
                                            content_model?: string;
                                            /** @description sha1 sum of the content body. */
                                            content_sha1?: string;
                                            /** @description Byte size of the content body. */
                                            content_size?: number;
                                            /** @description Revision in which this slot was originally created */
                                            origin_rev_id?: number;
                                            /** @description Slot role name. */
                                            slot_role?: string;
                                        };
                                    };
                                    /**
                                     * fragment/mediawiki/state/entity/user
                                     * @description Represents the MediaWiki user that made this edit.
                                     */
                                    editor?: {
                                        /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                         *      */
                                        edit_count?: number;
                                        /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                         *      */
                                        groups?: string[];
                                        /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                         *      */
                                        is_bot?: boolean;
                                        /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                         *      */
                                        is_system?: boolean;
                                        /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                         *      */
                                        is_temp?: boolean;
                                        /**
                                         * Format: date-time
                                         * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                         *
                                         */
                                        registration_dt?: string;
                                        /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                         *      */
                                        user_id?: number;
                                        /** @description The user name or text representation of the user that performed this change.
                                         *      */
                                        user_text?: string;
                                    };
                                    /** @description Whether the comment of the revision is visible. See RevisionRecord->DELETED_COMMENT.
                                     *      */
                                    is_comment_visible?: boolean;
                                    /** @description Whether the revision's content body is visible. If this is false, then content should be redacted. See RevisionRecord->DELETED_TEXT
                                     *      */
                                    is_content_visible?: boolean;
                                    /** @description Whether the revision's editor information is visible. Affects editor field. See RevisionRecord->DELETED_USER
                                     *      */
                                    is_editor_visible?: boolean;
                                    /** @description True if the editor marked this revision as a minor edit. */
                                    is_minor_edit?: boolean;
                                    /**
                                     * Format: date-time
                                     * @description Time this revision was created. This is rev_timestamp in the MediaWiki database.
                                     *
                                     */
                                    rev_dt?: string;
                                    /** @description The (database) revision ID. */
                                    rev_id?: number;
                                    /** @description This revision's parent rev_id. */
                                    rev_parent_id?: number;
                                    /** @description sha1 sum considering all the content slots for this revision.
                                     *      */
                                    rev_sha1?: string;
                                    /** @description Byte size 'sum' of all the content slots for this revision. This 'size' is approximate, but may not be exact, depending on the kind of data that is stored in the content slots.
                                     *      */
                                    rev_size?: number;
                                };
                            };
                            /**
                             * fragment/mediawiki/state/entity/revision
                             * @description Fields for MediaWiki revision entity.
                             */
                            revision: {
                                /** @description The comment left by the editor when this revision was made. */
                                comment?: string;
                                /**
                                 * fragment/mediawiki/state/entity/revision_slots
                                 * @description Map type representing MediaWiki's revision content slots. This map is keyed by the slot role name, e.g. 'main'.
                                 *
                                 */
                                content_slots?: {
                                    [key: string]: {
                                        /** @description Content body. NOTE: This field is not required, and is often not set in streams as it can make events very large. It is included here for events that do include the content body.
                                         *      */
                                        content_body?: string;
                                        /** @description The 'content type' of the content.  E.g. wikitext/html. This is similiar to a MIME type. */
                                        content_format?: string;
                                        /** @description MediaWiki's content model of this content. E.g. wikitext, json, etc. */
                                        content_model?: string;
                                        /** @description sha1 sum of the content body. */
                                        content_sha1?: string;
                                        /** @description Byte size of the content body. */
                                        content_size?: number;
                                        /** @description Revision in which this slot was originally created */
                                        origin_rev_id?: number;
                                        /** @description Slot role name. */
                                        slot_role?: string;
                                    };
                                };
                                /**
                                 * fragment/mediawiki/state/entity/user
                                 * @description Represents the MediaWiki user that made this edit.
                                 */
                                editor?: {
                                    /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                     *      */
                                    edit_count?: number;
                                    /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                     *      */
                                    groups?: string[];
                                    /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                     *      */
                                    is_bot?: boolean;
                                    /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                     *      */
                                    is_system?: boolean;
                                    /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                     *      */
                                    is_temp?: boolean;
                                    /**
                                     * Format: date-time
                                     * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                     *
                                     */
                                    registration_dt?: string;
                                    /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                     *      */
                                    user_id?: number;
                                    /** @description The user name or text representation of the user that performed this change.
                                     *      */
                                    user_text?: string;
                                };
                                /** @description Whether the comment of the revision is visible. See RevisionRecord->DELETED_COMMENT.
                                 *      */
                                is_comment_visible?: boolean;
                                /** @description Whether the revision's content body is visible. If this is false, then content should be redacted. See RevisionRecord->DELETED_TEXT
                                 *      */
                                is_content_visible?: boolean;
                                /** @description Whether the revision's editor information is visible. Affects editor field. See RevisionRecord->DELETED_USER
                                 *      */
                                is_editor_visible?: boolean;
                                /** @description True if the editor marked this revision as a minor edit. */
                                is_minor_edit?: boolean;
                                /**
                                 * Format: date-time
                                 * @description Time this revision was created. This is rev_timestamp in the MediaWiki database.
                                 *
                                 */
                                rev_dt: string;
                                /** @description The (database) revision ID. */
                                rev_id: number;
                                /** @description This revision's parent rev_id. */
                                rev_parent_id?: number;
                                /** @description sha1 sum considering all the content slots for this revision.
                                 *      */
                                rev_sha1?: string;
                                /** @description Byte size 'sum' of all the content slots for this revision. This 'size' is approximate, but may not be exact, depending on the kind of data that is stored in the content slots.
                                 *      */
                                rev_size?: number;
                            };
                            /** @description The wiki ID, which is usually the same as the MediaWiki database name. E.g. enwiki, metawiki, etc.
                             *      */
                            wiki_id: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.page_revert_risk_prediction_change.v1": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.page_revert_risk_prediction_change.v1 events
         * @description mediawiki.page_revert_risk_prediction_change.v1 events.
         *
         *     Schema title: mediawiki/page/prediction_classification_change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/prediction_classification_change/1.1.0",
                         *       "changelog_kind": "update",
                         *       "comment": "changed a thing",
                         *       "dt": "2021-01-01T00:00:00.0Z",
                         *       "meta": {
                         *         "domain": "examplewiki",
                         *         "dt": "2021-01-01T00:00:00.0Z",
                         *         "stream": "mediawiki.page_change"
                         *       },
                         *       "page": {
                         *         "is_redirect": true,
                         *         "namespace_id": 1,
                         *         "page_id": 1,
                         *         "page_title": "example",
                         *         "redirect_page_link": {
                         *           "is_redirect": false,
                         *           "namespace_id": 1,
                         *           "page_id": 2,
                         *           "page_title": "Redirect_Target"
                         *         },
                         *         "revision_count": 1
                         *       },
                         *       "page_change_kind": "edit",
                         *       "performer": {
                         *         "user_id": 123,
                         *         "user_text": "yoohoo"
                         *       },
                         *       "predicted_classification": {
                         *         "model_name": "example_model",
                         *         "model_version": "1.0.1",
                         *         "predictions": [
                         *           "yes",
                         *           "mostly"
                         *         ],
                         *         "probabilities": {
                         *           "hardly": 0.01,
                         *           "mostly": 0.9,
                         *           "yes": 0.99
                         *         }
                         *       },
                         *       "revision": {
                         *         "comment": "changed a thing",
                         *         "editor": {
                         *           "user_id": 123,
                         *           "user_text": "example"
                         *         },
                         *         "is_comment_visible": true,
                         *         "is_content_visible": true,
                         *         "is_editor_visible": true,
                         *         "is_minor_edit": false,
                         *         "rev_dt": "2021-01-01T00:00:00.0Z",
                         *         "rev_id": 2,
                         *         "rev_parent_id": 1,
                         *         "rev_sha1": "16619839a55cfb5c61bcf520bf9734e0c67f98cc",
                         *         "rev_size": 100
                         *       },
                         *       "wiki_id": "example"
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * @description The kind of this event in a changelog. This is used to map the event to an action in a data store.
                             *
                             * @enum {string}
                             */
                            changelog_kind: "insert" | "update" | "delete";
                            /** @description The comment left by the user that performed this change. Same as revision.comment on edits.
                             *      */
                            comment?: string;
                            /**
                             * fragment/mediawiki/state/entity/page
                             * @description Page entity that was created at the old title during a page move. This is only set for page move events. Note that the created_redirect_page will also have its own associated page create event.
                             *
                             */
                            created_redirect_page?: {
                                /** @description True if the page is a redirect page at the time of this event. */
                                is_redirect?: boolean;
                                /** @description The id of the namespace this page belongs to. */
                                namespace_id?: number;
                                /** @description The (database) page ID of the page. */
                                page_id: number;
                                /** @description The normalized title of the page. */
                                page_title: string;
                                /** @description NOTE: revision_count is never set for created_redirect_page. It is present here for backwards compatibility only.
                                 *      */
                                revision_count?: number;
                            };
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * fragment/mediawiki/state/entity/page
                             * @description Fields for MediaWiki page entity.
                             */
                            page: {
                                /** @description True if the page is a redirect page at the time of this event. */
                                is_redirect?: boolean;
                                /** @description The id of the namespace this page belongs to. */
                                namespace_id?: number;
                                /** @description The (database) page ID of the page. */
                                page_id: number;
                                /** @description The normalized title of the page. */
                                page_title: string;
                                /**
                                 * fragment/mediawiki/state/entity/page_link
                                 * @description If this page is currently a redirect, then this field contains information about the target page the redirect links to.
                                 *
                                 */
                                redirect_page_link?: {
                                    /** @description The interwiki prefix (iw_prefix) of this link. The presence of this prefix implies a target outside the local wiki. See https://meta.wikimedia.org/wiki/Help:Interwiki_linking
                                     *      */
                                    interwiki_prefix?: string;
                                    /** @description True if the page is a redirect page at the time of this event. */
                                    is_redirect?: boolean;
                                    /** @description The id of the namespace this page belongs to. */
                                    namespace_id?: number;
                                    /** @description The (database) page ID of the page. */
                                    page_id?: number;
                                    /** @description The normalized title of the page. */
                                    page_title?: string;
                                };
                                /** @description The number of revisions of this page at the time of this event. During a delete, this number of revisions will be archived. This field is likely only set for page delete events, as getting this information on all events is expensive.
                                 *      */
                                revision_count?: number;
                            };
                            /**
                             * @description The origin kind of the change to this page as viewed by MediaWiki.
                             *
                             * @enum {string}
                             */
                            page_change_kind: "create" | "undelete" | "edit" | "move" | "delete" | "visibility_change";
                            /**
                             * fragment/mediawiki/state/entity/user
                             * @description Represents the MediaWiki actor that made this change. If this change is an edit, this will be the same as revision.editor.
                             *
                             */
                            performer: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                 *      */
                                groups?: string[];
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                is_bot?: boolean;
                                /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                 *      */
                                is_system?: boolean;
                                /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                 *      */
                                is_temp?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                registration_dt?: string;
                                /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description The user name or text representation of the user that performed this change.
                                 *      */
                                user_text?: string;
                            };
                            predicted_classification?: {
                                /** @description The name of the classsification model used. */
                                model_name: string;
                                /** @description The version of the classsification model used. */
                                model_version: string;
                                /** @description A list of predictions made by this model. */
                                predictions: string[];
                                /** @description A list of probabilities made by this model. Each element is a key/value with class name and associated [0-1] probability.
                                 *      */
                                probabilities: {
                                    [key: string]: number;
                                };
                            };
                            /** @description Prior state of this page before this event. Fields are only present if their values have changed.
                             *      */
                            prior_state?: {
                                /**
                                 * fragment/mediawiki/state/entity/page
                                 * @description Fields for MediaWiki page entity.
                                 */
                                page?: {
                                    /** @description True if the page is a redirect page at the time of this event. */
                                    is_redirect?: boolean;
                                    /** @description The id of the namespace this page belongs to. */
                                    namespace_id?: number;
                                    /** @description The (database) page ID of the page. */
                                    page_id?: number;
                                    /** @description The normalized title of the page. */
                                    page_title?: string;
                                    /** @description NOTE: prior_state.page.revision_count is unlikely to be set, as getting the # of revisions previous to this change is difficult. This field is present here for backwards compatibiliy.
                                     *      */
                                    revision_count?: number;
                                };
                                /**
                                 * fragment/mediawiki/state/entity/revision
                                 * @description Fields for MediaWiki revision entity.
                                 */
                                revision?: {
                                    /** @description The comment left by the editor when this revision was made. */
                                    comment?: string;
                                    /**
                                     * fragment/mediawiki/state/entity/user
                                     * @description Represents the MediaWiki user that made this edit.
                                     */
                                    editor?: {
                                        /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                         *      */
                                        edit_count?: number;
                                        /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                         *      */
                                        groups?: string[];
                                        /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                         *      */
                                        is_bot?: boolean;
                                        /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                         *      */
                                        is_system?: boolean;
                                        /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                         *      */
                                        is_temp?: boolean;
                                        /**
                                         * Format: date-time
                                         * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                         *
                                         */
                                        registration_dt?: string;
                                        /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                         *      */
                                        user_id?: number;
                                        /** @description The user name or text representation of the user that performed this change.
                                         *      */
                                        user_text?: string;
                                    };
                                    /** @description Whether the comment of the revision is visible. See RevisionRecord->DELETED_COMMENT.
                                     *      */
                                    is_comment_visible?: boolean;
                                    /** @description Whether the revision's content body is visible. If this is false, then content should be redacted. See RevisionRecord->DELETED_TEXT
                                     *      */
                                    is_content_visible?: boolean;
                                    /** @description Whether the revision's editor information is visible. Affects editor field. See RevisionRecord->DELETED_USER
                                     *      */
                                    is_editor_visible?: boolean;
                                    /** @description True if the editor marked this revision as a minor edit. */
                                    is_minor_edit?: boolean;
                                    /**
                                     * Format: date-time
                                     * @description Time this revision was created. This is rev_timestamp in the MediaWiki database.
                                     *
                                     */
                                    rev_dt?: string;
                                    /** @description The (database) revision ID. */
                                    rev_id?: number;
                                    /** @description This revision's parent rev_id. */
                                    rev_parent_id?: number;
                                    /** @description sha1 sum considering all the content slots for this revision.
                                     *      */
                                    rev_sha1?: string;
                                    /** @description Byte size 'sum' of all the content slots for this revision. This 'size' is approximate, but may not be exact, depending on the kind of data that is stored in the content slots.
                                     *      */
                                    rev_size?: number;
                                };
                            };
                            /**
                             * fragment/mediawiki/state/entity/revision
                             * @description Fields for MediaWiki revision entity.
                             */
                            revision: {
                                /** @description The comment left by the editor when this revision was made. */
                                comment?: string;
                                /**
                                 * fragment/mediawiki/state/entity/user
                                 * @description Represents the MediaWiki user that made this edit.
                                 */
                                editor?: {
                                    /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                     *      */
                                    edit_count?: number;
                                    /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                     *      */
                                    groups?: string[];
                                    /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                     *      */
                                    is_bot?: boolean;
                                    /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                     *      */
                                    is_system?: boolean;
                                    /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                     *      */
                                    is_temp?: boolean;
                                    /**
                                     * Format: date-time
                                     * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                     *
                                     */
                                    registration_dt?: string;
                                    /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                     *      */
                                    user_id?: number;
                                    /** @description The user name or text representation of the user that performed this change.
                                     *      */
                                    user_text?: string;
                                };
                                /** @description Whether the comment of the revision is visible. See RevisionRecord->DELETED_COMMENT.
                                 *      */
                                is_comment_visible?: boolean;
                                /** @description Whether the revision's content body is visible. If this is false, then content should be redacted. See RevisionRecord->DELETED_TEXT
                                 *      */
                                is_content_visible?: boolean;
                                /** @description Whether the revision's editor information is visible. Affects editor field. See RevisionRecord->DELETED_USER
                                 *      */
                                is_editor_visible?: boolean;
                                /** @description True if the editor marked this revision as a minor edit. */
                                is_minor_edit?: boolean;
                                /**
                                 * Format: date-time
                                 * @description Time this revision was created. This is rev_timestamp in the MediaWiki database.
                                 *
                                 */
                                rev_dt: string;
                                /** @description The (database) revision ID. */
                                rev_id: number;
                                /** @description This revision's parent rev_id. */
                                rev_parent_id?: number;
                                /** @description sha1 sum considering all the content slots for this revision.
                                 *      */
                                rev_sha1?: string;
                                /** @description Byte size 'sum' of all the content slots for this revision. This 'size' is approximate, but may not be exact, depending on the kind of data that is stored in the content slots.
                                 *      */
                                rev_size?: number;
                            };
                            /** @description The wiki ID, which is usually the same as the MediaWiki database name. E.g. enwiki, metawiki, etc.
                             *      */
                            wiki_id: string;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/prediction_classification_change/1.1.0",
                         *       "changelog_kind": "update",
                         *       "comment": "changed a thing",
                         *       "dt": "2021-01-01T00:00:00.0Z",
                         *       "meta": {
                         *         "domain": "examplewiki",
                         *         "dt": "2021-01-01T00:00:00.0Z",
                         *         "stream": "mediawiki.page_change"
                         *       },
                         *       "page": {
                         *         "is_redirect": true,
                         *         "namespace_id": 1,
                         *         "page_id": 1,
                         *         "page_title": "example",
                         *         "redirect_page_link": {
                         *           "is_redirect": false,
                         *           "namespace_id": 1,
                         *           "page_id": 2,
                         *           "page_title": "Redirect_Target"
                         *         },
                         *         "revision_count": 1
                         *       },
                         *       "page_change_kind": "edit",
                         *       "performer": {
                         *         "user_id": 123,
                         *         "user_text": "yoohoo"
                         *       },
                         *       "predicted_classification": {
                         *         "model_name": "example_model",
                         *         "model_version": "1.0.1",
                         *         "predictions": [
                         *           "yes",
                         *           "mostly"
                         *         ],
                         *         "probabilities": {
                         *           "hardly": 0.01,
                         *           "mostly": 0.9,
                         *           "yes": 0.99
                         *         }
                         *       },
                         *       "revision": {
                         *         "comment": "changed a thing",
                         *         "editor": {
                         *           "user_id": 123,
                         *           "user_text": "example"
                         *         },
                         *         "is_comment_visible": true,
                         *         "is_content_visible": true,
                         *         "is_editor_visible": true,
                         *         "is_minor_edit": false,
                         *         "rev_dt": "2021-01-01T00:00:00.0Z",
                         *         "rev_id": 2,
                         *         "rev_parent_id": 1,
                         *         "rev_sha1": "16619839a55cfb5c61bcf520bf9734e0c67f98cc",
                         *         "rev_size": 100
                         *       },
                         *       "wiki_id": "example"
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * @description The kind of this event in a changelog. This is used to map the event to an action in a data store.
                             *
                             * @enum {string}
                             */
                            changelog_kind: "insert" | "update" | "delete";
                            /** @description The comment left by the user that performed this change. Same as revision.comment on edits.
                             *      */
                            comment?: string;
                            /**
                             * fragment/mediawiki/state/entity/page
                             * @description Page entity that was created at the old title during a page move. This is only set for page move events. Note that the created_redirect_page will also have its own associated page create event.
                             *
                             */
                            created_redirect_page?: {
                                /** @description True if the page is a redirect page at the time of this event. */
                                is_redirect?: boolean;
                                /** @description The id of the namespace this page belongs to. */
                                namespace_id?: number;
                                /** @description The (database) page ID of the page. */
                                page_id: number;
                                /** @description The normalized title of the page. */
                                page_title: string;
                                /** @description NOTE: revision_count is never set for created_redirect_page. It is present here for backwards compatibility only.
                                 *      */
                                revision_count?: number;
                            };
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * fragment/mediawiki/state/entity/page
                             * @description Fields for MediaWiki page entity.
                             */
                            page: {
                                /** @description True if the page is a redirect page at the time of this event. */
                                is_redirect?: boolean;
                                /** @description The id of the namespace this page belongs to. */
                                namespace_id?: number;
                                /** @description The (database) page ID of the page. */
                                page_id: number;
                                /** @description The normalized title of the page. */
                                page_title: string;
                                /**
                                 * fragment/mediawiki/state/entity/page_link
                                 * @description If this page is currently a redirect, then this field contains information about the target page the redirect links to.
                                 *
                                 */
                                redirect_page_link?: {
                                    /** @description The interwiki prefix (iw_prefix) of this link. The presence of this prefix implies a target outside the local wiki. See https://meta.wikimedia.org/wiki/Help:Interwiki_linking
                                     *      */
                                    interwiki_prefix?: string;
                                    /** @description True if the page is a redirect page at the time of this event. */
                                    is_redirect?: boolean;
                                    /** @description The id of the namespace this page belongs to. */
                                    namespace_id?: number;
                                    /** @description The (database) page ID of the page. */
                                    page_id?: number;
                                    /** @description The normalized title of the page. */
                                    page_title?: string;
                                };
                                /** @description The number of revisions of this page at the time of this event. During a delete, this number of revisions will be archived. This field is likely only set for page delete events, as getting this information on all events is expensive.
                                 *      */
                                revision_count?: number;
                            };
                            /**
                             * @description The origin kind of the change to this page as viewed by MediaWiki.
                             *
                             * @enum {string}
                             */
                            page_change_kind: "create" | "undelete" | "edit" | "move" | "delete" | "visibility_change";
                            /**
                             * fragment/mediawiki/state/entity/user
                             * @description Represents the MediaWiki actor that made this change. If this change is an edit, this will be the same as revision.editor.
                             *
                             */
                            performer: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                 *      */
                                groups?: string[];
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                is_bot?: boolean;
                                /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                 *      */
                                is_system?: boolean;
                                /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                 *      */
                                is_temp?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                registration_dt?: string;
                                /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description The user name or text representation of the user that performed this change.
                                 *      */
                                user_text?: string;
                            };
                            predicted_classification?: {
                                /** @description The name of the classsification model used. */
                                model_name: string;
                                /** @description The version of the classsification model used. */
                                model_version: string;
                                /** @description A list of predictions made by this model. */
                                predictions: string[];
                                /** @description A list of probabilities made by this model. Each element is a key/value with class name and associated [0-1] probability.
                                 *      */
                                probabilities: {
                                    [key: string]: number;
                                };
                            };
                            /** @description Prior state of this page before this event. Fields are only present if their values have changed.
                             *      */
                            prior_state?: {
                                /**
                                 * fragment/mediawiki/state/entity/page
                                 * @description Fields for MediaWiki page entity.
                                 */
                                page?: {
                                    /** @description True if the page is a redirect page at the time of this event. */
                                    is_redirect?: boolean;
                                    /** @description The id of the namespace this page belongs to. */
                                    namespace_id?: number;
                                    /** @description The (database) page ID of the page. */
                                    page_id?: number;
                                    /** @description The normalized title of the page. */
                                    page_title?: string;
                                    /** @description NOTE: prior_state.page.revision_count is unlikely to be set, as getting the # of revisions previous to this change is difficult. This field is present here for backwards compatibiliy.
                                     *      */
                                    revision_count?: number;
                                };
                                /**
                                 * fragment/mediawiki/state/entity/revision
                                 * @description Fields for MediaWiki revision entity.
                                 */
                                revision?: {
                                    /** @description The comment left by the editor when this revision was made. */
                                    comment?: string;
                                    /**
                                     * fragment/mediawiki/state/entity/user
                                     * @description Represents the MediaWiki user that made this edit.
                                     */
                                    editor?: {
                                        /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                         *      */
                                        edit_count?: number;
                                        /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                         *      */
                                        groups?: string[];
                                        /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                         *      */
                                        is_bot?: boolean;
                                        /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                         *      */
                                        is_system?: boolean;
                                        /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                         *      */
                                        is_temp?: boolean;
                                        /**
                                         * Format: date-time
                                         * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                         *
                                         */
                                        registration_dt?: string;
                                        /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                         *      */
                                        user_id?: number;
                                        /** @description The user name or text representation of the user that performed this change.
                                         *      */
                                        user_text?: string;
                                    };
                                    /** @description Whether the comment of the revision is visible. See RevisionRecord->DELETED_COMMENT.
                                     *      */
                                    is_comment_visible?: boolean;
                                    /** @description Whether the revision's content body is visible. If this is false, then content should be redacted. See RevisionRecord->DELETED_TEXT
                                     *      */
                                    is_content_visible?: boolean;
                                    /** @description Whether the revision's editor information is visible. Affects editor field. See RevisionRecord->DELETED_USER
                                     *      */
                                    is_editor_visible?: boolean;
                                    /** @description True if the editor marked this revision as a minor edit. */
                                    is_minor_edit?: boolean;
                                    /**
                                     * Format: date-time
                                     * @description Time this revision was created. This is rev_timestamp in the MediaWiki database.
                                     *
                                     */
                                    rev_dt?: string;
                                    /** @description The (database) revision ID. */
                                    rev_id?: number;
                                    /** @description This revision's parent rev_id. */
                                    rev_parent_id?: number;
                                    /** @description sha1 sum considering all the content slots for this revision.
                                     *      */
                                    rev_sha1?: string;
                                    /** @description Byte size 'sum' of all the content slots for this revision. This 'size' is approximate, but may not be exact, depending on the kind of data that is stored in the content slots.
                                     *      */
                                    rev_size?: number;
                                };
                            };
                            /**
                             * fragment/mediawiki/state/entity/revision
                             * @description Fields for MediaWiki revision entity.
                             */
                            revision: {
                                /** @description The comment left by the editor when this revision was made. */
                                comment?: string;
                                /**
                                 * fragment/mediawiki/state/entity/user
                                 * @description Represents the MediaWiki user that made this edit.
                                 */
                                editor?: {
                                    /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                     *      */
                                    edit_count?: number;
                                    /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. Not present for anonymous users.
                                     *      */
                                    groups?: string[];
                                    /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                     *      */
                                    is_bot?: boolean;
                                    /** @description True if the user is a MediaWiki 'system' user. These are users that cannot 'authenticate'.  These are usually listed in ReservedUsernames.
                                     *      */
                                    is_system?: boolean;
                                    /** @description True if the user is an autocreated temporary MediaWiki user. This is used for IP masking.
                                     *      */
                                    is_temp?: boolean;
                                    /**
                                     * Format: date-time
                                     * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                     *
                                     */
                                    registration_dt?: string;
                                    /** @description The user ID that performed this change.  This is optional, and will not be present for anonymous users.
                                     *      */
                                    user_id?: number;
                                    /** @description The user name or text representation of the user that performed this change.
                                     *      */
                                    user_text?: string;
                                };
                                /** @description Whether the comment of the revision is visible. See RevisionRecord->DELETED_COMMENT.
                                 *      */
                                is_comment_visible?: boolean;
                                /** @description Whether the revision's content body is visible. If this is false, then content should be redacted. See RevisionRecord->DELETED_TEXT
                                 *      */
                                is_content_visible?: boolean;
                                /** @description Whether the revision's editor information is visible. Affects editor field. See RevisionRecord->DELETED_USER
                                 *      */
                                is_editor_visible?: boolean;
                                /** @description True if the editor marked this revision as a minor edit. */
                                is_minor_edit?: boolean;
                                /**
                                 * Format: date-time
                                 * @description Time this revision was created. This is rev_timestamp in the MediaWiki database.
                                 *
                                 */
                                rev_dt: string;
                                /** @description The (database) revision ID. */
                                rev_id: number;
                                /** @description This revision's parent rev_id. */
                                rev_parent_id?: number;
                                /** @description sha1 sum considering all the content slots for this revision.
                                 *      */
                                rev_sha1?: string;
                                /** @description Byte size 'sum' of all the content slots for this revision. This 'size' is approximate, but may not be exact, depending on the kind of data that is stored in the content slots.
                                 *      */
                                rev_size?: number;
                            };
                            /** @description The wiki ID, which is usually the same as the MediaWiki database name. E.g. enwiki, metawiki, etc.
                             *      */
                            wiki_id: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.recentchange": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.recentchange events
         * @description mediawiki.recentchange events.
         *
         *     Schema title: mediawiki/recentchange
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/recentchange/1.0.1",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "mediawiki.recentchange"
                         *       }
                         *     } */
                        "application/json": {
                            /** @description Full page name, from Title::getPrefixedText. */
                            title?: string;
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Type of recentchange event (rc_type). One of "edit", "new", "log", "categorize", or "external"; or a number. (See Manual:Recentchanges table#rc_type)
                             *      */
                            type?: string;
                            /** @description (rc_bot) */
                            bot?: boolean;
                            /** @description (rc_comment) */
                            comment?: string;
                            /** @description ID of the recentchange event (rcid). */
                            id?: number | null;
                            /** @description Length of old and new change */
                            length?: {
                                /** @description (rc_new_len) */
                                new?: number | null;
                                /** @description (rc_old_len) */
                                old?: number | null;
                            };
                            /** @description (rc_log_action) */
                            log_action?: string;
                            log_action_comment?: string | null;
                            /** @description (rc_log_id) */
                            log_id?: number | null;
                            /** @description Property only exists if event has rc_params. */
                            log_params?: unknown[] | {
                                [key: string]: unknown;
                            } | string;
                            /** @description (rc_log_type) */
                            log_type?: string | null;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description (rc_minor). */
                            minor?: boolean;
                            /** @description ID of relevant namespace of affected page (rc_namespace, page_namespace). This is -1 ("Special") for log events.
                             *      */
                            namespace?: number;
                            /** @description The rc_comment parsed into simple HTML. Optional */
                            parsedcomment?: string;
                            /** @description (rc_patrolled). This property only exists if patrolling is supported for this event (based on $wgUseRCPatrol, $wgUseNPPatrol).
                             *      */
                            patrolled?: boolean;
                            /** @description Old and new revision IDs */
                            revision?: {
                                /** @description (rc_last_oldid) */
                                new?: number | null;
                                /** @description (rc_this_oldid) */
                                old?: number | null;
                            };
                            /** @description $wgServerName */
                            server_name?: string;
                            /** @description $wgScriptPath */
                            server_script_path?: string;
                            /** @description $wgCanonicalServer */
                            server_url?: string;
                            /** @description Unix timestamp (derived from rc_timestamp). */
                            timestamp?: number;
                            /** @description (rc_user_text) */
                            user?: string;
                            /** @description wfWikiID ($wgDBprefix, $wgDBname) */
                            wiki?: string;
                        } & {
                            [key: string]: unknown;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/recentchange/1.0.1",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "mediawiki.recentchange"
                         *       }
                         *     } */
                        "text/event-stream": {
                            /** @description Full page name, from Title::getPrefixedText. */
                            title?: string;
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Type of recentchange event (rc_type). One of "edit", "new", "log", "categorize", or "external"; or a number. (See Manual:Recentchanges table#rc_type)
                             *      */
                            type?: string;
                            /** @description (rc_bot) */
                            bot?: boolean;
                            /** @description (rc_comment) */
                            comment?: string;
                            /** @description ID of the recentchange event (rcid). */
                            id?: number | null;
                            /** @description Length of old and new change */
                            length?: {
                                /** @description (rc_new_len) */
                                new?: number | null;
                                /** @description (rc_old_len) */
                                old?: number | null;
                            };
                            /** @description (rc_log_action) */
                            log_action?: string;
                            log_action_comment?: string | null;
                            /** @description (rc_log_id) */
                            log_id?: number | null;
                            /** @description Property only exists if event has rc_params. */
                            log_params?: unknown[] | {
                                [key: string]: unknown;
                            } | string;
                            /** @description (rc_log_type) */
                            log_type?: string | null;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description (rc_minor). */
                            minor?: boolean;
                            /** @description ID of relevant namespace of affected page (rc_namespace, page_namespace). This is -1 ("Special") for log events.
                             *      */
                            namespace?: number;
                            /** @description The rc_comment parsed into simple HTML. Optional */
                            parsedcomment?: string;
                            /** @description (rc_patrolled). This property only exists if patrolling is supported for this event (based on $wgUseRCPatrol, $wgUseNPPatrol).
                             *      */
                            patrolled?: boolean;
                            /** @description Old and new revision IDs */
                            revision?: {
                                /** @description (rc_last_oldid) */
                                new?: number | null;
                                /** @description (rc_this_oldid) */
                                old?: number | null;
                            };
                            /** @description $wgServerName */
                            server_name?: string;
                            /** @description $wgScriptPath */
                            server_script_path?: string;
                            /** @description $wgCanonicalServer */
                            server_url?: string;
                            /** @description Unix timestamp (derived from rc_timestamp). */
                            timestamp?: number;
                            /** @description (rc_user_text) */
                            user?: string;
                            /** @description wfWikiID ($wgDBprefix, $wgDBname) */
                            wiki?: string;
                        } & {
                            [key: string]: unknown;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.revision-create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.revision-create events
         * @description mediawiki.revision-create events.
         *
         *     Schema title: mediawiki/revision/create
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/revision/create/2.0.0",
                         *       "database": "examplewiki",
                         *       "dt": "2020-06-10T18:56:00Z",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-create",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "rev_content_changed": true,
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_is_revert": false,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_slots": {
                         *         "main": {
                         *           "rev_slot_content_model": "wikitext",
                         *           "rev_slot_origin_rev_id": 123,
                         *           "rev_slot_sha1": "2mx9qnkore72az8niqap1s3ycpu1jej",
                         *           "rev_slot_size": 20
                         *         }
                         *       },
                         *       "rev_timestamp": "2020-06-10T18:56:00Z"
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups?: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text?: string;
                            };
                            /** @description True if the content has changed (rev_sha1 is different than the previous revision one) */
                            rev_content_changed?: boolean;
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description Flag indicating whether the edit was a revert. */
                            rev_is_revert?: boolean;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description Details about the revert. */
                            rev_revert_details?: {
                                /** @description Flag indicating whether the revert was exact, i.e. the contents of the revert revision and restored revision match.
                                 *      */
                                rev_is_exact_revert: boolean;
                                /** @description The ID of an earlier revision that is being repeated or restored.
                                 *      */
                                rev_original_rev_id?: number;
                                /**
                                 * @description The method that was used to perform the revert.
                                 * @enum {string}
                                 */
                                rev_revert_method: "rollback" | "undo" | "manual";
                                /** @description IDs of revisions that were reverted by this edit, ordered from oldest to newest.
                                 *      */
                                rev_reverted_revs: number[];
                            };
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /** @description The revision slots attached to this revision.
                             *      */
                            rev_slots?: {
                                /**
                                 * fragment/mediawiki/revision/slot
                                 * @description Schema fields describing a revision slot
                                 */
                                main: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            } & {
                                [key: string]: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            };
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/revision/create/2.0.0",
                         *       "database": "examplewiki",
                         *       "dt": "2020-06-10T18:56:00Z",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-create",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "rev_content_changed": true,
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_is_revert": false,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_slots": {
                         *         "main": {
                         *           "rev_slot_content_model": "wikitext",
                         *           "rev_slot_origin_rev_id": 123,
                         *           "rev_slot_sha1": "2mx9qnkore72az8niqap1s3ycpu1jej",
                         *           "rev_slot_size": 20
                         *         }
                         *       },
                         *       "rev_timestamp": "2020-06-10T18:56:00Z"
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups?: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text?: string;
                            };
                            /** @description True if the content has changed (rev_sha1 is different than the previous revision one) */
                            rev_content_changed?: boolean;
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description Flag indicating whether the edit was a revert. */
                            rev_is_revert?: boolean;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description Details about the revert. */
                            rev_revert_details?: {
                                /** @description Flag indicating whether the revert was exact, i.e. the contents of the revert revision and restored revision match.
                                 *      */
                                rev_is_exact_revert: boolean;
                                /** @description The ID of an earlier revision that is being repeated or restored.
                                 *      */
                                rev_original_rev_id?: number;
                                /**
                                 * @description The method that was used to perform the revert.
                                 * @enum {string}
                                 */
                                rev_revert_method: "rollback" | "undo" | "manual";
                                /** @description IDs of revisions that were reverted by this edit, ordered from oldest to newest.
                                 *      */
                                rev_reverted_revs: number[];
                            };
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /** @description The revision slots attached to this revision.
                             *      */
                            rev_slots?: {
                                /**
                                 * fragment/mediawiki/revision/slot
                                 * @description Schema fields describing a revision slot
                                 */
                                main: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            } & {
                                [key: string]: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            };
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.revision-tags-change": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.revision-tags-change events
         * @description mediawiki.revision-tags-change events.
         *
         *     Schema title: mediawiki/revision/tags-change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/revision/tags-change/1.0.1",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-tags-change",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_timestamp": "2020-06-10T18:57:16Z",
                         *       "tags": [
                         *         "example_tag"
                         *       ]
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event. If the field is not present, the revision has no tags before the event has happened.
                             *      */
                            prior_state?: {
                                /** @description The list of tags before the event has happened. */
                                tags?: string[];
                            };
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                            /** @description The list of tags after the event has happened. If the tags field is not present, the revision has no tags after the event has happened.
                             *      */
                            tags?: string[];
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/revision/tags-change/1.0.1",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-tags-change",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_timestamp": "2020-06-10T18:57:16Z",
                         *       "tags": [
                         *         "example_tag"
                         *       ]
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event. If the field is not present, the revision has no tags before the event has happened.
                             *      */
                            prior_state?: {
                                /** @description The list of tags before the event has happened. */
                                tags?: string[];
                            };
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                            /** @description The list of tags after the event has happened. If the tags field is not present, the revision has no tags after the event has happened.
                             *      */
                            tags?: string[];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/mediawiki.revision-visibility-change": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * mediawiki.revision-visibility-change events
         * @description mediawiki.revision-visibility-change events.
         *
         *     Schema title: mediawiki/revision/visibility-change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/revision/visibility-change/1.0.1",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-visibility-change",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "prior_state": {
                         *         "visibility": {
                         *           "comment": true,
                         *           "text": true,
                         *           "user": true
                         *         }
                         *       },
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_timestamp": "2020-06-10T18:57:16Z",
                         *       "visibility": {
                         *         "comment": true,
                         *         "text": false,
                         *         "user": true
                         *       }
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event.  Revisions always have visibility settings, so this object will always contain the visibility settings for the revision before this event.
                             *      */
                            prior_state: {
                                /** @description The prior visiblity state of this revision. */
                                visibility?: {
                                    comment: boolean;
                                    text: boolean;
                                    user: boolean;
                                };
                            };
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                            /** @description The visiblity state of this revision. */
                            visibility: {
                                /** @description Whether the comment of the revision is visible. */
                                comment: boolean;
                                /** @description Whether the revision's text is visible. */
                                text: boolean;
                                /** @description Whether the author of the revision's text is visible. */
                                user: boolean;
                            };
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/revision/visibility-change/1.0.1",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-visibility-change",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "prior_state": {
                         *         "visibility": {
                         *           "comment": true,
                         *           "text": true,
                         *           "user": true
                         *         }
                         *       },
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_timestamp": "2020-06-10T18:57:16Z",
                         *       "visibility": {
                         *         "comment": true,
                         *         "text": false,
                         *         "user": true
                         *       }
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event.  Revisions always have visibility settings, so this object will always contain the visibility settings for the revision before this event.
                             *      */
                            prior_state: {
                                /** @description The prior visiblity state of this revision. */
                                visibility?: {
                                    comment: boolean;
                                    text: boolean;
                                    user: boolean;
                                };
                            };
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                            /** @description The visiblity state of this revision. */
                            visibility: {
                                /** @description Whether the comment of the revision is visible. */
                                comment: boolean;
                                /** @description Whether the revision's text is visible. */
                                text: boolean;
                                /** @description Whether the author of the revision's text is visible. */
                                user: boolean;
                            };
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/page-create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * page-create events
         * @description MediaWiki page create events. This page create stream
         *     is just the first revision create event for each page.
         *     As such, it reuses the mediawiki/revision/create schema.
         *
         *     (NOTE: This stream is an alias of mediawiki.page-create)
         *
         *     Schema title: mediawiki/revision/create
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/revision/create/2.0.0",
                         *       "database": "examplewiki",
                         *       "dt": "2020-06-10T18:56:00Z",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-create",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "rev_content_changed": true,
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_is_revert": false,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_slots": {
                         *         "main": {
                         *           "rev_slot_content_model": "wikitext",
                         *           "rev_slot_origin_rev_id": 123,
                         *           "rev_slot_sha1": "2mx9qnkore72az8niqap1s3ycpu1jej",
                         *           "rev_slot_size": 20
                         *         }
                         *       },
                         *       "rev_timestamp": "2020-06-10T18:56:00Z"
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups?: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text?: string;
                            };
                            /** @description True if the content has changed (rev_sha1 is different than the previous revision one) */
                            rev_content_changed?: boolean;
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description Flag indicating whether the edit was a revert. */
                            rev_is_revert?: boolean;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description Details about the revert. */
                            rev_revert_details?: {
                                /** @description Flag indicating whether the revert was exact, i.e. the contents of the revert revision and restored revision match.
                                 *      */
                                rev_is_exact_revert: boolean;
                                /** @description The ID of an earlier revision that is being repeated or restored.
                                 *      */
                                rev_original_rev_id?: number;
                                /**
                                 * @description The method that was used to perform the revert.
                                 * @enum {string}
                                 */
                                rev_revert_method: "rollback" | "undo" | "manual";
                                /** @description IDs of revisions that were reverted by this edit, ordered from oldest to newest.
                                 *      */
                                rev_reverted_revs: number[];
                            };
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /** @description The revision slots attached to this revision.
                             *      */
                            rev_slots?: {
                                /**
                                 * fragment/mediawiki/revision/slot
                                 * @description Schema fields describing a revision slot
                                 */
                                main: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            } & {
                                [key: string]: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            };
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/revision/create/2.0.0",
                         *       "database": "examplewiki",
                         *       "dt": "2020-06-10T18:56:00Z",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-create",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "rev_content_changed": true,
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_is_revert": false,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_slots": {
                         *         "main": {
                         *           "rev_slot_content_model": "wikitext",
                         *           "rev_slot_origin_rev_id": 123,
                         *           "rev_slot_sha1": "2mx9qnkore72az8niqap1s3ycpu1jej",
                         *           "rev_slot_size": 20
                         *         }
                         *       },
                         *       "rev_timestamp": "2020-06-10T18:56:00Z"
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups?: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text?: string;
                            };
                            /** @description True if the content has changed (rev_sha1 is different than the previous revision one) */
                            rev_content_changed?: boolean;
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description Flag indicating whether the edit was a revert. */
                            rev_is_revert?: boolean;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description Details about the revert. */
                            rev_revert_details?: {
                                /** @description Flag indicating whether the revert was exact, i.e. the contents of the revert revision and restored revision match.
                                 *      */
                                rev_is_exact_revert: boolean;
                                /** @description The ID of an earlier revision that is being repeated or restored.
                                 *      */
                                rev_original_rev_id?: number;
                                /**
                                 * @description The method that was used to perform the revert.
                                 * @enum {string}
                                 */
                                rev_revert_method: "rollback" | "undo" | "manual";
                                /** @description IDs of revisions that were reverted by this edit, ordered from oldest to newest.
                                 *      */
                                rev_reverted_revs: number[];
                            };
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /** @description The revision slots attached to this revision.
                             *      */
                            rev_slots?: {
                                /**
                                 * fragment/mediawiki/revision/slot
                                 * @description Schema fields describing a revision slot
                                 */
                                main: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            } & {
                                [key: string]: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            };
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/page-delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * page-delete events
         * @description mediawiki.page-delete events.
         *
         *     (NOTE: This stream is an alias of mediawiki.page-delete)
         *
         *     Schema title: mediawiki/page/delete
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/delete/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-delete"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The number of revisions of this page at the time of this event. During a delete, this number of revisions will be archived.
                             *      */
                            rev_count?: number;
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/delete/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-delete"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The number of revisions of this page at the time of this event. During a delete, this number of revisions will be archived.
                             *      */
                            rev_count?: number;
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/page-links-change": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * page-links-change events
         * @description mediawiki.page-links-change events.
         *
         *     (NOTE: This stream is an alias of mediawiki.page-links-change)
         *
         *     Schema title: mediawiki/page/links-change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/links-change/1.0.0",
                         *       "added_links": [
                         *         {
                         *           "external": false,
                         *           "link": "example_link"
                         *         }
                         *       ],
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-links-change"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The new page links. This map would only contain links that were either added or changed, links that were intact would not be present here. If the link was changed, its previous value would be present in the 'removed_links' object.
                             *      */
                            added_links?: {
                                /** @description Whether link is external */
                                external?: boolean;
                                /** @description Link being added */
                                link?: string;
                            }[];
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The old page links. This map would only contain the previous values of the links that were either removed or changed by this event. Links that were intact would not be present here. If the link was changed, its new value would be present in the 'added_links' object.
                             *      */
                            removed_links?: {
                                /** @description Whether link is external */
                                external?: boolean;
                                /** @description Link being removed */
                                link?: string;
                            }[];
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/links-change/1.0.0",
                         *       "added_links": [
                         *         {
                         *           "external": false,
                         *           "link": "example_link"
                         *         }
                         *       ],
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-links-change"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The new page links. This map would only contain links that were either added or changed, links that were intact would not be present here. If the link was changed, its previous value would be present in the 'removed_links' object.
                             *      */
                            added_links?: {
                                /** @description Whether link is external */
                                external?: boolean;
                                /** @description Link being added */
                                link?: string;
                            }[];
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The old page links. This map would only contain the previous values of the links that were either removed or changed by this event. Links that were intact would not be present here. If the link was changed, its new value would be present in the 'added_links' object.
                             *      */
                            removed_links?: {
                                /** @description Whether link is external */
                                external?: boolean;
                                /** @description Link being removed */
                                link?: string;
                            }[];
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/page-move": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * page-move events
         * @description mediawiki.page-move events.
         *
         *     (NOTE: This stream is an alias of mediawiki.page-move)
         *
         *     Schema title: mediawiki/page/move
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/move/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-move"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "prior_state": {
                         *         "page_namespace": 0,
                         *         "page_title": "example_old_page_title",
                         *         "rev_id": 122
                         *       },
                         *       "rev_id": 123
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description Information about the new redirect page auto-created at the old title as a result of this page move. This field is optional and will be absent if no redirect page was created.
                             *      */
                            new_redirect_page?: {
                                /** @description The page ID of the newly created redirect page. */
                                page_id: number;
                                /** @description This will be the same as prior_state.page_namespace. */
                                page_namespace: number;
                                /** @description This will be the same as prior_state.page_title. */
                                page_title: string;
                                /** @description The revision created for the newly created redirect page. */
                                rev_id: number;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event. If a top level entity field is not present in this object, then its value has not changed since the prior event.
                             *      */
                            prior_state: {
                                /** @description The namespace ID this page belonged to before this event. */
                                page_namespace: number;
                                /** @description The normalized title of this page before this event. */
                                page_title: string;
                                /** @description The head revision of this page before this event. */
                                rev_id: number;
                            };
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/move/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-move"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "prior_state": {
                         *         "page_namespace": 0,
                         *         "page_title": "example_old_page_title",
                         *         "rev_id": 122
                         *       },
                         *       "rev_id": 123
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description Information about the new redirect page auto-created at the old title as a result of this page move. This field is optional and will be absent if no redirect page was created.
                             *      */
                            new_redirect_page?: {
                                /** @description The page ID of the newly created redirect page. */
                                page_id: number;
                                /** @description This will be the same as prior_state.page_namespace. */
                                page_namespace: number;
                                /** @description This will be the same as prior_state.page_title. */
                                page_title: string;
                                /** @description The revision created for the newly created redirect page. */
                                rev_id: number;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event. If a top level entity field is not present in this object, then its value has not changed since the prior event.
                             *      */
                            prior_state: {
                                /** @description The namespace ID this page belonged to before this event. */
                                page_namespace: number;
                                /** @description The normalized title of this page before this event. */
                                page_title: string;
                                /** @description The head revision of this page before this event. */
                                rev_id: number;
                            };
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/page-properties-change": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * page-properties-change events
         * @description mediawiki.page-properties-change events.
         *
         *     (NOTE: This stream is an alias of mediawiki.page-properties-change)
         *
         *     Schema title: mediawiki/page/properties-change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/properties-change/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-properties-change"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The new page properties. This map would only contain properties that were either added or changed, properties that were intact would not be present here. If the property was changed, its previous value would be present in the 'removed_properties' object.
                             *      */
                            added_properties?: Record<string, never>;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The old page properties. This map would only contain the previous values of the properties that were either removed or changed by this event. Properties that were intact would not be present here. If the property was changed, its new value would be present in the 'added_properties' object.
                             *      */
                            removed_properties?: Record<string, never>;
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/properties-change/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-properties-change"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "rev_id": 123
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description The new page properties. This map would only contain properties that were either added or changed, properties that were intact would not be present here. If the property was changed, its previous value would be present in the 'removed_properties' object.
                             *      */
                            added_properties?: Record<string, never>;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The old page properties. This map would only contain the previous values of the properties that were either removed or changed by this event. Properties that were intact would not be present here. If the property was changed, its new value would be present in the 'added_properties' object.
                             *      */
                            removed_properties?: Record<string, never>;
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/page-undelete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * page-undelete events
         * @description mediawiki.page-undelete events.
         *
         *     (NOTE: This stream is an alias of mediawiki.page-undelete)
         *
         *     Schema title: mediawiki/page/undelete
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/page/undelete/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-undelete"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "prior_state": {
                         *         "page_id": 123
                         *       },
                         *       "rev_id": 123
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event. If a top level entity field is not present in this object, then its value has not changed since the prior event.  If prior_state itself is not present, then this event had no relevant prior state, indicating that it is probably the first time this type has been emitted for this entity. For page undeletes, prior_state will be absent unless the page_id is no longer the same as the page_id it had before it was deleted.
                             *      */
                            prior_state?: {
                                /** @description The page ID before this restore as it was in the archive table. */
                                page_id: number;
                            };
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/page/undelete/1.0.0",
                         *       "database": "examplewiki",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "medaiwiki.page-undelete"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "example_page_title",
                         *       "prior_state": {
                         *         "page_id": 123
                         *       },
                         *       "rev_id": 123
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The (database) page ID. */
                            page_id: number;
                            /** @description True if this page is currently a redirect page.  This fact is ultimately represented by revision content containing redirect wikitext.  If rev_id's content has redirect wikitext, then this page is a redirect.  Note that this state is also stored on the Mediawiki page table.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace ID this page belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text: string;
                            };
                            /** @description The prior state of the entity before this event. If a top level entity field is not present in this object, then its value has not changed since the prior event.  If prior_state itself is not present, then this event had no relevant prior state, indicating that it is probably the first time this type has been emitted for this entity. For page undeletes, prior_state will be absent unless the page_id is no longer the same as the page_id it had before it was deleted.
                             *      */
                            prior_state?: {
                                /** @description The page ID before this restore as it was in the archive table. */
                                page_id: number;
                            };
                            /** @description The head revision of the page at the time of this event. */
                            rev_id: number;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/rdf-streaming-updater.mutation-main.v2": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * rdf-streaming-updater.mutation-main.v2 events
         * @description rdf-streaming-updater.mutation-main.v2 events.
         *
         *     Schema title: mediawiki/wikibase/entity/rdf_change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/wikibase/entity/rdf_change/2.0.0",
                         *       "dt": "2020-06-10T18:56:15Z",
                         *       "entity_id": "Q1",
                         *       "meta": {
                         *         "domain": "www.wikidata.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "request_id": "79c4ddcf-3db2-437d-9c42-2d144cefb8d1",
                         *         "stream": "some-rdf-stream"
                         *       },
                         *       "operation": "diff",
                         *       "rdf_added_data": {
                         *         "data": "data:s data:p data:o",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_deleted_data": {
                         *         "data": "data:rs data:rp data:ro",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_linked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_unlinked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rev_id": 327,
                         *       "sequence": 0,
                         *       "sequence_length": 1
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            /** @description Wikibase entity ID being modified */
                            entity_id: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * @description Type of update received:
                             *       * diff: only the required set of triples to add or remove is present in
                             *         the message
                             *       * import: all the entity triples are present
                             *       * delete: the entity has been deleted from the wikibase instance, no
                             *         RDF data is passed, the consumer must know how to delete the triples
                             *         related to this entity
                             *       * reconcile: indication that prior inconsistencies might have been
                             *         detected and that the data consumed so far for this entity cannot be
                             *         trusted, all the entity data is provided and a full reconciliation
                             *         must happen.
                             *
                             * @enum {string}
                             */
                            operation: "diff" | "import" | "delete" | "reconcile";
                            rdf_added_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_deleted_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_linked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_unlinked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            /** @description The (database) revision ID related to this change. */
                            rev_id: number;
                            /** @description The sequence number of this message used to reconstruct the event when it was considered too large to be encoded as a single message. The number of messages is encoded in sequence_length.
                             *      */
                            sequence: number;
                            /** @description The number of messages that have to be read to reconstruct this message.
                             *      */
                            sequence_length: number;
                            $defs: {
                                rdf_data: {
                                    /** @description the RDF data encoded using mime_type */
                                    data: string;
                                    /** @description Mime type of the RDF data stored in the data field */
                                    mime_type: string;
                                };
                            };
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/wikibase/entity/rdf_change/2.0.0",
                         *       "dt": "2020-06-10T18:56:15Z",
                         *       "entity_id": "Q1",
                         *       "meta": {
                         *         "domain": "www.wikidata.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "request_id": "79c4ddcf-3db2-437d-9c42-2d144cefb8d1",
                         *         "stream": "some-rdf-stream"
                         *       },
                         *       "operation": "diff",
                         *       "rdf_added_data": {
                         *         "data": "data:s data:p data:o",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_deleted_data": {
                         *         "data": "data:rs data:rp data:ro",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_linked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_unlinked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rev_id": 327,
                         *       "sequence": 0,
                         *       "sequence_length": 1
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            /** @description Wikibase entity ID being modified */
                            entity_id: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * @description Type of update received:
                             *       * diff: only the required set of triples to add or remove is present in
                             *         the message
                             *       * import: all the entity triples are present
                             *       * delete: the entity has been deleted from the wikibase instance, no
                             *         RDF data is passed, the consumer must know how to delete the triples
                             *         related to this entity
                             *       * reconcile: indication that prior inconsistencies might have been
                             *         detected and that the data consumed so far for this entity cannot be
                             *         trusted, all the entity data is provided and a full reconciliation
                             *         must happen.
                             *
                             * @enum {string}
                             */
                            operation: "diff" | "import" | "delete" | "reconcile";
                            rdf_added_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_deleted_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_linked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_unlinked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            /** @description The (database) revision ID related to this change. */
                            rev_id: number;
                            /** @description The sequence number of this message used to reconstruct the event when it was considered too large to be encoded as a single message. The number of messages is encoded in sequence_length.
                             *      */
                            sequence: number;
                            /** @description The number of messages that have to be read to reconstruct this message.
                             *      */
                            sequence_length: number;
                            $defs: {
                                rdf_data: {
                                    /** @description the RDF data encoded using mime_type */
                                    data: string;
                                    /** @description Mime type of the RDF data stored in the data field */
                                    mime_type: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/rdf-streaming-updater.mutation-scholarly.v2": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * rdf-streaming-updater.mutation-scholarly.v2 events
         * @description rdf-streaming-updater.mutation-scholarly.v2 events.
         *
         *     Schema title: mediawiki/wikibase/entity/rdf_change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/wikibase/entity/rdf_change/2.0.0",
                         *       "dt": "2020-06-10T18:56:15Z",
                         *       "entity_id": "Q1",
                         *       "meta": {
                         *         "domain": "www.wikidata.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "request_id": "79c4ddcf-3db2-437d-9c42-2d144cefb8d1",
                         *         "stream": "some-rdf-stream"
                         *       },
                         *       "operation": "diff",
                         *       "rdf_added_data": {
                         *         "data": "data:s data:p data:o",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_deleted_data": {
                         *         "data": "data:rs data:rp data:ro",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_linked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_unlinked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rev_id": 327,
                         *       "sequence": 0,
                         *       "sequence_length": 1
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            /** @description Wikibase entity ID being modified */
                            entity_id: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * @description Type of update received:
                             *       * diff: only the required set of triples to add or remove is present in
                             *         the message
                             *       * import: all the entity triples are present
                             *       * delete: the entity has been deleted from the wikibase instance, no
                             *         RDF data is passed, the consumer must know how to delete the triples
                             *         related to this entity
                             *       * reconcile: indication that prior inconsistencies might have been
                             *         detected and that the data consumed so far for this entity cannot be
                             *         trusted, all the entity data is provided and a full reconciliation
                             *         must happen.
                             *
                             * @enum {string}
                             */
                            operation: "diff" | "import" | "delete" | "reconcile";
                            rdf_added_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_deleted_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_linked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_unlinked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            /** @description The (database) revision ID related to this change. */
                            rev_id: number;
                            /** @description The sequence number of this message used to reconstruct the event when it was considered too large to be encoded as a single message. The number of messages is encoded in sequence_length.
                             *      */
                            sequence: number;
                            /** @description The number of messages that have to be read to reconstruct this message.
                             *      */
                            sequence_length: number;
                            $defs: {
                                rdf_data: {
                                    /** @description the RDF data encoded using mime_type */
                                    data: string;
                                    /** @description Mime type of the RDF data stored in the data field */
                                    mime_type: string;
                                };
                            };
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/wikibase/entity/rdf_change/2.0.0",
                         *       "dt": "2020-06-10T18:56:15Z",
                         *       "entity_id": "Q1",
                         *       "meta": {
                         *         "domain": "www.wikidata.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "request_id": "79c4ddcf-3db2-437d-9c42-2d144cefb8d1",
                         *         "stream": "some-rdf-stream"
                         *       },
                         *       "operation": "diff",
                         *       "rdf_added_data": {
                         *         "data": "data:s data:p data:o",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_deleted_data": {
                         *         "data": "data:rs data:rp data:ro",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_linked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_unlinked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rev_id": 327,
                         *       "sequence": 0,
                         *       "sequence_length": 1
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            /** @description Wikibase entity ID being modified */
                            entity_id: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * @description Type of update received:
                             *       * diff: only the required set of triples to add or remove is present in
                             *         the message
                             *       * import: all the entity triples are present
                             *       * delete: the entity has been deleted from the wikibase instance, no
                             *         RDF data is passed, the consumer must know how to delete the triples
                             *         related to this entity
                             *       * reconcile: indication that prior inconsistencies might have been
                             *         detected and that the data consumed so far for this entity cannot be
                             *         trusted, all the entity data is provided and a full reconciliation
                             *         must happen.
                             *
                             * @enum {string}
                             */
                            operation: "diff" | "import" | "delete" | "reconcile";
                            rdf_added_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_deleted_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_linked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_unlinked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            /** @description The (database) revision ID related to this change. */
                            rev_id: number;
                            /** @description The sequence number of this message used to reconstruct the event when it was considered too large to be encoded as a single message. The number of messages is encoded in sequence_length.
                             *      */
                            sequence: number;
                            /** @description The number of messages that have to be read to reconstruct this message.
                             *      */
                            sequence_length: number;
                            $defs: {
                                rdf_data: {
                                    /** @description the RDF data encoded using mime_type */
                                    data: string;
                                    /** @description Mime type of the RDF data stored in the data field */
                                    mime_type: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/rdf-streaming-updater.mutation.v2": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * rdf-streaming-updater.mutation.v2 events
         * @description rdf-streaming-updater.mutation.v2 events.
         *
         *     Schema title: mediawiki/wikibase/entity/rdf_change
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/wikibase/entity/rdf_change/2.0.0",
                         *       "dt": "2020-06-10T18:56:15Z",
                         *       "entity_id": "Q1",
                         *       "meta": {
                         *         "domain": "www.wikidata.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "request_id": "79c4ddcf-3db2-437d-9c42-2d144cefb8d1",
                         *         "stream": "some-rdf-stream"
                         *       },
                         *       "operation": "diff",
                         *       "rdf_added_data": {
                         *         "data": "data:s data:p data:o",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_deleted_data": {
                         *         "data": "data:rs data:rp data:ro",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_linked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_unlinked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rev_id": 327,
                         *       "sequence": 0,
                         *       "sequence_length": 1
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            /** @description Wikibase entity ID being modified */
                            entity_id: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * @description Type of update received:
                             *       * diff: only the required set of triples to add or remove is present in
                             *         the message
                             *       * import: all the entity triples are present
                             *       * delete: the entity has been deleted from the wikibase instance, no
                             *         RDF data is passed, the consumer must know how to delete the triples
                             *         related to this entity
                             *       * reconcile: indication that prior inconsistencies might have been
                             *         detected and that the data consumed so far for this entity cannot be
                             *         trusted, all the entity data is provided and a full reconciliation
                             *         must happen.
                             *
                             * @enum {string}
                             */
                            operation: "diff" | "import" | "delete" | "reconcile";
                            rdf_added_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_deleted_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_linked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_unlinked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            /** @description The (database) revision ID related to this change. */
                            rev_id: number;
                            /** @description The sequence number of this message used to reconstruct the event when it was considered too large to be encoded as a single message. The number of messages is encoded in sequence_length.
                             *      */
                            sequence: number;
                            /** @description The number of messages that have to be read to reconstruct this message.
                             *      */
                            sequence_length: number;
                            $defs: {
                                rdf_data: {
                                    /** @description the RDF data encoded using mime_type */
                                    data: string;
                                    /** @description Mime type of the RDF data stored in the data field */
                                    mime_type: string;
                                };
                            };
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/wikibase/entity/rdf_change/2.0.0",
                         *       "dt": "2020-06-10T18:56:15Z",
                         *       "entity_id": "Q1",
                         *       "meta": {
                         *         "domain": "www.wikidata.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "request_id": "79c4ddcf-3db2-437d-9c42-2d144cefb8d1",
                         *         "stream": "some-rdf-stream"
                         *       },
                         *       "operation": "diff",
                         *       "rdf_added_data": {
                         *         "data": "data:s data:p data:o",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_deleted_data": {
                         *         "data": "data:rs data:rp data:ro",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_linked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rdf_unlinked_shared_data": {
                         *         "data": "data:ls data:lp data:lo",
                         *         "mime_type": "text/turtle"
                         *       },
                         *       "rev_id": 327,
                         *       "sequence": 0,
                         *       "sequence_length": 1
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            /** @description Wikibase entity ID being modified */
                            entity_id: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /**
                             * @description Type of update received:
                             *       * diff: only the required set of triples to add or remove is present in
                             *         the message
                             *       * import: all the entity triples are present
                             *       * delete: the entity has been deleted from the wikibase instance, no
                             *         RDF data is passed, the consumer must know how to delete the triples
                             *         related to this entity
                             *       * reconcile: indication that prior inconsistencies might have been
                             *         detected and that the data consumed so far for this entity cannot be
                             *         trusted, all the entity data is provided and a full reconciliation
                             *         must happen.
                             *
                             * @enum {string}
                             */
                            operation: "diff" | "import" | "delete" | "reconcile";
                            rdf_added_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_deleted_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_linked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            rdf_unlinked_shared_data?: {
                                /** @description the RDF data encoded using mime_type */
                                data: string;
                                /** @description Mime type of the RDF data stored in the data field */
                                mime_type: string;
                            };
                            /** @description The (database) revision ID related to this change. */
                            rev_id: number;
                            /** @description The sequence number of this message used to reconstruct the event when it was considered too large to be encoded as a single message. The number of messages is encoded in sequence_length.
                             *      */
                            sequence: number;
                            /** @description The number of messages that have to be read to reconstruct this message.
                             *      */
                            sequence_length: number;
                            $defs: {
                                rdf_data: {
                                    /** @description the RDF data encoded using mime_type */
                                    data: string;
                                    /** @description Mime type of the RDF data stored in the data field */
                                    mime_type: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/recentchange": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * recentchange events
         * @description mediawiki.recentchange events.
         *
         *     (NOTE: This stream is an alias of mediawiki.recentchange)
         *
         *     Schema title: mediawiki/recentchange
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/recentchange/1.0.1",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "mediawiki.recentchange"
                         *       }
                         *     } */
                        "application/json": {
                            /** @description Full page name, from Title::getPrefixedText. */
                            title?: string;
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Type of recentchange event (rc_type). One of "edit", "new", "log", "categorize", or "external"; or a number. (See Manual:Recentchanges table#rc_type)
                             *      */
                            type?: string;
                            /** @description (rc_bot) */
                            bot?: boolean;
                            /** @description (rc_comment) */
                            comment?: string;
                            /** @description ID of the recentchange event (rcid). */
                            id?: number | null;
                            /** @description Length of old and new change */
                            length?: {
                                /** @description (rc_new_len) */
                                new?: number | null;
                                /** @description (rc_old_len) */
                                old?: number | null;
                            };
                            /** @description (rc_log_action) */
                            log_action?: string;
                            log_action_comment?: string | null;
                            /** @description (rc_log_id) */
                            log_id?: number | null;
                            /** @description Property only exists if event has rc_params. */
                            log_params?: unknown[] | {
                                [key: string]: unknown;
                            } | string;
                            /** @description (rc_log_type) */
                            log_type?: string | null;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description (rc_minor). */
                            minor?: boolean;
                            /** @description ID of relevant namespace of affected page (rc_namespace, page_namespace). This is -1 ("Special") for log events.
                             *      */
                            namespace?: number;
                            /** @description The rc_comment parsed into simple HTML. Optional */
                            parsedcomment?: string;
                            /** @description (rc_patrolled). This property only exists if patrolling is supported for this event (based on $wgUseRCPatrol, $wgUseNPPatrol).
                             *      */
                            patrolled?: boolean;
                            /** @description Old and new revision IDs */
                            revision?: {
                                /** @description (rc_last_oldid) */
                                new?: number | null;
                                /** @description (rc_this_oldid) */
                                old?: number | null;
                            };
                            /** @description $wgServerName */
                            server_name?: string;
                            /** @description $wgScriptPath */
                            server_script_path?: string;
                            /** @description $wgCanonicalServer */
                            server_url?: string;
                            /** @description Unix timestamp (derived from rc_timestamp). */
                            timestamp?: number;
                            /** @description (rc_user_text) */
                            user?: string;
                            /** @description wfWikiID ($wgDBprefix, $wgDBname) */
                            wiki?: string;
                        } & {
                            [key: string]: unknown;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/recentchange/1.0.1",
                         *       "meta": {
                         *         "dt": "2020-07-01T00:00:00Z",
                         *         "stream": "mediawiki.recentchange"
                         *       }
                         *     } */
                        "text/event-stream": {
                            /** @description Full page name, from Title::getPrefixedText. */
                            title?: string;
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Type of recentchange event (rc_type). One of "edit", "new", "log", "categorize", or "external"; or a number. (See Manual:Recentchanges table#rc_type)
                             *      */
                            type?: string;
                            /** @description (rc_bot) */
                            bot?: boolean;
                            /** @description (rc_comment) */
                            comment?: string;
                            /** @description ID of the recentchange event (rcid). */
                            id?: number | null;
                            /** @description Length of old and new change */
                            length?: {
                                /** @description (rc_new_len) */
                                new?: number | null;
                                /** @description (rc_old_len) */
                                old?: number | null;
                            };
                            /** @description (rc_log_action) */
                            log_action?: string;
                            log_action_comment?: string | null;
                            /** @description (rc_log_id) */
                            log_id?: number | null;
                            /** @description Property only exists if event has rc_params. */
                            log_params?: unknown[] | {
                                [key: string]: unknown;
                            } | string;
                            /** @description (rc_log_type) */
                            log_type?: string | null;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description (rc_minor). */
                            minor?: boolean;
                            /** @description ID of relevant namespace of affected page (rc_namespace, page_namespace). This is -1 ("Special") for log events.
                             *      */
                            namespace?: number;
                            /** @description The rc_comment parsed into simple HTML. Optional */
                            parsedcomment?: string;
                            /** @description (rc_patrolled). This property only exists if patrolling is supported for this event (based on $wgUseRCPatrol, $wgUseNPPatrol).
                             *      */
                            patrolled?: boolean;
                            /** @description Old and new revision IDs */
                            revision?: {
                                /** @description (rc_last_oldid) */
                                new?: number | null;
                                /** @description (rc_this_oldid) */
                                old?: number | null;
                            };
                            /** @description $wgServerName */
                            server_name?: string;
                            /** @description $wgScriptPath */
                            server_script_path?: string;
                            /** @description $wgCanonicalServer */
                            server_url?: string;
                            /** @description Unix timestamp (derived from rc_timestamp). */
                            timestamp?: number;
                            /** @description (rc_user_text) */
                            user?: string;
                            /** @description wfWikiID ($wgDBprefix, $wgDBname) */
                            wiki?: string;
                        } & {
                            [key: string]: unknown;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/revision-create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * revision-create events
         * @description mediawiki.revision-create events.
         *
         *     (NOTE: This stream is an alias of mediawiki.revision-create)
         *
         *     Schema title: mediawiki/revision/create
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/mediawiki/revision/create/2.0.0",
                         *       "database": "examplewiki",
                         *       "dt": "2020-06-10T18:56:00Z",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-create",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "rev_content_changed": true,
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_is_revert": false,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_slots": {
                         *         "main": {
                         *           "rev_slot_content_model": "wikitext",
                         *           "rev_slot_origin_rev_id": 123,
                         *           "rev_slot_sha1": "2mx9qnkore72az8niqap1s3ycpu1jej",
                         *           "rev_slot_size": 20
                         *         }
                         *       },
                         *       "rev_timestamp": "2020-06-10T18:56:00Z"
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups?: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text?: string;
                            };
                            /** @description True if the content has changed (rev_sha1 is different than the previous revision one) */
                            rev_content_changed?: boolean;
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description Flag indicating whether the edit was a revert. */
                            rev_is_revert?: boolean;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description Details about the revert. */
                            rev_revert_details?: {
                                /** @description Flag indicating whether the revert was exact, i.e. the contents of the revert revision and restored revision match.
                                 *      */
                                rev_is_exact_revert: boolean;
                                /** @description The ID of an earlier revision that is being repeated or restored.
                                 *      */
                                rev_original_rev_id?: number;
                                /**
                                 * @description The method that was used to perform the revert.
                                 * @enum {string}
                                 */
                                rev_revert_method: "rollback" | "undo" | "manual";
                                /** @description IDs of revisions that were reverted by this edit, ordered from oldest to newest.
                                 *      */
                                rev_reverted_revs: number[];
                            };
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /** @description The revision slots attached to this revision.
                             *      */
                            rev_slots?: {
                                /**
                                 * fragment/mediawiki/revision/slot
                                 * @description Schema fields describing a revision slot
                                 */
                                main: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            } & {
                                [key: string]: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            };
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                        };
                        /** @example {
                         *       "$schema": "/mediawiki/revision/create/2.0.0",
                         *       "database": "examplewiki",
                         *       "dt": "2020-06-10T18:56:00Z",
                         *       "meta": {
                         *         "domain": "test.wikipedia.org",
                         *         "dt": "2020-06-10T18:57:16Z",
                         *         "stream": "mediawiki.revision-create",
                         *         "uri": "https://examplewiki.wikipedia.org/wiki/TestPage10"
                         *       },
                         *       "page_id": 123,
                         *       "page_is_redirect": false,
                         *       "page_namespace": 0,
                         *       "page_title": "TestPage10",
                         *       "performer": {
                         *         "user_edit_count": 1,
                         *         "user_groups": [
                         *           "*",
                         *           "user",
                         *           "autoconfirmed"
                         *         ],
                         *         "user_id": 123,
                         *         "user_is_bot": false,
                         *         "user_registration_dt": "2016-01-29T21:13:24Z",
                         *         "user_text": "example_user_text"
                         *       },
                         *       "rev_content_changed": true,
                         *       "rev_content_format": "text/x-wiki",
                         *       "rev_content_model": "wikitext",
                         *       "rev_id": 123,
                         *       "rev_is_revert": false,
                         *       "rev_len": 3,
                         *       "rev_minor_edit": false,
                         *       "rev_parent_id": 122,
                         *       "rev_sha1": "mr0szy90m5qbn6tek7ch3nebaild3tm",
                         *       "rev_slots": {
                         *         "main": {
                         *           "rev_slot_content_model": "wikitext",
                         *           "rev_slot_origin_rev_id": 123,
                         *           "rev_slot_sha1": "2mx9qnkore72az8niqap1s3ycpu1jej",
                         *           "rev_slot_size": 20
                         *         }
                         *       },
                         *       "rev_timestamp": "2020-06-10T18:56:00Z"
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            /** @description Deprecated - no longer populated */
                            chronology_id?: string;
                            /** @description The comment left by the user that performed this change. */
                            comment?: string;
                            /** @description The name of the wiki database this event entity belongs to. */
                            database: string;
                            /**
                             * Format: date-time
                             * @description ISO-8601 formatted timestamp of when the event occurred/was generated in UTC), AKA 'event time'. This is different than meta.dt, which is used as the time the system received this event.
                             *
                             */
                            dt: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description Time the event was received by the system, in UTC ISO-8601 format
                                 */
                                dt?: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream (dataset) that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @description The page ID of the page this revision belongs to. */
                            page_id: number;
                            /** @description True if this revision is a redirect.  This fact is ultimately represented by revision content containing redirect wikitext.  If this revision is the head revision of the page, then the page will also be a redirect.
                             *      */
                            page_is_redirect: boolean;
                            /** @description The namespace of the page this revision belongs to. */
                            page_namespace: number;
                            /** @description The normalized title of the page this revision belongs to. */
                            page_title: string;
                            /** @description The comment left by the user that performed this change parsed into simple HTML. Optional
                             *      */
                            parsedcomment?: string;
                            /** @description Represents the user that performed this change. */
                            performer?: {
                                /** @description The number of edits this user has made at the time of this event. Not present for anonymous users.
                                 *      */
                                user_edit_count?: number;
                                /** @description A list of the groups this user belongs to.  E.g. bot, sysop etc. */
                                user_groups?: string[];
                                /** @description The user id that performed this change.  This is optional, and will not be present for anonymous users.
                                 *      */
                                user_id?: number;
                                /** @description True if this user is considered to be a bot at the time of this event. This is checked via the $user->isBot() method, which considers both user_groups and user permissions.
                                 *      */
                                user_is_bot?: boolean;
                                /**
                                 * Format: date-time
                                 * @description The datetime of the user account registration. Not present for anonymous users or if missing in the MW database.
                                 *
                                 */
                                user_registration_dt?: string;
                                /** @description The text representation of the user that performed this change. */
                                user_text?: string;
                            };
                            /** @description True if the content has changed (rev_sha1 is different than the previous revision one) */
                            rev_content_changed?: boolean;
                            /** @description The content format of the revision. */
                            rev_content_format?: string;
                            /** @description The content model of the revision. */
                            rev_content_model?: string;
                            /** @description The (database) revision ID. */
                            rev_id: number;
                            /** @description Flag indicating whether the edit was a revert. */
                            rev_is_revert?: boolean;
                            /** @description The length of the revision text in bytes. */
                            rev_len?: number;
                            /** @description Flag identifying if the revision is minor. */
                            rev_minor_edit?: boolean;
                            /** @description The parent revison ID of the revision that this event represents. */
                            rev_parent_id?: number;
                            /** @description Details about the revert. */
                            rev_revert_details?: {
                                /** @description Flag indicating whether the revert was exact, i.e. the contents of the revert revision and restored revision match.
                                 *      */
                                rev_is_exact_revert: boolean;
                                /** @description The ID of an earlier revision that is being repeated or restored.
                                 *      */
                                rev_original_rev_id?: number;
                                /**
                                 * @description The method that was used to perform the revert.
                                 * @enum {string}
                                 */
                                rev_revert_method: "rollback" | "undo" | "manual";
                                /** @description IDs of revisions that were reverted by this edit, ordered from oldest to newest.
                                 *      */
                                rev_reverted_revs: number[];
                            };
                            /** @description The sha1 of the revision text. */
                            rev_sha1?: string;
                            /** @description The revision slots attached to this revision.
                             *      */
                            rev_slots?: {
                                /**
                                 * fragment/mediawiki/revision/slot
                                 * @description Schema fields describing a revision slot
                                 */
                                main: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            } & {
                                [key: string]: {
                                    /** @description Model of the content (e.g. wikitext, wikibase-mediainfo...) */
                                    rev_slot_content_model: string;
                                    /** @description Revision for which this slot was created */
                                    rev_slot_origin_rev_id?: number;
                                    /** @description SHA1 of the slot content */
                                    rev_slot_sha1: string;
                                    /** @description Size in bytes of the slot content */
                                    rev_slot_size: number;
                                };
                            };
                            /**
                             * Format: date-time
                             * @description The revision's creation time in ISO8601 format.  This field does not end in '_dt' to better match the field name on the Mediawiki revision table.
                             *
                             */
                            rev_timestamp: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v2/stream/test": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * test events
         * @description A test event stream. A new event is posted about once a minute.
         *
         *     (NOTE: This stream is an alias of eventgate-main.test.event)
         *
         *     Schema title: test/event
         */
        get: {
            parameters: {
                query?: {
                    /** @description If given, this timestamp will be used as the historical starting position in each the requested streams. since should either be an integer UTC milliseconds unix epoch timestamp, or a string timestamp parseable by `Date.parse()`. If the timestamp given does not have any corresponding offsets, it will be ignored, and the data will begin streaming from the latest position in the stream. This parameter is ignored if `Last-Event-ID` is set with offsets (or timestamps) for individual topic partition assignments, e.g. when resuming after a disconnect. NOTE: Historical timestamp assignment is not supported indefinitely. Depending on backend stream configuration, will likely be only one or a few weeks.
                     *      */
                    since?: string;
                };
                header?: {
                    /** @description Specifies the Kafka topics, partitions and offsets from which to begin streaming. You may not specify topics that are not configured to be part of this stream endpoint. Example: `[{topic: datacenter1.topic, partition: 0, offset: 12345}, ...]`
                     *      */
                    "Last-Event-ID"?: {
                        topic?: string;
                        partition?: number;
                        offset?: number;
                        timestamp?: string;
                    }[];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        /** @example {
                         *       "$schema": "/test/event/1.0.0",
                         *       "meta": {
                         *         "dt": "2019-01-01T00:00:00Z",
                         *         "stream": "test.event.example"
                         *       },
                         *       "test": "specific test value",
                         *       "test_map": {
                         *         "key1": "val1",
                         *         "key2": "val2"
                         *       }
                         *     } */
                        "application/json": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @default default value */
                            test: string;
                            /** @description We want to support 'map' types using additionalProperties to specify the value types.  (Keys are always strings.)
                             *      */
                            test_map?: {
                                [key: string]: string;
                            };
                        };
                        /** @example {
                         *       "$schema": "/test/event/1.0.0",
                         *       "meta": {
                         *         "dt": "2019-01-01T00:00:00Z",
                         *         "stream": "test.event.example"
                         *       },
                         *       "test": "specific test value",
                         *       "test_map": {
                         *         "key1": "val1",
                         *         "key2": "val2"
                         *       }
                         *     } */
                        "text/event-stream": {
                            /** @description A URI identifying the JSONSchema for this event. This should match an schema's $id in a schema repository. E.g. /schema/title/1.0.0
                             *      */
                            $schema: string;
                            meta: {
                                /** @description Domain the event or entity pertains to */
                                domain?: string;
                                /**
                                 * Format: date-time
                                 * @description UTC event datetime, in ISO-8601 format
                                 */
                                dt: string;
                                /** @description Unique ID of this event */
                                id?: string;
                                /** @description Unique ID of the request that caused the event */
                                request_id?: string;
                                /** @description Name of the stream/queue/dataset that this event belongs in */
                                stream: string;
                                /**
                                 * Format: uri-reference
                                 * @description Unique URI identifying the event or entity
                                 */
                                uri?: string;
                            };
                            /** @default default value */
                            test: string;
                            /** @description We want to support 'map' types using additionalProperties to specify the value types.  (Keys are always strings.)
                             *      */
                            test_map?: {
                                [key: string]: string;
                            };
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
