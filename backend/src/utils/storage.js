const multer = require("multer");
const path = require("path");
const fs = require("fs");
const workspace = require("./workspace");
const CustomError = require("../entity/customError");
const executionService = require("../services/executionService");

const uploadPath = (userName) => {
  if (userName) {
    return path.resolve(__dirname, `../../upload/${userName}`);
  }
  return path.resolve(__dirname, "../../upload/");
};

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const workspaceName = workspace.formatWorkspaceName(req.body.userName);
    const executionNumber = await executionService.getNextExecutionNumber(req.body.userId);
    const executionName = `execution_${executionNumber}`;
    req.body.executionNumber = executionNumber;
    req.body.executionName = executionName;
    const uploadPath_ = uploadPath(`${workspaceName}/${executionName}`);
    if (!fs.existsSync(uploadPath_)) {
      fs.mkdirSync(uploadPath_, { recursive: true });
    }
    cb(null, uploadPath_);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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

module.exports = { upload, uploadPath };
