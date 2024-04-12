// blank page
/**
 * Load candidate dashboard page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const candidateDashboard = (request, response, next) => {
  response.render("../views/pages/candidate/dashboard", {
    title: "Candidate Dashboard",
    name: "candidate-dashboard",
    menuType: "candidate",
    name: "candidate-dashboard",
  });
};

module.exports = {
  candidateDashboard,
};
