const CustomError = require("../entity/customError");
const referenceService = require("../services/referenceService");
const process = require("process");
const { exec } = require("child_process");

const getListReferencesController = async (req, res) => {
  try {
    const userId = req.user.id;
    const references = await referenceService.getListReferences(userId);
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

const uploadReferenceFileController = async (req, res) => {
  try {
    const { folderName, referenceName, definition, author, version, link, status, referencePath, userId, require } =
      req.body;
    exec(
      `chown -R ${process.env.UID}:${process.env.UID} ${referencePath} && chmod -R 775 ${referencePath}`,
      async (error, stdout, stderr) => {
        if (error) {
          throw new CustomError({ message: error.message }, 400);
        }
        if (stderr) {
          throw new CustomError({ message: error.message }, 400);
        }
        const newReference = referenceService.createReference({
          folderName,
          referenceName,
          definition,
          author,
          version,
          link,
          status,
          referencePath,
          userId,
          require
        });
        if (newReference) {
          return res.status(200).json({ message: "create new reference successfull" });
        } else {
          throw new CustomError({ message: error.message }, 400);
        }
      }
    );
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getListReferencesController, uploadReferenceFileController };
