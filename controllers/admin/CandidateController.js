const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const User = new mongoose.model("users", userSchema);

/**
 * Show candidate list 
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const candidatesList = async (request, response, next) => {
  const users = await User.find({ userType: "candidate" });

  response.render("../views/pages/admin/candidates/list", {
    title: "Candidates List",
    menuType: "admin",
    name: "candidates-list",
    data: users,
  });
};

module.exports = {
  candidatesList,
};
