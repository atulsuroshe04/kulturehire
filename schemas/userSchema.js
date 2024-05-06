const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");
const mime = require('mime-types');

const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    validate: [isEmail, "Enter a valid email address !"],
    required: [true, "Email address is required !"],
    unique: [true, "Email is already registered!"],
  },
  password: {
    type: String,
    required: [true, "Enter your desired password !"],
  },
  userType: {
    type: String,
    enum: ["employer", "admin", "candidate"],
  }
});

module.exports = userSchema;
