const mongoose = require('mongoose');

const skillsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required !'],
  },
  type: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});
// softSkillsSchema.plugin(validator,{message:'Email address already exists !'})
module.exports = skillsSchema;
