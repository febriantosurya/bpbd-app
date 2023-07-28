const multer = require("multer");
const fs = require('fs');
const path = require("path");
require('dotenv').config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = `${process.env.PATH_IMAGE_FOLDER}/${req.body.tanggal}-${req.body.desa}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    };
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().replace(/:/g, "-");
    const filename = `${date}-dokumentasi${path.extname(file.originalname)}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

module.exports = upload;