const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure this line is at the top

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address from .env file
        pass: process.env.EMAIL_PASS  // Your email password from .env file
    }
});

/**
 * Sends an email.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} text - Plain text body.
 * @param {string} html - HTML body.
 * @returns {Promise} - Resolves if email is sent successfully, rejects otherwise.
 */
function sendEmail(to, subject, text, html) {
    const mailOptions = {
        from: `"KultureHire" <${process.env.EMAIL_USER}>`, // Sender address
        to, // List of recipients
        subject, // Subject line
        text, // Plain text body
        html // HTML body
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    });
}

module.exports = { sendEmail };