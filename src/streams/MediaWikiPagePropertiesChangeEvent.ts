/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import Page, { hasMediaWikiPage } from './common/Page';
import User, { isMediaWikiUser } from './common/User';
import { isMediaWikiEvent, MediaWikiEvent } from './EventStream';

/** Represents a MW Properties Change event. */
export default interface MediaWikiPagePropertiesChangeEvent extends MediaWikiEvent, Page {

	/** Represents the user that performed this change. */
	performer?: User;

	/** The head revision of the page at the time of this event. */
	rev_id: number;

	/**
	 * The old page properties. This map would only contain the
	 * previous values of the properties that were either removed
	 * or changed by this event. Properties that were intact would
	 * not be present here. If the property was changed, its new
	 * value would be present in the 'added_properties' object.
	 */
	removed_properties?: Record<string, any>;

	/**
	 * The new page properties. This map would only contain properties
	 * that were either added or changed, properties that were intact
	 * would not be present here. If the property was changed, its
	 * previous value would be present in the 'removed_properties' object.
	 */
	added_properties?: Record<string, any>;

}

/**
 *
 * @param object
 */
export function isMediaWikiPagePropertiesChangeEvent( object: any ):
	object is MediaWikiPagePropertiesChangeEvent {
	return typeof object === 'object' &&
		typeof object.rev_id === 'number' &&
		( !object.added_properties || typeof object.added_properties === 'object' ) &&
		( !object.removed_properties || typeof object.removed_properties === 'object' ) &&
		hasMediaWikiPage( object ) &&
		isMediaWikiUser( ( object as any ).performer ) &&
		isMediaWikiEvent( object );
}
