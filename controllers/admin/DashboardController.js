// blank page
/**
 *Show admin dashboard
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const adminDashboard = (request, response, next) => {
  response.render("../views/pages/admin/dashboard", {
    title: "Admin Dashboard",
    menuType: "admin",
    name: "admin-dashboard",
  });
};

module.exports = {
  adminDashboard,
};
