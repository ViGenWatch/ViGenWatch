const multer = require("multer");
const path = require("path");
const fs = require("fs");
const workspace = require("./workspace");
const CustomError = require("../entity/customError");
const executionService = require("../services/executionService");
const execution = require("../utils/execution");

const uploadPath = (userName) => {
  if (userName) {
    return path.resolve(__dirname, `../../upload/${userName}`);
  }
  return path.resolve(__dirname, "../../upload/");
};

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const { userName, userId } = req.body;
    const workspaceName = workspace.formatWorkspaceName(userName);
    const workspacePath = uploadPath(workspaceName);
    const executionNumber = await executionService.getNextExecutionNumber(userId);
    const executionName = execution.formatWorkspaceName(executionNumber);
    const executionPath = path.join(workspacePath, executionName);
    req.body.workspaceName = workspaceName;
    req.body.executionNumber = executionNumber;
    req.body.executionName = executionName;
    req.body.executionPath = executionPath;
    if (!fs.existsSync(executionPath)) {
      fs.mkdirSync(executionPath, { recursive: true });
    }
    cb(null, executionPath);
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
