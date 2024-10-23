const CustomError = require("../entity/customError");
const referenceService = require("../services/referenceService");
const process = require("process");

const getListReferencesController = async (req, res) => {
  try {
    const references = await referenceService.getListReferences();
    if (!references) {
      throw new CustomError("Get Reference Not Found", 500);
    }
    return res.status(200).json({
      message: "get list references successfull",
      data: references
    });
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getListReferencesController };
