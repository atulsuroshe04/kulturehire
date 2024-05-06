/**
 * ${1:Description placeholder}
 *
 * @type {*}
 */
const mongoose = require("mongoose");
/**
 * ${1:Description placeholder}
 *
 * @type {*}
 */
const programSchema = require("../../schemas/programSchema");
/**
 * ${1:Description placeholder}
 *
 * @type {*}
 */
const Program = new mongoose.model("program", programSchema);

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
const programList = async (request, response, next) => {
  const data = await Program.find();
  console.log(data);

  response.render("../views/pages/admin/programs/list", {
    title: "Programs List",
    name: "programs",
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
const loadAddProgram = (request, response) => {
  response.render("../views/pages/admin/programs/add", {
    title: "Program Add",
    name: "programs",
    layout: "../views/layout/app.ejs",
    menuType: "admin",
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
const loadEditProgram = async (request, response) => {
  const { id } = request.params;
  const data = await Program.find({ _id: id });
  response.render("../views/pages/admin/programs/edit", {
    title: "Program Edit",
    name: "programs",
    layout: "../views/layout/app.ejs",
    menuType: "admin",
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
const programSave = async (request, response, next) => {
  const { name, status } = request.body;

  const programObj = new Program({
    name,
    status,
    createdBy: request.session.user._id,
  });

  try {
    await programObj.save();
    request.flash("success", "Program added successfully");
    response.redirect(
      `${response.locals.base}admin/programs/${response.getLocale()}`,
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
const programUpdate = async (request, response, next) => {
  const { id } = request.params;

  const newData = request.body;

  try {
    // Find the document by ID and update it
    const updatedProgram = await Program.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (updatedProgram) {
      request.flash("success", "Program updated successfully");
    } else {
      request.flash("error", "Program not found!");
    }
  } catch (error) {
    request.flash("error", error.message);
  }
  response.redirect(
    `${response.locals.base}admin/programs/${response.getLocale()}`,
  );
};

module.exports = {
  programList,
  programSave,
  loadAddProgram,
  loadEditProgram,
  programUpdate,
};
