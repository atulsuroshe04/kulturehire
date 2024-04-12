// make session globally accessible
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:20:12 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const globalSession = (request, response, next) => {
  response.locals.session = request.session.user ? request.session.user : "";
  next();
};

// global error message
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:20:12 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const errorMessage = (request, response, next) => {
  response.locals.errorMessage = request.session.errorMessage;
  delete request.session.errorMessage;
  next();
};

module.exports = {
  globalSession,
  errorMessage,
};
