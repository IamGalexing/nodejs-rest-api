const multer = require("multer");
const path = require("path");
require("dotenv").config();

const { TEMP_DIR } = process.env;
const TEMP_FOLDER = path.join(process.cwd(), TEMP_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_FOLDER);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2000000,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

module.exports = upload;
