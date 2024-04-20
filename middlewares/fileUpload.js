const multer = require('multer');
const fs = require('fs');


// Define multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const directory = 'public/resumes';
        // Create the directory if it doesn't exist
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        cb(null, directory);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// Define multer file filter
// Define multer file filter
const fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
        return cb(new Error('Only document files are allowed'));
    }
    cb(null, true);
};

// Create multer instance with storage and fileFilter configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
// Middleware for handling file upload
const uploadFile = upload.single('resume');

module.exports = {
    uploadFile
}