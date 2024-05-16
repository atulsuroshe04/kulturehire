// check if the user is authenticated
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:20:12 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const isAuthenticated = (request, response, next) => {
  if (!request.session.user) {
    return response.redirect(response.locals.base);
  }
  next();
};

// check if the user is guest
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:20:12 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const isGuest = (request, response, next) => {
  if (request.session.user) {
    return response.redirect(
      `${response.locals.base}${response.locals.session.userType}/dashboard/${response.getLocale()}`,
    );
  }
  next();
};

module.exports = {
  isAuthenticated,
  isGuest,
};
