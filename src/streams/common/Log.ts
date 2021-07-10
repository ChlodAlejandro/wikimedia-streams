export default interface Log {

    /** Property only exists if event has rc_params. */
    log_params?: Record<string, any>;

    /** (rc_log_id) */
    log_id: number | null;

    /** (rc_log_type) */
    log_type: string | null;

    /** (rc_log_action) */
    log_action: string;

    log_action_comment: string;

}