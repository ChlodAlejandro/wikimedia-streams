export default interface Comment {

    /** The comment left by the user that performed this change. */
    comment: string;

    /**
     * The comment left by the user that performed this change parsed into simple HTML. Optional
     */
    parsedcomment: string;

}