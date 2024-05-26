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
  response.locals.session = request.session.user ? request.session.user : '';
  response.locals.maskNumber = maskNumber;
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

const maskNumber = (number) => {
  const numberStr = number.toString();
  const unmaskedLength = 5; // Number of digits to leave unmasked
  const maskedSection = numberStr.slice(0, -unmaskedLength).replace(/\d/g, '*');
  const unmaskedSection = numberStr.slice(-unmaskedLength);
  return maskedSection + unmaskedSection;
}

module.exports = {
  globalSession,
  errorMessage,
};
