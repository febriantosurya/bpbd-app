const multer = require("multer");
const fs = require('fs');
const path = require("path");
require('dotenv').config();

const folderImage = `${process.env.PATH_IMAGE_FOLDER}\\images`
if (!fs.existsSync(folderImage)) {
  fs.mkdirSync(folderImage);
};

const storage = multer.diskStorage({ 
  destination: (req, file, cb) => {
    const directory = `${folderImage}/${req.body.tanggal}-${req.body.desa}`;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory)
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