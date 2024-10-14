const multer = require("multer");
const path = require("path");
const fs = require("fs");
const CustomError = require("../utils/customError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(__dirname, "../../upload");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const validFormats = [".fasta", ".tsv"];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!validFormats.includes(fileExtension)) {
      return cb(new CustomError("Invalid file format! Please upload a .fasta or .tsv file.", 400), false);
    }
    cb(null, true);
  }
});

module.exports = upload;
