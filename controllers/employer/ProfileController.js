const mongoose = require('mongoose');
const UserSchema = require('../../schemas/candidateSchema');

const User = new mongoose.model('user', UserSchema);
const EmployerSchema = require('../../schemas/employerSchema');

const Employer = new mongoose.model('employer', EmployerSchema);
/**
 * Load employer profile page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const loadProfile = async (request, response, next) => {
  const currentUser = await Employer.findOne({ userId: request.session.user._id }).populate([
    "userId"]);
  let currentUserData;

  if (currentUser) {
    const { password, ...userData } = currentUser.toObject();
    currentUserData = userData;
  } else {
    console.log('User not found');
  }

  console.log(currentUserData);
  response.render('../views/pages/employer/profile', {
    title: 'Candidate Profile',
    name: 'candidate-profile',
    menuType: 'employer',
    name: 'employer-profile',
    data: currentUserData,
    successMessages: request.flash('success'),
    errorMessages: request.flash('error'),
  });
};

const updateProfile = async (request, response, next) => {
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
    `${response.locals.base}employer/profile/${response.getLocale()}`,
  );
}
/**
 * Load profile edit page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const loadProfileUpdate = async (request, response, next) => {
  const currentUser = await User.findOne({ _id: request.session.user._id });
  let currentUserData;

  if (currentUser) {
    const { password, ...userData } = currentUser.toObject();
    currentUserData = userData;
  } else {
    console.log('User not found');
  }

  response.render('../views/pages/candidate/profile-update', {
    title: 'Candidate Profile',
    name: 'candidate-profile',
    menuType: 'candidate',
    name: 'candidate-profile',
    data: currentUserData,
  });
};

module.exports = {
  loadProfile,
  loadProfileUpdate,
  updateProfile
};
