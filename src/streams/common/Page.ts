export default interface Page {

    /** The page ID of the page this revision belongs to. */
    page_id: number;

    /** The normalized title of the page this revision belongs to. */
    page_title: string;

    /** The namespace of the page this revision belongs to. */
    page_namespace: number;

    /**
     * True if this revision is a redirect. This fact is ultimately
     * represented by revision content containing redirect wikitext.
     * If this revision is the head revision of the page, then the
     * page will also be a redirect.
     */
    page_is_redirect: boolean;

}