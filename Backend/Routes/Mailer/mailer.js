const express = require("express");
const path = require('path');
const multer = require('multer');
const { mailer } = require("../../Controllers/Mailer/mailer");
const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, req.body.email+"-"+file.fieldname + '-' + Date.now() + ext);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.py', '.c', '.cpp', '.java']; // Add more if needed
    const ext = path.extname(file.originalname);
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only .py, .c, .cpp, .java files are allowed.'));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/send", upload.array('files', 10), mailer);


module.exports = router;