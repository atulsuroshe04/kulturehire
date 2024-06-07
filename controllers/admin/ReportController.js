const moment = require('moment');
/**
 * ${1:Description placeholder}
 *
 * @type {*}
 */
const mongoose = require('mongoose');
/**
 * ${1:Description placeholder}
 *
 * @type {*}
 */
const viewActionSchema = require('../../schemas/viewActionSchema');
/**
 * ${1:Description placeholder}
 *
 * @type {*}
 */
const ViewAction = new mongoose.model('Viewed_contacts', viewActionSchema);
const employerSchema = require("../../schemas/employerSchema");
const Employer = new mongoose.model("Employer", employerSchema);

/**
 * ${1:Description placeholder}
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const employerActions = async (request, response, next) => {
    await ViewAction.find().populate(['candidate_id', 'employer_id'])
        .then((data) => {
            console.log(data);
            response.render('../views/pages/admin/reports/employer-actions', {
                title: 'Employer Actions Report',
                name: 'employer_actions',
                menuType: 'admin',
                data,
                moment
            });
        })
        .catch((error) => console.log(error));
};


module.exports = {
    employerActions,
};
