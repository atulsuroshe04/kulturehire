const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

/**
 * show register page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const register = (request, response, next) => {
  response.render("../views/auth/register", {
    title: "Register",
    name: "register",
    layout: "../views/auth/auth_layout.ejs",
  });
};

/**
 * Save signup form data
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const signup = async (request, response, next) => {
  const userInfo = {
    name: request.body.name,
    email: request.body.email,
  };
  let hashedPassword = "";
  if (request.body.password !== "") {
    hashedPassword = await bcrypt.hash(request.body.password, 12);
  }
  const user = new User({ ...userInfo, password: hashedPassword });
  await user
    .save()
    .then(() => {
      request.session.user = userInfo;
      request.session.save();
      response.redirect(
        `${response.locals.base}dashboard/${response.getLocale()}`,
      );
    })
    .catch((error) => {
      response.render("../views/auth/register", {
        title: "Register",
        name: "register",
        layout: "../views/auth/auth_layout.ejs",
        errors: error.errors,
        input: {
          name: request.body.name,
          email: request.body.email,
          password: request.body.password,
        },
      });
    });
};

/**
 *Load login page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const login = (request, response, next) => {
  response.render("../views/auth/login", {
    title: "Login",
    name: "login",
    layout: "../views/auth/auth_layout.ejs",
  });
};

/**
 *Authenticate user
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const authenticate = async (request, response, next) => {
  const { email } = request.body;
  const { password } = request.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    request.session.errorMessage = "Email doesn't belong to any account !";
    response.redirect(response.locals.base);
  } else {
    const matchPassword = await bcrypt.compare(password, findUser.password);
    if (findUser && matchPassword) {
      const userInfo = {
        _id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        userType: findUser.userType,
      };
      request.session.user = userInfo;
      request.session.save();
      response.redirect(
        `${response.locals.base + userInfo.userType}/dashboard/${response.getLocale()}`,
      );
    } else {
      request.session.errorMessage = "Wrong Credentials !";
      response.redirect(response.locals.base);
    }
  }
};


/**
 * sign out user
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const signOut = (request, response, next) => {
  request.session.destroy();
  return response.redirect(response.locals.base);
};

/**
 * Load password reset page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const passwordReset = (request, response, next) => {
  response.render("../views/auth/password_reset", {
    title: "Password Reset",
    name: "password_reset",
    layout: "../views/auth/auth_layout.ejs",
  });
};

module.exports = {
  register,
  signup,
  login,
  passwordReset,
  authenticate,
  signOut,
};
