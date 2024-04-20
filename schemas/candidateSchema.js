const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");
const validator = require("mongoose-unique-validator");
const mime = require('mime-types');

const candidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required !"],
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
  phone: {
    type: String,
    validate: [isMobilePhone, "Enter a valid phone number !"],
    required: [true, "Phone number is required !"],
    validate: {
      validator: async function (v) {
        const candidate = await this.constructor.findOne({ phone: v });
        return !candidate; // Returns true if phone is unique, false if it's not
      },
      message: "Phone number already exists !"
    },
  },
  job_title: {
    type: String,
    required: [true, "Enter your job title !"],
  },
  age: {
    type: String,
    required: [true, "Enter your age !"],
  },
  gender: {
    type: String,
    enum: ["male", "female"]
  },
  current_location: {
    type: String,
    required: [true, "Enter your current location !"],
  },
  monthly_expected_salary: {
    type: String,
    required: [true, "Enter your monthly expected salary !"],
  },
  resume: {
    type: String,
    required: [true, "Please select a resume file!"]
  },
  resume_path: String
});
candidateSchema.plugin(validator, { message: "Email address already exists !" });

module.exports = candidateSchema;
