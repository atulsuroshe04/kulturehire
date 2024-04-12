// blank page
/**
 * Load eployer dashbard page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const employerDashboard = (request, response, next) => {
  response.render("../views/pages/employer/dashboard", {
    title: "employer Dashboard",
    name: "employer-dashboard",
    menuType: "employer",
    name: "employer-dashboard",
  });
};

module.exports = {
  employerDashboard,
};
