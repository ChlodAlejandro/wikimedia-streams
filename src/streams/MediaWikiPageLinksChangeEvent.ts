/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import Page, {hasMediaWikiPage} from "./common/Page";
import User, {isMediaWikiUser} from "./common/User";
import {isMediaWikiEvent, MediaWikiEvent} from "./EventStream";

interface LinkChange {

    /** Link being removed */
    link: string;

    /** Whether the link is external */
    external: boolean;

}

/** Represents a MW Page Links Change event. */
export default interface MediaWikiPageLinksChangeEvent extends
    MediaWikiEvent, Page {

    /** Represents the user that performed this change. */
    performer?: User;

    /** Chronology Protector client ID. */
    chronology_id: string;

    /** The head revision of the page at the time of this event. */
    rev_id: number;

    /**
     * The old page links. This map would only contain the previous
     * values of the links that were either removed or changed by
     * this event. Links that were intact would not be present here.
     * If the link was changed, its new value would be present in the
     * 'added_links' object.
     */
    removed_links?: LinkChange[];

    /**
     * The new page links. This map would only contain links that were
     * either added or changed, links that were intact would not be
     * present here. If the link was changed, its previous value would
     * be present in the 'removed_links' object.
     */
    added_links?: LinkChange[];

}

export function isMediaWikiPageLinksChangeEvent(object: any): object is MediaWikiPageLinksChangeEvent {
	return typeof object === "object"
		&& typeof object.chronology_id === "string"
		&& typeof object.rev_id === "number"
		&& (!object.added_links || (Array.isArray(object.added_links)
			&& object.added_links.every((v: any) =>
				typeof v.link === "string"
				&& typeof v.external === "boolean"
			)
		))
		&& (!object.removed_links || (Array.isArray(object.removed_links)
			&& object.removed_links.every((v: any) =>
				typeof v.link === "string"
				&& typeof v.external === "boolean"
			)
		))
		&& hasMediaWikiPage(object)
		&& isMediaWikiUser((object as any).performer)
		&& isMediaWikiEvent(object);
}
