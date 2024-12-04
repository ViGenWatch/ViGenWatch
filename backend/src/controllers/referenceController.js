const CustomError = require("../entity/customError");
const referenceService = require("../services/referenceService");
const referenceFileService = require("../services/referenceFileService");
const process = require("process");
const { exec } = require("child_process");
const path = require("path");
const executionHelper = require("../utils/execution");
const referenceStorage = require("../utils/referenceStorage");
const userServices = require("../services/userServices");
const sendEmailService = require("../config/nodemailer");
const htmlEmailConfirmReference = require("../views/confirm-reference");

const deleteReference = async (req, res) => {
  try {
    const referenceId = req.params.referenceId;
    const reference = await referenceService.getReferenceById(referenceId);
    if (reference) {
      await referenceService.deleteReferenceManually(referenceId);
      referenceStorage.deleteFolderReference(reference.referencePath);
      return res.status(200).json({ message: "Reference deleted successfully" });
    }
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

//role user 0x01
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

    const { auspiceConfig, colors, droppedTrains, latLongs, virusOutgroup } = req.body;
    exec(
      `chown -R ${process.env.UID}:${process.env.UID} ${referencePath} && chmod -R 775 ${referencePath}`,
      async (error, stdout, stderr) => {
        if (error) {
          throw new CustomError({ message: error.message }, 400);
        }
        if (stderr) {
          throw new CustomError({ message: error.message }, 400);
        }
        const newReference = await referenceService.createReference({
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

        const newReferenceFile = await referenceFileService.createReferenceFile({
          auspiceConfig,
          colors,
          droppedTrains,
          latLongs,
          virusOutgroup,
          referenceId: newReference.id
        });
        if (newReference && newReferenceFile) {
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

const getContentFileReference = async (req, res) => {
  try {
    const referenceId = req.query.referenceId;
    const fileName = req.query.fileName;
    const reference = await referenceService.getReferenceById(referenceId);
    const filePath = path.join(reference.referencePath, fileName);
    await executionHelper.getContentFile(filePath, res);
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const onDownloadFileReference = async (req, res) => {
  try {
    const referenceId = req.query.referenceId;
    const fileName = req.query.fileName;
    const reference = await referenceService.getReferenceById(referenceId);
    const filePath = path.join(reference.referencePath, fileName);
    await executionHelper.onDownloadFile(filePath, res);
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const updateReferenceControllder = async (req, res) => {
  try {
    const referenceId = req.params.referenceId;
    const data = req.body;
    const { userId } = req.body;
    const newReference = await referenceService.updateReferenceById(referenceId, data);
    if (newReference) {
      if (userId) {
        const user = await userServices.getUserAccountById(userId);
        const reference = await referenceService.getReferenceById(referenceId);
        if (user && reference) {
          const htmlContent =
            data.status === 1
              ? htmlEmailConfirmReference.approvePublicReferenceEmail(user.userName, reference.referenceName)
              : htmlEmailConfirmReference.closeReferenceEmail(user.userName, reference.referenceName);
          const mailOptions = {
            ...sendEmailService.mailOptionsTemplate,
            to: [user.email],
            subject: "Reference Sharing Confirmation",
            html: htmlContent
          };
          sendEmailService.sendEmail(mailOptions);
        }
      }
      res.status(200).json({ message: "update successfull" });
    }
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

//role user 0x02
const getListReferencesRoleAuthorityController = async (req, res) => {
  try {
    const references = await referenceService.getListReferencesRoleAuthority();
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

module.exports = {
  getListReferencesController,
  uploadReferenceFileController,
  getContentFileReference,
  onDownloadFileReference,
  updateReferenceControllder,
  getListReferencesRoleAuthorityController,
  deleteReference
};
