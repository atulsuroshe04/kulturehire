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
    const candidate = req.body.candidate_id;
    const directory = `public/simulations/${candidate}`;
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
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const uploadFiles = (req, res, next) => {
  const step = req.query.step || 1;
  upload.fields([{ name: [`milestone${step}_file`], maxCount: 1 }])(
    req,
    res,
    (err) => {
      if (err instanceof multer.MulterError) {
        throw new Error(err.message);
      } else if (err) {
        throw new Error(err.message);
      }
      // Everything went fine.
      next();
    },
  );
};

module.exports = {
  uploadFiles,
};
