/**
 * Schema fields describing a revision slot
 */
export interface RevisionSlot {
	/**
	 * Model of the content (e.g. wikitext, wikibase-mediainfo...)
	 */
	rev_slot_content_model: string;
	/**
	 * SHA1 of the slot content
	 */
	rev_slot_sha1: string;
	/**
	 * Size in bytes of the slot content
	 */
	rev_slot_size: number;
	/**
	 * Revision for which this slot was created
	 */
	rev_slot_origin_rev_id: number;
}

export default interface Revision {

    /** The (database) revision ID. */
    rev_id: number;

    /** The parent revision ID of the revision that this event represents. */
    rev_parent_id?: number;

    /**
     * The revision's creation time in ISO8601 format. This field does not
     * end in '_dt' to better match the field name on the Mediawiki revision table.
     */
    rev_timestamp: string;

    /** The sha1 of the revision text. */
    rev_sha1: string;

    /** The length of the revision text in bytes. */
    rev_len: number;

    /** Flag identifying if the revision is minor. */
    rev_minor_edit: boolean;

    /** The content model of the revision. */
    rev_content_model: string;

    /** The content format of the revision. */
    rev_content_format: string;

    /** Flag indicating whether the revision was a revert. */
    rev_is_revert: boolean;

	/** Flag indicating whether the revision changed the content. */
	rev_content_changed: boolean;

    /** Details about the revert. */
    rev_revert_details?: {

        /** The method that was used to perform the revert. */
        rev_revert_method: ("rollback" | "undo" | "manual")[];

        /**
         * Flag indicating whether the revert was exact, i.e. the contents
         * of the revert revision and restored revision match.
         */
        rev_is_exact_revert: boolean;

        /**
         * IDs of revisions that were reverted by this edit, ordered from
         * oldest to newest.
         */
        rev_reverted_revs: number[];

        /** The ID of an earlier revision that is being repeated or restored. */
        rev_original_rev_id: number;

    }

	/**
	 * The revision slots attached to this revision.
	 */
	rev_slots: Record<string, RevisionSlot> & { main: RevisionSlot };

}

/**
 * Determines if an object has revision information. Required for some events.
 *
 * This function is much more sensitive to missing parameters than as defined in the
 * Wikimedia EventStreams documentation. This ensures that parameters work as expected
 * in client usages.
 * @param object The object to check
 * @returns `true` if the object contains valid page information, `false` if otherwise.
 */
export function hasMediaWikiRevision(object: any): object is Revision {
	return typeof object === "object"
		&& typeof object.rev_id === "number"
		&& typeof object.rev_timestamp === "string"
		// Ensure that this is a properly-readable Date string.
		&& !isNaN(new Date(object.rev_timestamp).getTime())
		&& typeof object.rev_sha1 === "string"
		&& typeof object.rev_len === "number"
		&& typeof object.rev_minor_edit === "boolean"
		&& typeof object.rev_content_model === "string"
		&& typeof object.rev_content_format === "string"
		&& typeof object.rev_is_revert === "boolean"
		&& typeof object.rev_content_changed === "boolean"
		&& typeof object.rev_slots === "object"
		// Main slot is always supplied.
		&& typeof object.rev_slots.main === "object"
		&& typeof object.rev_slots.main.rev_slot_content_model === "string"
		&& typeof object.rev_slots.main.rev_slot_sha1 === "string"
		&& typeof object.rev_slots.main.rev_slot_size === "number";
}
