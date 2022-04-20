const moongose = require("mongoose");
const Joi = require("joi");

// Schema
const userSchema = new moongose.Schema({
  username: {
    type: "string",
    max: 200,
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    max: 200,
    required: true,
    unique: true,
  },
  canWrite: {
    type: "boolean",
  },
  canRead: {
    type: "boolean",
  },
  canExecute: {
    type: "boolean",
  },
});

// create instance name UserModel
const UserModel = moongose.model("UserModel", userSchema);

// Form Validator
function userValidate(reqBody) {
  const schema = Joi.object({
    username: Joi.string().max(200).required(),
    password: Joi.string().max(200).required(),
  });
  return schema.validate(reqBody);
}

exports.UserModel = UserModel;
exports.userValidate = userValidate;
