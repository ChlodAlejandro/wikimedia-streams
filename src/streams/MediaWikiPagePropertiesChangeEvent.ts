/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import Page from "./common/Page";
import User from "./common/User";
import {MediaWikiEvent} from "./EventStream";

interface PageProperties {

    /** Link being removed */
    link: string;

    /** Whether the link is external */
    external: boolean;

}

/** Represents a MW Properties Change event. */
export default interface MediaWikiPagePropertiesChangeEvent extends
    MediaWikiEvent, Page {

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
    removed_properties?: PageProperties[];

    /**
     * The new page properties. This map would only contain properties
     * that were either added or changed, properties that were intact
     * would not be present here. If the property was changed, its
     * previous value would be present in the 'removed_properties' object.
     */
    added_properties?: PageProperties[];

}