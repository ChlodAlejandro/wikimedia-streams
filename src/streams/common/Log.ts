export default interface Log {

	/** Property only exists if event has rc_params. */
	log_params?: Record<string, any>;

	/** (rc_log_id) */
	log_id: number | null;

	/** (rc_log_type) */
	log_type: string | null;

	/** (rc_log_action) */
	log_action: string;

	log_action_comment?: string;

}

/**
 * Determines if an object has a log entry or not. This may return `false`, but is not indicative
 * of an improperly-formatted event, since events may not have log fields.
 *
 * @param object The object to check
 * @return `true` if the object contains a valid comment, `false` if otherwise.
 */
export function hasMediaWikiLog( object: any ): object is Log {
	return typeof object === 'object' &&
		typeof object.log_id === 'number' &&
		typeof object.log_type === 'string' &&
		typeof object.log_action === 'string';
}
