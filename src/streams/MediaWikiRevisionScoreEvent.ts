/*
 * Documentation for the schema was derived from <https://stream.wikimedia.org/?doc>,
 * which is licensed under the Apache License 2.0.
 */

import User, {isMediaWikiUser} from "./common/User";
import {isMediaWikiEvent, MediaWikiEvent} from "./EventStream";
import Page, {hasMediaWikiPage} from "./common/Page";
import Comment, {hasMediaWikiComment} from "./common/Comment";
import Revision from "./common/Revision";

interface ModelScore {

    /**
     * The name of the model used for this score.
     */
    model_name: string;

    /**
     * The version of the model used for this score.
     */
    model_version: string;

    /**
     * A list of predictions made by this model.
     */
    prediction: string[];

    /**
     * A list of probabilities made by this model. Each element is a
     * key/value with a probability name and a probability value.
     */
    probability: Record<string, number>;

}

interface ModelError {

    /**
     * The name of the model that encountered this error.
     */
    model_name: string;

    /**
     * The version of the model that encountered this error.
     */
    model_version: string;

    /**
     * The short name of this error
     */
    type: string;

    /**
     * A human-readable explanation of what went wrong
     */
    message: string;

}

/** Represents a MW Revision Create event. */
export default interface MediaWikiRevisionScoreEvent extends
    MediaWikiEvent, Page, Comment, Pick<Revision, "rev_id" | "rev_parent_id" | "rev_timestamp"> {

    /** Represents the user that performed this change. */
    performer?: User;

    /**
     * List of ORES score objects. Each model uses the model name as a
     * map key and was used to score this revision.
     *
     * @example
     {
         "awesomeness": {
             "model_name": "awesomeness",
             "model_version": "1.0.1",
             "prediction": [
                 "yes",
                 "mostly"
             ],
             "probability": {
                 "yes": 0.99,
                 "mostly": 0.90,
                 "hardly": 0.01
             }
         }
     }
     */
    scores?: Record<string, ModelScore>;

    /**
     * Errors that occurred when models attempted to score this revision.
     * Each error uses the model name as a map key.
     */
    errors?: Record<string, ModelError>;

}

export function isMediaWikiRevisionScoreEvent(object: any): object is MediaWikiRevisionScoreEvent {
	return typeof object === "object"
		&& typeof object.rev_id === "number"
		&& typeof object.rev_parent_id === "number"
		&& typeof object.rev_timestamp === "string"
		&& (!object.scores || (typeof object.scores === "object"
			&& Object.values(object.scores).every((v: any) =>
				typeof v.model_name === "string"
				&& typeof v.model_version === "string"
				&& Array.isArray(v.prediction)
				&& typeof v.probability === "object"
				&& Object.values(v.probability).every(v2 => typeof v2 === "number")
			)
		))
		&& (!object.errors || (typeof object.errors === "object"
			&& Object.values(object.errors).every((v: any) =>
				typeof v.model_name === "string"
				&& typeof v.model_version === "string"
				&& typeof v.type === "string"
				&& typeof v.message === "string"
			)
		))
		&& (!object.comment || hasMediaWikiComment(object))
		&& hasMediaWikiPage(object)
		&& isMediaWikiUser((object as any).performer)
		&& isMediaWikiEvent(object);
}
