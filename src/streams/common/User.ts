export interface UserBase {

	/** The text representation of the user that performed this change. */
	user_text: string;

	/** A list of the groups this user belongs to. E.g. bot, sysop etc. */
	user_groups: string[];

	/**
	 * True if this user is considered to be a bot at the time of this
	 * event. This is checked via the $user->isBot() method, which
	 * considers both user_groups and user permissions.
	 */
	user_is_bot: string;

}

export interface RegisteredUser extends UserBase {

	/**
	 * The user id that performed this change. This is optional, and will
	 * not be present for anonymous users.
	 */
	user_id: number;

	/**
	 * The datetime of the user account registration. Not present for
	 * anonymous users or if missing in the MW database.
	 */
	user_registration_dt: string;

	/**
	 * The number of edits this user has made at the time of this event.
	 * Not present for anonymous users.
	 */
	user_edit_count: string;

}

type User = UserBase | RegisteredUser;
export default User;

/**
 * Determines if an object is a RegisteredUser object. Required for some events.
 *
 * @param object The object to check
 * @return `true` if the object contains valid registered user information, `false` if otherwise.
 */
export function isMediaWikiRegisteredUser( object: any ): object is RegisteredUser {
	return typeof object === 'object' &&
		typeof object.user_id === 'number' &&
		typeof object.user_text === 'string' &&
		typeof object.user_is_bot === 'boolean' &&
		Array.isArray( object.user_groups ) &&
		typeof object.user_edit_count === 'number';
}

/**
 * Determines if an object is a User object. Required for some events.
 *
 * @param object The object to check
 * @return `true` if the object contains valid user information, `false` if otherwise.
 */
export function isMediaWikiUser( object: any ): object is User {
	return typeof object === 'object' &&
		typeof object.user_text === 'string' &&
		typeof object.user_is_bot === 'boolean' &&
		Array.isArray( object.user_groups );
}
