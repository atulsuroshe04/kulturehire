/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @type {*}
 */
const mongoose = require("mongoose");
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @type {*}
 */
const softSkillsSchema = require("../../schemas/softSkillsSchema");

/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @type {*}
 */
const SoftSkill = new mongoose.model("SoftSkills", softSkillsSchema);

// Show softskills listing page
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const softSkillsList = async (request, response, next) => {
  const data = await SoftSkill.find();

  response.render("../views/pages/admin/softskills/list", {
    title: "Soft Skills List",
    name: "softskills",
    menuType: "admin",
    layout: "../views/layout/app.ejs",
    successMessages: request.flash("success"),
    errorMessages: request.flash("error"),
    data,
  });
};

// Show add soft skill page
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 */
const loadAddSoftSkill = (request, response) => {
  response.render("../views/pages/admin/softskills/add", {
    title: "Soft Skills Add",
    name: "softskills",
    menuType: "admin",
    layout: "../views/layout/app.ejs",
  });
};

// Show add soft skill page
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @returns {*}
 */
const loadEditSoftSkill = async (request, response) => {
  const { id } = request.params;
  const data = await SoftSkill.find({ _id: id });
  response.render("../views/pages/admin/softskills/edit", {
    title: "Soft Skills Edit",
    name: "softskills",
    menuType: "admin",
    layout: "../views/layout/app.ejs",
    data: data[0],
  });
};

// Save softskills listing page
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const softSkillsSave = async (request, response, next) => {
  const { name, status } = request.body;

  const softSkillObj = new SoftSkill({
    name,
    status,
  });

  try {
    await softSkillObj.save();
    request.flash("success", "Soft Skill added successfully");
    response.redirect(
      `${response.locals.base}admin/soft-skills/${response.getLocale()}`,
    );
  } catch (error) {
    request.flash("error", error.message);
    response.status(500).json({ message: error.message }); // Handle error
  }
};

// Update softskills listing page
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const softSkillsUpdate = async (request, response, next) => {
  const { id } = request.params;
  const { name, status } = request.body;

  const newData = request.body; // Assuming you're sending the updated data in the request body

  try {
    // Find the document by ID and update it
    const updatedSoftSkill = await SoftSkill.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (updatedSoftSkill) {
      request.flash("success", "Soft Skill updated successfully");
    } else {
      request.flash("error", "Soft Skill not found!");
    }
  } catch (error) {
    request.flash("error", error.message);
  }
  response.redirect(
    `${response.locals.base}admin/soft-skills/${response.getLocale()}`,
  );
};

module.exports = {
  softSkillsList,
  softSkillsSave,
  loadAddSoftSkill,
  loadEditSoftSkill,
  softSkillsUpdate,
};
