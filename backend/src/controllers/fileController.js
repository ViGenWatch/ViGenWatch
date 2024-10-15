const CustomError = require("../utils/customError");
const process = require("process");
const uploadFileInput = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new CustomError("Please upload a file!", 400);
    }
    const validFormats = [".fasta", ".tsv"];
    for (const file in req.files) {
      const fileExtension = file.originalname.split(".").pop();
      if (!validFormats.includes(`.${fileExtension}`)) {
        throw new CustomError("Invalid file format! Please upload a .fasta or .tsv file.", 400);
      }
    }
    res.status(200).json({ message: "File uploaded successfully!" });
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = uploadFileInput;
