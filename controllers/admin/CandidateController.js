const mongoose = require("mongoose");
const candidateSchema = require("../../schemas/candidateSchema");
const Candidate = new mongoose.model("Candidate", candidateSchema);
const bcrypt = require("bcrypt");
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
  const candidates = await Candidate.find();
  console.log(candidates);

  response.render("../views/pages/admin/candidates/list", {
    title: "Candidates List",
    menuType: "admin",
    name: "candidates",
    candidates: candidates,
    successMessages: request.flash("success"),
    errorMessages: request.flash("error"),
  });
};





/**
 * show register page
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const addCandidate = (request, response, next) => {
  response.render("../views/pages/admin/candidates/add", {
    title: "Add Candidate",
    name: "candidates",
    menuType: "admin",
    layout: "../views/layout/app.ejs",
    successMessages: request.flash("success"),
    errorMessages: request.flash("error"),
    input: []
  });
};

const storeCandidate = async (request, response, next) => {
  let pass = Math.floor(10000000 + Math.random() * 90000000).toString().substring(0, 8);

  let hashedPassword = await bcrypt.hash(pass, 12);
  let candidateInfos = {
    name: request.body.name,
    email: request.body.email,
    phone: request.body.phone,
    password: hashedPassword,
    age: request.body.age,
    gender: request.body.gender,
    job_title: request.body.job_title,
    current_location: request.body.current_location,
    monthly_expected_salary: request.body.monthly_expected_salary,
    resume: request.file.filename,
    resume_path: request.file.path
  };

  try {
    const candidate = new Candidate(candidateInfos);
    await candidate.save();
    request.flash("success", "Candidate added successfully");
    response.redirect(
      `${response.locals.base}admin/candidates/${response.getLocale()}`
    );
  } catch (error) {
    console.log(error.errors);

    response.render('../views/pages/admin/candidates/add', {
      title: 'Create New Candidate',
      name: 'candidates',
      menuType: 'admin',
      errors: error.errors,
      input: []
    });
  }
};


const editCandidate = async (request, response, next) => {
  const { id } = request.params;
  await Candidate.findById({ _id: id }).then((data) => {
    console.log(data)
    response.render('../views/pages/admin/candidates/edit', {
      title: 'Edit Candidate',
      name: 'candidates',
      menuType: 'admin',
      data: data
    })
  }).catch(error => console.log(error))
}

const updateCandidate = async (request, response, next) => {
  const { id } = request.params;

  const newData = request.body;
  if (request.file) {
    newData.resume = request.file.filename;
    newData.resume_path = request.file.path;
  }
  try {
    const updateCandidate = await Candidate.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (updateCandidate) {
      console.log("success")
      request.flash("success", "Candidate updated successfully");
    } else {
      request.flash("error", "Candidate not found!");
    }
    response.redirect(
      `${response.locals.base}admin/candidates/${response.getLocale()}`
    );
  } catch (error) {
    console.log(error.errors);

    response.render('../views/pages/admin/candidates/add', {
      title: 'Create New Candidate',
      name: 'candidates',
      menuType: 'admin',
      errors: error.errors,
      input: []
    });
  }
};

module.exports = {
  candidatesList,
  addCandidate,
  storeCandidate,
  editCandidate,
  updateCandidate
};
