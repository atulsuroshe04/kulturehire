const mongoose = require('mongoose');

const programSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name field is required !'],
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
// hardSkillsSchema.plugin(validator,{message:'Email address already exists !'})

module.exports = programSchema;
