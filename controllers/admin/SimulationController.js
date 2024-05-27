const mongoose = require("mongoose");
const pSchema = require("../../schemas/programSchema");
const Program = new mongoose.model("Program", pSchema);

const simulationSchema = require("../../schemas/simulationSchema");
const Simulation = new mongoose.model("Simulation", simulationSchema);

const candidateSchema = require("../../schemas/candidateSchema");
const Candidate = new mongoose.model("Candidate", candidateSchema);

const skillSchema = require("../../schemas/skillsSchema");
const Skill = new mongoose.model("Skill", skillSchema);

/**
 * ${1:Description placeholder}
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const simulationsList = async (request, response, next) => {
    const simulations = await Simulation.find().populate([
        "candidate_id",
        "program_id",
        "primary_skills",
        "secondary_skills",
    ]);

    response.render("../views/pages/admin/simulations/list", {
        title: "Candidates List",
        menuType: "admin",
        name: "simulations",
        data: simulations,
        successMessages: request.flash("success"),
        errorMessages: request.flash("error"),
    });
};

/**
 * ${1:Description placeholder}
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @returns {*}
 */
const loadAddSimulation = async (request, response) => {
    const step = request.query.step || 1;
    const simulation_id = request.query.simid || "";
    const candidates = await Candidate.find({ 'status': 'active' });
    const programs = await Program.find({ 'status': 'active' });
    const skills = await Skill.find({ 'status': 'active' });
    const project_skills = await Skill.find({ 'status': 'active', 'type': 'projectskill' });
    let existing_simulation = {};
    if (step > 1) {
        existing_simulation = await Simulation.find({ _id: simulation_id });
    }
    console.log(existing_simulation);
    response.render("../views/pages/admin/simulations/add", {
        title: "Simulation Add",
        name: "simulations",
        layout: "../views/layout/app.ejs",
        menuType: "admin",
        successMessages: request.flash("success"),
        errorMessages: request.flash("error"),
        candidates,
        programs,
        skills,
        step,
        simulation_id,
        existing_simulation,
        project_skills
    });
};

/**
 * ${1:Description placeholder}
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @returns {*}
 */
const saveSimulation = async (request, response) => {
    let step = request.query.step || 1;
    const simulationId = request.body.simulation_id;

    try {
        const milestoneData = {
            candidate_id: request.body.candidate_id,
            program_id: request.body.program_id,
            primary_skills: request.body.primary_skills,
            secondary_skills: request.body.secondary_skills,
            ["milestone" + step + "_expectation"]:
                request.body["milestone" + step + "_expectation"],
            ["milestone" + step + "_skill"]:
                request.body["milestone" + step + "_skill"],
            ["milestone" + step + "_skill_rating"]:
                request.body["milestone" + step + "_skill_rating"],
            ["milestone" + step + "_submission_type"]:
                request.body["milestone" + step + "_submission_type"],
        };
        // Check if submission_type is 'file', if so, add milestone_file to milestoneData
        if (request.body["milestone" + step + "_submission_type"] === "file") {
            milestoneData["milestone" + step + "_submission"] =
                request.files["milestone" + step + "_file"][0].filename;
        } else {
            milestoneData["milestone" + step + "_submission"] =
                request.body["milestone" + step + "_text"];
        }

        let simulation;
        milestoneData["completed_milestones"] = step;

        // If simulation_id is provided, try to update the existing document
        if (simulationId) {
            simulation = await Simulation.findByIdAndUpdate(
                simulationId,
                milestoneData,
                { new: true }, // Return the modified document
            );

        }

        // If simulation is not found (either simulationId is null or no document with that _id exists), add a new document
        if (!simulation) {
            simulation = new Simulation(milestoneData);
            await simulation.save();
        }

        request.flash("success", "Milestone - " + step + " added successfully");
        step = parseInt(step) + 1;

        if (step == 21) {
            request.flash("success", "All Milestone data added successfully");

            response.redirect(
                `${response.locals.base}admin/simulations/${response.getLocale()}`,
            );
        } else {
            response.redirect(
                `${response.locals.base}admin/simulations/add/${response.getLocale()}?step=` +
                step +
                `&simid=` +
                simulation?._id,
            );
        }
    } catch (error) {
        console.log(error);
        const candidates = await Candidate.find({ 'status': 'active' });
        const programs = await Program.find({ 'status': 'active' });
        const skills = await Skill.find({ 'status': 'active' });
        const project_skills = await Skill.find({ 'status': 'active', 'type': 'projectskill' });
        response.render("../views/pages/admin/simulations/add", {
            title: "Create New Simulation",
            name: "simulations",
            menuType: "admin",
            errors: error.errors,
            step: step,
            candidates,
            programs,
            skills,
            input: [],
            successMessages: request.flash("success"),
            errorMessages: request.flash("error"),
            simulation_id: "",
            existing_simulation: {},
            project_skills,
        });
    }
};

const viewSimulation = async (request, response) => {
    const { id } = request.params;

    const simulation = await Simulation.findById({ _id: id }).populate([
        "candidate_id",
        "program_id",
        "primary_skills",
        "secondary_skills",
    ]);

    response.render("../views/pages/admin/simulations/view", {
        title: "Candidates Simulation",
        menuType: "admin",
        name: "simulations",
        successMessages: request.flash("success"),
        errorMessages: request.flash("error"),
        simulation,
    });
};

module.exports = {
    simulationsList,
    loadAddSimulation,
    saveSimulation,
    viewSimulation,
};
