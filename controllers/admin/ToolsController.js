const mongoose = require("mongoose");
const toolsSchema = require("../../schemas/toolsSchema");
const Tool = new mongoose.model("Tools", toolsSchema);


/**
 * Show Tools listing page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const toolsList = async (request, response, next) => {
  const data = await Tool.find();

  response.render("../views/pages/admin/tools/list", {
    title: "Tool List",
    name: "tools",
    menuType: "admin",
    layout: "../views/layout/app.ejs",
    successMessages: request.flash("success"),
    errorMessages: request.flash("error"),
    data,
  });
};

/**
 * Show add Tool page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 */
const loadAddTool = (request, response) => {
  response.render("../views/pages/admin/tools/add", {
    title: "Tool Add",
    name: "tools",
    menuType: "admin",
    layout: "../views/layout/app.ejs",
  });
};

/**
 * Show edit Tool page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @returns {*}
 */
const loadEditTool = async (request, response) => {
  const { id } = request.params;
  const data = await Tool.find({ _id: id });
  response.render("../views/pages/admin/tools/edit", {
    title: "Tool Edit",
    name: "tools",
    menuType: "admin",
    layout: "../views/layout/app.ejs",
    data: data[0],
  });
};

/**
 * Save tools form data
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const toolsSave = async (request, response, next) => {
  const { name, status } = request.body;

  const toolObj = new Tool({
    name,
    status,
  });

  try {
    await toolObj.save();
    request.flash("success", "Tool added successfully");
    response.redirect(
      `${response.locals.base}admin/tools/${response.getLocale()}`,
    );
  } catch (error) {
    request.flash("error", error.message);
    response.redirect(
      `${response.locals.base}admin/tools/${response.getLocale()}`,
    );
  }
};

/**
 * Update tools update form data
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const toolsUpdate = async (request, response, next) => {
  const { id } = request.params;
  const { name, status } = request.body;

  const newData = request.body;

  try {
    const updatedTool = await Tool.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (updatedTool) {
      request.flash("success", "Tool updated successfully");
    } else {
      request.flash("error", "Tool not found!");
    }
  } catch (error) {
    request.flash("error", error.message);
  }
  response.redirect(
    `${response.locals.base}admin/tools/${response.getLocale()}`,
  );
};

module.exports = {
  toolsList,
  toolsSave,
  loadAddTool,
  loadEditTool,
  toolsUpdate,
};
