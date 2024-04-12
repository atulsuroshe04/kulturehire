// blank page
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:49 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const blank = (request, response, next) => {
  response.render("../views/pages/blank/blank", {
    title: "Blank",
    name: "blank",
  });
};

module.exports = {
  blank,
};
