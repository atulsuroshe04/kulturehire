const mongoose = require('mongoose');

const simulationSchema = mongoose.Schema(
  {
    candidate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: [true, 'Please select a candidate !'],
    },
    program_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
      required: [true, 'Program field is required !'],
    },
    primary_skills: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
      required: [true, 'Primary skills field is required !'],
    },
    secondary_skills: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
      required: [true, 'Secondary skills field is required !'],
    },
    milestone1_heading: {
      type: String,
    },
    milestone1_expectation: {
      type: String,
      required: [true, 'Milestone 1 expectations field is required !'],
    },
    milestone1_skill: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
      required: [true, 'Milestone 1 skills field is required !'],
    },
    milestone1_skill_rating: {
      type: Number,
      ref: 'Program',
      required: [true, 'Milestone 1 skills rating field is required !'],
    },
    milestone1_submission: {
      type: String,
      required: [true, 'Milestone 1 submission field is required !'],
    },
    milestone1_submission_type: {
      type: String,
    },
    milestone2_heading: {
      type: String,
    },
    milestone2_expectation: {
      type: String,
    },
    milestone2_skill: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    },
    milestone2_skill_rating: {
      type: Number,
    },
    milestone2_submission: {
      type: String,
    },
    milestone2_submission_type: {
      type: String,
    },
    milestone3_heading: {
      type: String,
    },
    milestone3_expectation: {
      type: String,
    },
    milestone3_skill: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    },
    milestone3_skill_rating: {
      type: Number,
    },
    milestone3_submission: {
      type: String,
    },
    milestone3_submission_type: {
      type: String,
    },
    milestone4_heading: {
      type: String,
    },
    milestone4_expectation: {
      type: String,
    },
    milestone4_skill: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    },
    milestone4_skill_rating: {
      type: Number,
    },
    milestone4_submission: {
      type: String,
    },
    milestone4_submission_type: {
      type: String,
    },
    milestone5_heading: {
      type: String,
    },
    milestone5_expectation: {
      type: String,
    },
    milestone5_skill: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    },
    milestone5_skill_rating: {
      type: Number,
    },
    milestone5_submission: {
      type: String,
    },
    milestone5_submission_type: {
      type: String,
    },
    milestone6_heading: {
      type: String,
    },
    milestone6_expectation: {
      type: String,
    },
    milestone6_skill: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    },
    milestone6_skill_rating: {
      type: Number,
    },
    milestone6_submission: {
      type: String,
    },
    milestone6_submission_type: {
      type: String,
    },
    milestone7_heading: {
      type: String,
    },
    milestone7_expectation: {
      type: String,
    },
    milestone7_skill: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    },
    milestone7_skill_rating: {
      type: Number,
    },
    milestone7_submission: {
      type: String,
    },
    milestone7_submission_type: {
      type: String,
    },
    milestone8_heading: {
      type: String,
    },
    milestone8_expectation: {
      type: String,
    },
    milestone8_skill: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    },
    milestone8_skill_rating: {
      type: Number,
    },
    milestone8_submission: {
      type: String,
    },
    milestone8_submission_type: {
      type: String,
    },
    milestone9_heading: {
      type: String,
    },
    milestone9_expectation: {
      type: String,
    },
    milestone9_skill: {
      type: String,
    },
    milestone9_skill_rating: {
      type: Number,
    },
    milestone9_submission: {
      type: String,
    },
    milestone9_submission_type: {
      type: String,
    },
    milestone10_heading: {
      type: String,
    },
    milestone10_expectation: {
      type: String,
    },
    milestone10_skill: {
      type: String,
    },
    milestone10_skill_rating: {
      type: Number,
    },
    milestone10_submission: {
      type: String,
    },
    milestone10_submission_type: {
      type: String,
    },
    milestone11_heading: {
      type: String,
    },
    milestone11_expectation: {
      type: String,
    },
    milestone11_skill: {
      type: String,
    },
    milestone11_skill_rating: {
      type: Number,
    },
    milestone11_submission: {
      type: String,
    },
    milestone11_submission_type: {
      type: String,
    },
    milestone12_heading: {
      type: String,
    },
    milestone12_expectation: {
      type: String,
    },
    milestone12_skill: {
      type: String,
    },
    milestone12_skill_rating: {
      type: Number,
    },
    milestone12_submission: {
      type: String,
    },
    milestone12_submission_type: {
      type: String,
    },
    milestone13_heading: {
      type: String,
    },
    milestone13_expectation: {
      type: String,
    },
    milestone13_skill: {
      type: String,
    },
    milestone13_skill_rating: {
      type: Number,
    },
    milestone13_submission: {
      type: String,
    },
    milestone13_submission_type: {
      type: String,
    },
    milestone14_heading: {
      type: String,
    },
    milestone14_expectation: {
      type: String,
    },
    milestone14_skill: {
      type: String,
    },
    milestone14_skill_rating: {
      type: Number,
    },
    milestone14_submission: {
      type: String,
    },
    milestone14_submission_type: {
      type: String,
    },
    milestone15_heading: {
      type: String,
    },
    milestone15_expectation: {
      type: String,
    },
    milestone15_skill: {
      type: String,
    },
    milestone15_skill_rating: {
      type: Number,
    },
    milestone15_submission: {
      type: String,
    },
    milestone15_submission_type: {
      type: String,
    },
    milestone16_heading: {
      type: String,
    },
    milestone16_expectation: {
      type: String,
    },
    milestone16_skill: {
      type: String,
    },
    milestone16_skill_rating: {
      type: Number,
    },
    milestone16_submission: {
      type: String,
    },
    milestone16_submission_type: {
      type: String,
    },
    milestone17_heading: {
      type: String,
    },
    milestone17_expectation: {
      type: String,
    },
    milestone17_skill: {
      type: String,
    },
    milestone17_skill_rating: {
      type: Number,
    },
    milestone17_submission: {
      type: String,
    },
    milestone17_submission_type: {
      type: String,
    },
    milestone18_heading: {
      type: String,
    },
    milestone18_expectation: {
      type: String,
    },
    milestone18_skill: {
      type: String,
    },
    milestone18_skill_rating: {
      type: Number,
    },
    milestone18_submission: {
      type: String,
    },
    milestone18_submission_type: {
      type: String,
    },
    milestone19_heading: {
      type: String,
    },
    milestone19_expectation: {
      type: String,
    },
    milestone19_skill: {
      type: String,
    },
    milestone19_skill_rating: {
      type: Number,
    },
    milestone19_submission: {
      type: String,
    },
    milestone19_submission_type: {
      type: String,
    },
    milestone20_heading: {
      type: String,
    },
    milestone20_expectation: {
      type: String,
    },
    milestone20_skill: {
      type: String,
    },
    milestone20_skill_rating: {
      type: Number,
    },
    milestone20_submission: {
      type: String,
    },
    milestone20_submission_type: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    completed_milestones: {
      type: Number,
      default: 0,
    },
    candidate_location: {
      type: String,
    }
  },
  { versionKey: false, timestamps: true },
);

module.exports = simulationSchema;
