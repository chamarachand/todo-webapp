const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: { type: String, minlength: 2, maxlength: 50, required: true },
  lastName: { type: String, minlength: 2, maxlength: 50, required: true },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    required: true,
  },
  password: { type: String, minlength: 5, maxlength: 1024, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

module.exports = { User, validate: validateUser, userSchema };
