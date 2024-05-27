const mongoose = require('mongoose');

const viewActionSchema = mongoose.Schema(
    {
        candidate_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Candidate',
        },
        employer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employer',
        },
        simulation_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Simulation',
        },
        action: {
            type: String,
            enum: ['resume_download', 'view_contact']
        }
    },
    { timestamps: true },
);

module.exports = viewActionSchema;
