const mongoose = require("mongoose");
const simulationSchema = require("../../schemas/simulationSchema");
const Simulation = new mongoose.model("Simulation", simulationSchema);
const skillSchema = require("../../schemas/skillsSchema");
const Skill = new mongoose.model("Skill", skillSchema);
const programSchema = require("../../schemas/programSchema");
const Program = new mongoose.model("Program", programSchema);
const viewActionSchema = require("../../schemas/viewActionSchema");
const ViewAction = new mongoose.model("Viewed_contacts", viewActionSchema);
// blank page
/**
 * Load eployer dashbard page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const searchCandidate = async (request, response, next) => {
    const simulations = await Simulation.find().populate([
        "candidate_id",
        "program_id",
        "primary_skills",
        "secondary_skills",
    ]);
    const technical_skills = await Skill.find({ status: "active", type: 'technicalskill' });
    const business_skills = await Skill.find({ status: "active", type: 'businessskill' });
    const soft_skills = await Skill.find({ status: "active", type: 'softskill' });
    const project_skills = await Skill.find({ status: "active", type: 'projectskill' });
    const programs = await Program.find({ status: "active" });
    response.render("../views/pages/employer/search-candidates", {
        title: "Search Candidates",
        name: "sear h-candidates",
        menuType: "employer",
        name: "search-candidates",
        simulations,
        technical_skills,
        business_skills,
        soft_skills,
        programs,
        project_skills
    });
};

const filterCandidates = async (request, response) => {
    const { location, skills, program_id, project_skills } = request.body;

    // Construct the query object
    const query = {};

    // Add location to the query if provided
    if (location) {
        query.location = location;
    }

    const milestoneFields = Array.from({ length: 20 }, (_, i) => `milestone${i + 1}_skill`);

    // Add skills to the query if provided
    if (skills && skills.length > 0) {
        query.$and = [
            { primary_skills: { $in: skills } }
        ];
    }
    if (project_skills && project_skills.length > 0) {
        query.$or = milestoneFields.map(field => ({ [field]: project_skills }));
    }

    // Add program_id to the query if provided
    if (program_id) {
        query.program_id = program_id;
    }
    // Perform the search with population of references
    const simulations = await Simulation.find(query).populate([
        'candidate_id',
        'program_id',
        'primary_skills',
        'secondary_skills',
    ]);
    response.json(simulations)
}

const simulatinDetails = async (request, response) => {
    const { id } = request.params;
    const simulation = await Simulation.find({ _id: id }).populate([
        "candidate_id",
        "program_id",
        "primary_skills",
        "secondary_skills",
        "milestone1_skill",
        "milestone2_skill",
        "milestone3_skill",
        "milestone4_skill",
        "milestone5_skill",
        "milestone6_skill",
        "milestone7_skill",
        "milestone8_skill",
        "milestone9_skill",
        "milestone10_skill",
        "milestone11_skill",
        "milestone12_skill",
        "milestone13_skill",
        "milestone14_skill",
        "milestone15_skill",
        "milestone16_skill",
        "milestone17_skill",
        "milestone18_skill",
        "milestone19_skill",
        "milestone20_skill"
    ]);
    response.render("../views/pages/employer/simulation-details", {
        title: "Candidates details",
        name: "search-candidates",
        menuType: "employer",
        name: "search-candidates",
        simulation: simulation[0]
    });
}

const viewAction = async (request, response) => {
    const { candidate_id, simulation_id, action } = request.body;
    const employer_id = request.session.user._id ? request.session.user._id : null;

    // Define the search criteria as a plain object
    const searchCriteria = {
        candidate_id,
        simulation_id,
        employer_id,
        action
    };

    try {
        // Use findOne with the search criteria object
        const view_phone = await ViewAction.findOne(searchCriteria);

        if (!view_phone) {
            // Create a new instance only if no existing record is found
            const newViewPhone = new ViewAction(searchCriteria);
            await newViewPhone.save(); // Save the new object
            response.json({ status: "success" });
        } else {
            response.json({ status: "record already exists" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ status: "error", message: "Internal Server Error" });
    }

}
module.exports = {
    searchCandidate,
    filterCandidates,
    simulatinDetails,
    viewAction
};
