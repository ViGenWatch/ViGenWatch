const CustomError = require("../utils/customError");
const process = require("process");
const uploadFileInput = (req, res) => {
  try {
    if (!req.file) {
      throw new CustomError("Please upload a file!", 400);
    }
    const validFormats = [".fasta", ".tsv"];
    const fileExtension = req.file.originalname.split(".").pop();
    if (!validFormats.includes(`.${fileExtension}`)) {
      throw new CustomError("Invalid file format! Please upload a .fasta or .tsv file.", 400);
    }
    res.status(200).json({ message: "File uploaded successfully!" });
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = uploadFileInput;
