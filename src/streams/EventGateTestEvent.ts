/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import {WikimediaEventBase} from "./EventStream";

export default interface EventGateTestEvent extends WikimediaEventBase {

    test: string;

    /**
     * We want to support 'map' types using additionalProperties to specify
     * the value types. (Keys are always strings.)
     */
    test_map: Record<string, string>;

}