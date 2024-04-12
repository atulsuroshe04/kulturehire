const mongoose = require("mongoose");

const softSkillsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required !"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});
// softSkillsSchema.plugin(validator,{message:'Email address already exists !'})
module.exports = softSkillsSchema;
