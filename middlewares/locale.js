// set locale though middleware
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:20:12 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const localized = (request, response, next) => {
  if (request.params.language) {
    request.setLocale(request.params.language);
  }
  next();
};

// store active locale globally
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:20:12 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const activeLocale = (request, response, next) => {
  response.locals.locale = response.getLocale();
  next();
};

// expose current route without locale
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:20:12 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const currentRoute = (request, response, next) => {
  response.locals.currentRoute = request.originalUrl
    .split('/')
    .slice(0, -1)
    .join('/')
    .toString();
  next();
};

module.exports = {
  localized,
  activeLocale,
  currentRoute,
};
