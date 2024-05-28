const bcrypt = require('bcrypt');
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
const employerSchema = require('../../schemas/employerSchema');

/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @type {*}
 */
const Employer = new mongoose.model('Employers', employerSchema);

const userSchema = require('../../schemas/userSchema');
const User = new mongoose.model('User', userSchema);

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
const employerList = async (request, response, next) => {
  const data = await Employer.find();

  response.render('../views/pages/admin/employers/list', {
    title: 'Employers List',
    name: 'employers',
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
const loadAddEmployer = (request, response) => {
  response.render('../views/pages/admin/employers/add', {
    title: 'Employer Add',
    name: 'employers',
    menuType: 'admin',
    layout: '../views/layout/app.ejs',
    input: [],
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
const loadEditEmployer = async (request, response) => {
  const { id } = request.params;
  const data = await Employer.find({ _id: id });
  response.render('../views/pages/admin/employers/edit', {
    title: 'Employer Edit',
    name: 'employers',
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
const employerSave = async (request, response, next) => {
  const {
    company_name,
    gst_number,
    location,
    linkedin_url,
    official_email_address,
    person_name,
    official_contact_number,
    status,
  } = request.body;


  const pass = Math.floor(10000000 + Math.random() * 90000000)
    .toString()
    .substring(0, 8);

  const hashedPassword = await bcrypt.hash(pass, 12);
  const userObj = new User({
    email: official_email_address,
    name: person_name,
    password: hashedPassword,
    userType: 'employer'
  });

  const user = await userObj.save();
  const userId = user._id;

  const employerObj = new Employer({
    company_name,
    gst_number,
    location,
    linkedin_url,
    official_email_address,
    person_name,
    official_contact_number,
    status,
    userId
  });


  try {
    await employerObj.save();
    request.flash('success', 'Employer added successfully');
    response.redirect(
      `${response.locals.base}admin/employer/${response.getLocale()}`,
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
const employerUpdate = async (request, response, next) => {
  const { id } = request.params;

  const newData = request.body; // Assuming you're sending the updated data in the request body

  try {
    // Find the document by ID and update it
    const updatedEmployer = await Employer.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (updatedEmployer) {
      request.flash('success', 'Employer updated successfully');
    } else {
      request.flash('error', 'Employer not found!');
    }
  } catch (error) {
    request.flash('error', error.message);
  }
  response.redirect(
    `${response.locals.base}admin/employer/${response.getLocale()}`,
  );
};

module.exports = {
  employerList,
  employerSave,
  loadAddEmployer,
  loadEditEmployer,
  employerUpdate,
};
