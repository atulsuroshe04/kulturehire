const mongoose = require("mongoose");
const UserSchema = require('../../schemas/userSchema');
const User = new mongoose.model("user", UserSchema);

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
    const currentUser = await User.findOne({ _id: request.session.user._id });
    let currentUserData;

    if (currentUser) {
        const { password, ...userData } = currentUser.toObject();
        currentUserData = userData;
    } else {
        console.log("User not found");
    }

    console.log(currentUserData);
    response.render("../views/pages/candidate/profile", {
        title: "Candidate Profile",
        name: "candidate-profile",
        menuType: "candidate",
        name: "candidate-profile",
        data: currentUserData
    });
};

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
        console.log("User not found");
    }

    response.render("../views/pages/candidate/profile-update", {
        title: "Candidate Profile",
        name: "candidate-profile",
        menuType: "candidate",
        name: "candidate-profile",
        data: currentUserData
    });
};

module.exports = {
    loadProfile,
    loadProfileUpdate
};
