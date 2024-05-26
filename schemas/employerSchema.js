const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');
const validator = require('mongoose-unique-validator');

const employerSchema = mongoose.Schema(
  {
    company_name: {
      type: String,
      required: [true, 'Name field is required !'],
    },
    gst_number: {
      type: String,
      required: [true, 'GST field is required !'],
    },
    location: {
      type: String,
      required: [true, 'location field is required !'],
    },
    linkedin_url: {
      type: String,
      required: [true, 'linkedin field is required !'],
    },
    official_email_address: {
      type: String,
      validate: [isEmail, 'Enter a valid email address !'],
      unique: [true, 'Email is already registered!'],
      required: [true, 'Official email address field is required !'],
    },
    person_name: {
      type: String,
      required: [true, 'name field is required !'],
    },
    official_contact_number: {
      type: String,
      required: [true, 'Official Contact Number field is required !'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);
employerSchema.plugin(validator, { message: 'Email address already exists !' });

module.exports = employerSchema;
