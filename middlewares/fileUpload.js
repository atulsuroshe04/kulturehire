/**
 * ${1:Description placeholder}
 *
 * @type {*}
 */
const multer = require('multer');
/**
 * ${1:Description placeholder}
 *
 * @type {*}
 */
const fs = require('fs');

// Define multer storage configuration
/**
 * ${1:Description placeholder}
 *
 * @type {*}
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const directory = 'public/resumes';
    // Create the directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, directory);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

// Define multer file filter
// Define multer file filter
/**
 * ${1:Description placeholder}
 *
 * @param {*} req
 * @param {*} file
 * @param {*} cb
 * @returns {*}
 */
const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
    return cb(new Error('Only document files are allowed'));
  }
  cb(null, true);
};

// Create multer instance with storage and fileFilter configuration
/**
 * ${1:Description placeholder}
 *
 * @type {*}
 */
const upload = multer({
  storage,
  fileFilter,
});
// Middleware for handling file upload
/**
 * ${1:Description placeholder}
 *
 * @type {*}
 */
const uploadFile = upload.single('resume');

module.exports = {
  uploadFile,
};
