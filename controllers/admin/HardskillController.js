const mongoose = require("mongoose");
const hardSkillsSchema = require("../../schemas/hardSkillsSchema");
const HardSkill = new mongoose.model("hardSkills", hardSkillsSchema);

/**
 *Show hardskills listing page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const hardSkillsList = async (request, response, next) => {
  const data = await HardSkill.find();
  console.log(data);

  response.render("../views/pages/admin/hardskills/list", {
    title: "Hard Skills List",
    name: "hardskills",
    menuType: "admin",
    layout: "../views/layout/app.ejs",
    successMessages: request.flash("success"),
    errorMessages: request.flash("error"),
    data,
  });
};

/**
 * Show add Hard skill page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 */
const loadAddHardSkill = (request, response) => {
  response.render("../views/pages/admin/hardskills/add", {
    title: "Hard Skills Add",
    name: "hardskills",
    layout: "../views/layout/app.ejs",
  });
};

/**
 * Show edit Hard skill page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @returns {*}
 */
const loadEditHardSkill = async (request, response) => {
  const { id } = request.params;
  const data = await HardSkill.find({ _id: id });
  response.render("../views/pages/admin/hardskills/edit", {
    title: "Hard Skills Edit",
    name: "hardskills",
    layout: "../views/layout/app.ejs",
    data: data[0],
  });
};


/**
 * Save hard skill page for data
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const hardSkillsSave = async (request, response, next) => {
  const { name, status } = request.body;

  const hardSkillObj = new HardSkill({
    name,
    status,
    createdBy: request.session.user._id,
  });

  try {
    await hardSkillObj.save();
    request.flash("success", "Soft Skill added successfully");
    response.redirect(
      `${response.locals.base}admin/hard-skills/${response.getLocale()}`,
    );
  } catch (error) {
    request.flash("error", error.message);
    response.status(500).json({ message: error.message }); // Handle error
  }
};

/**
 * Save hard skill page for data
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const hardSkillsUpdate = async (request, response, next) => {
  const { id } = request.params;

  const newData = request.body;

  try {
    // Find the document by ID and update it
    const updatedHardSkill = await HardSkill.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (updatedHardSkill) {
      request.flash("success", "Hard Skill updated successfully");
    } else {
      request.flash("error", "Hard Skill not found!");
    }
  } catch (error) {
    request.flash("error", error.message);
  }
  response.redirect(
    `${response.locals.base}admin/hard-skills/${response.getLocale()}`,
  );
};

module.exports = {
  hardSkillsList,
  hardSkillsSave,
  loadAddHardSkill,
  loadEditHardSkill,
  hardSkillsUpdate,
};
