import Joi from "joi";
import joiObjectId from "joi-objectid";

export function validate() {
    Joi.objectId = joiObjectId(Joi);
}