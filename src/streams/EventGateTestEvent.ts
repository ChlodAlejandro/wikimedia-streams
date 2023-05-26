/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import { WikimediaEventBase, WikimediaEventMeta } from './EventStream';

type EventGateTestEventBase = Omit<WikimediaEventBase, 'meta'> & {
	meta: Omit<WikimediaEventBase['meta'], 'domain' | 'uri'>
};

export default interface EventGateTestEvent extends EventGateTestEventBase {

	/**
	 * A URI identifying the JSONSchema for this event. This should match an schema's $id
	 * in a schema repository. E.g. /schema/title/1.0.0
	 */
	'$schema': string;

	'meta': Omit<WikimediaEventMeta, 'domain' | 'uri'>;

	test: string;

	/**
	 * We want to support 'map' types using additionalProperties to specify
	 * the value types. (Keys are always strings.)
	 */
	test_map?: Record<string, string>;

}

/**
 *
 * @param object
 */
export function isEventGateTestEvent( object: any ): object is EventGateTestEvent {
	return typeof object === 'object' &&
		object.test === 'default value';
}
