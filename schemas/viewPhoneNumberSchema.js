const mongoose = require('mongoose');

const viewPhoneNumberSchema = mongoose.Schema(
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
    },
    { timestamps: true },
);

module.exports = viewPhoneNumberSchema;
