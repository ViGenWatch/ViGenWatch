const multer = require("multer");
const path = require("path");
const fs = require("fs");

const referencePath = (folerName) => {
  return path.resolve(__dirname, `../../upload/config/${folerName}`);
};

const referenceStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const { folderName } = req.body;
    const _referencePath = referencePath(folderName);
    req.body.referencePath = _referencePath;
    if (!fs.existsSync(_referencePath)) {
      fs.mkdirSync(_referencePath, { recursive: true });
    }
    cb(null, _referencePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadReferenceFile = multer({
  storage: referenceStorage,
  fileFilter: (req, file, cb) => {
    const validFormats = [".txt", ".tsv", ".gb", ".json"];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!validFormats.includes(fileExtension)) {
      return cb(new Error("Invalid file format! Please upload a .fasta or .tsv file.", 400), false);
    }
    cb(null, true);
  }
});

const deleteFolderReference = (directoryPath) => {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, index) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
};

module.exports = { uploadReferenceFile, referencePath, deleteFolderReference };
