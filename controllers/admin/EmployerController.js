const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { sendEmail } = require('../../utils/mailer');

const employerSchema = require('../../schemas/employerSchema');

const Employer = new mongoose.model('Employers', employerSchema);

const userSchema = require('../../schemas/userSchema');
const User = new mongoose.model('User', userSchema);

// Show softskills listing page
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const employerList = async (request, response, next) => {
  const data = await Employer.find();

  response.render('../views/pages/admin/employers/list', {
    title: 'Employers List',
    name: 'employers',
    menuType: 'admin',
    layout: '../views/layout/app.ejs',
    successMessages: request.flash('success'),
    errorMessages: request.flash('error'),
    data,
  });
};

// Show add soft skill page
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @param {*} request
 * @param {*} response
 */
const loadAddEmployer = (request, response) => {
  response.render('../views/pages/admin/employers/add', {
    title: 'Employer Add',
    name: 'employers',
    menuType: 'admin',
    layout: '../views/layout/app.ejs',
    input: [],
  });
};

// Show add soft skill page
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @returns {*}
 */
const loadEditEmployer = async (request, response) => {
  const { id } = request.params;
  const data = await Employer.find({ _id: id });
  response.render('../views/pages/admin/employers/edit', {
    title: 'Employer Edit',
    name: 'employers',
    menuType: 'admin',
    layout: '../views/layout/app.ejs',
    data: data[0],
  });
};

// Save softskills listing page
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const employerSave = async (request, response, next) => {
  const {
    company_name,
    gst_number,
    location,
    linkedin_url,
    official_email_address,
    person_name,
    official_contact_number,
    status,
    send_email
  } = request.body;

  try {
    const pass = Math.floor(10000000 + Math.random() * 90000000)
      .toString()
      .substring(0, 8);

    const hashedPassword = await bcrypt.hash(pass, 12);
    const userObj = new User({
      email: official_email_address,
      name: person_name,
      password: hashedPassword,
      userType: 'employer'
    });

    const user = await userObj.save();
    const userId = user._id;

    const employerObj = new Employer({
      company_name,
      gst_number,
      location,
      linkedin_url,
      official_email_address,
      person_name,
      official_contact_number,
      status,
      userId
    });



    await employerObj.save();
    request.flash('success', 'Employer added successfully');
    if (send_email) {
      await sendEmail(official_email_address, "Login details on KultureHire Feedback Engine", "Welcome to KultureHire. Below are the lgin details <br>Username - " + official_email_address + "<br>Password - " + pass, emailTemplate({ person_name, official_email_address, pass }));
    }
    response.redirect(
      `${response.locals.base}admin/employer/${response.getLocale()}`,
    );
  } catch (error) {
    request.flash('error', error.message);
    response.status(500).json({ message: error.message }); // Handle error
  }
};

// Update softskills listing page
/**
 * ${1:Description placeholder}
 * @date 4/12/2024 - 5:19:50 PM
 *
 * @async
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns {*}
 */
const employerUpdate = async (request, response, next) => {
  const { id } = request.params;

  const newData = request.body; // Assuming you're sending the updated data in the request body

  try {
    // Find the document by ID and update it
    const updatedEmployer = await Employer.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (updatedEmployer) {
      request.flash('success', 'Employer updated successfully');
    } else {
      request.flash('error', 'Employer not found!');
    }
  } catch (error) {
    request.flash('error', error.message);
  }
  response.redirect(
    `${response.locals.base}admin/employer/${response.getLocale()}`,
  );
};

const emailTemplate = (data) => {
  return `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
	<tbody>
		<tr>
			<td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px">
					<tbody>
						<tr>
							<td align="center" valign="top">
								<table border="0" cellpadding="0" cellspacing="0" width="100%">
									<tbody>
										<tr>
											<td style="padding-top: 20px; padding-bottom: 20px; padding-right: 0px;" align="right" valign="middle" class="webview"> <a href="#" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:right;text-decoration:underline;padding:0;margin:0" target="_blank" class="text hideOnMobile">Oh wait, there's more! →</a>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
				<table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
					<tbody>
						<tr>
							<td align="center" valign="top">
								<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
									<tbody>
										<tr>
											<td style="background-color:#004AAD;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
										</tr>
										<tr>
											<td style="padding-top: 60px; padding-bottom: 20px;" align="center" valign="middle" class="emailLogo">
												<a href="#" style="text-decoration:none" target="_blank">
													<img alt="" border="0" src="https://fe.kulturehire.com/img/kh_logo.png" style="width:100%;max-width:150px;height:auto;display:block" width="150">
												</a>
											</td>
										</tr>
										<tr>
											<td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
												<h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Hi `+ data.person_name + `</h2>
											</td>
										</tr>
										<tr>
											<td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
												<h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">Verify Your Email Account</h4>
											</td>
										</tr>
										<tr>
											<td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
												<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
													<tbody>
														<tr>
															<td style="padding-bottom: 20px;" align="center" valign="top" class="description">
																<p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Thanks for showing interest in kulturehire simulation platform. Following are you login details. Please click the button to access the site.</p>
															</td>
														</tr>
                            <tr>
															<td style="padding-bottom: 20px;" align="center" valign="top" class="description">
																<p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Username - `+ data.official_email_address + `</p>
															</td>
														</tr>
                            <tr>
															<td style="padding-bottom: 20px;" align="center" valign="top" class="description">
																<p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Password - `+ data.pass + `</p>
															</td>
														</tr>
													</tbody>
												</table>
												<table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style="">
													<tbody>
														<tr>
															<td style="padding-top:20px;padding-bottom:20px" align="center" valign="top">
																<table border="0" cellpadding="0" cellspacing="0" align="center">
																	<tbody>
																		<tr>
																			<td style="background-color: #004AAD; padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href="https://fe.kulturehire.com/" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text">Login</a>
																			</td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
										</tr>
									</tbody>
								</table>
								<table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
									<tbody>
										<tr>
											<td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
				<table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:600px">
					<tbody>
						<tr>
							<td align="center" valign="top">
								<table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
									<tbody>
										<tr>
											<td style="padding: 10px 10px 5px;" align="center" valign="top" class="brandInfo">
												<p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">©&nbsp;KultureHire.</p>
											</td>
										</tr>
										<tr>
											<td style="padding: 0px 10px 10px;" align="center" valign="top" class="footerEmailInfo">
												<p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">If you have any quetions please reply to this email.</a>
											</td>
										</tr>
										<tr>
											<td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>`
}

module.exports = {
  employerList,
  employerSave,
  loadAddEmployer,
  loadEditEmployer,
  employerUpdate,
};
