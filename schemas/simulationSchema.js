const mongoose = require("mongoose");

const simulationSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title field is required !"],
  },
  duration: {
    type: String,
    required: [true, "Duration field is required !"],
  },
  milestone1_skill: {
    type: String,
    required: [true, "Milestone 1 field is required !"],
  },
  milestone2_skill: {
    type: String,
  },
  milestone3_skill: {
    type: String,
  },
  milestone4_skill: {
    type: String,
  },
  milestone5_skill: {
    type: String,
  },
  milestone6_skill: {
    type: String,
  },
  milestone7_skill: {
    type: String,
  },
  milestone8_skill: {
    type: String,
  },
  milestone9_skill: {
    type: String,
  },
  milestone10_skill: {
    type: String,
  },
  milestone11_skill: {
    type: String,
  },
  milestone12_skill: {
    type: String,
  },
  milestone13_skill: {
    type: String,
  },
  milestone14_skill: {
    type: String,
  },
  milestone15_skill: {
    type: String,
  },
  milestone16_skill: {
    type: String,
  },
  milestone17_skill: {
    type: String,
  },
  milestone18_skill: {
    type: String,
  },
  milestone19_skill: {
    type: String,
  },
  milestone20_skill: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

module.exports = simulationSchema;
