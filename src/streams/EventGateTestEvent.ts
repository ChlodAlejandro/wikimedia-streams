/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import {isWikimediaEvent, WikimediaEventBase} from "./EventStream";

export default interface EventGateTestEvent extends WikimediaEventBase {

    test: "default value";

    /**
     * We want to support 'map' types using additionalProperties to specify
     * the value types. (Keys are always strings.)
     */
    test_map?: Record<string, string>;

}

export function isEventGateTestEvent(object: any): object is EventGateTestEvent {
	return typeof object === "object"
		&& object.test === "default value"
		&& isWikimediaEvent(object);
}
