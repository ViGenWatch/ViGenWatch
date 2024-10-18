const CustomError = require("../entity/customError");
const process = require("process");
const executionService = require("../services/executionService");
const uploadFileInput = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new CustomError("Please upload a file!", 400);
    }

    const newExecution = await executionService.createExecution({
      userId: req.body.userId,
      executionName: req.body.executionName,
      executionNumber: req.body.executionNumber
    });
    if (newExecution) {
      res.status(200).json({ message: "File uploaded successfully!" });
    }
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = uploadFileInput;
