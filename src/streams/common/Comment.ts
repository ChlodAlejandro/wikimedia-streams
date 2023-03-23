export default interface Comment {

	/** The comment left by the user that performed this change. */
	comment?: string;

	/**
	 * The comment left by the user that performed this change parsed into simple HTML. Optional
	 */
	parsedcomment?: string;

}

/**
 * Determines if an object has a comment or not. This may return `false`, but is not indicative
 * of an improperly-formatted event, since revisions may not include comments.
 *
 * @param object The object to check
 * @return `true` if the object contains a valid comment, `false` if otherwise.
 */
export function hasMediaWikiComment( object: any ): object is Comment {
	return typeof object === 'object' &&
		typeof object.comment === 'string' &&
		typeof object.parsedcomment === 'string';
}
