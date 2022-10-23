import userSchema from "./userSchema.js";
import jsonschema from "jsonschema";

var validator = new jsonschema.Validator();

export const userValidator = (schema) => validator.validate(schema, userSchema);
