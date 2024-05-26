/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @type {*}
 */
const mongoose = require('mongoose');
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @type {*}
 */
const skillsSchema = require('../../schemas/skillsSchema');

/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @type {*}
 */
const Skill = new mongoose.model('Skill', skillsSchema);

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
const skillsList = async (request, response, next) => {
  const data = await Skill.find();

  response.render('../views/pages/admin/skills/list', {
    title: 'Skills List',
    name: 'skills',
    menuType: 'admin',
    layout: '../views/layout/app.ejs',
    successMessages: request.flash('success'),
    errorMessages: request.flash('error'),
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
const loadAddSkill = (request, response) => {
  response.render('../views/pages/admin/skills/add', {
    title: 'Skills Add',
    name: 'skills',
    menuType: 'admin',
    layout: '../views/layout/app.ejs',
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
const loadEditSkill = async (request, response) => {
  const { id } = request.params;
  const data = await Skill.find({ _id: id });
  response.render('../views/pages/admin/skills/edit', {
    title: 'Skills Edit',
    name: 'skills',
    menuType: 'admin',
    layout: '../views/layout/app.ejs',
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
const skillsSave = async (request, response, next) => {
  const { name, type, status } = request.body;

  const skillObj = new Skill({
    name,
    type,
    status,
  });

  try {
    await skillObj.save();
    request.flash('success', 'Skill added successfully');
    response.redirect(
      `${response.locals.base}admin/skills/${response.getLocale()}`,
    );
  } catch (error) {
    request.flash('error', error.message);
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
const skillsUpdate = async (request, response, next) => {
  const { id } = request.params;
  const { name, status } = request.body;

  const newData = request.body; // Assuming you're sending the updated data in the request body

  try {
    // Find the document by ID and update it
    const updatedSkill = await Skill.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (updatedSkill) {
      request.flash('success', 'Soft Skill updated successfully');
    } else {
      request.flash('error', 'Soft Skill not found!');
    }
  } catch (error) {
    request.flash('error', error.message);
  }
  response.redirect(
    `${response.locals.base}admin/skills/${response.getLocale()}`,
  );
};

module.exports = {
  skillsList,
  skillsSave,
  loadAddSkill,
  loadEditSkill,
  skillsUpdate,
};
