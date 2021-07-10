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

    /** Flag indicating whether the edit was a revert. */
    rev_is_revert: boolean;

    /** Details about the revert. */
    rev_revert_details: {

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

}