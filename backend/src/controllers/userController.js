const userServices = require("../services/userServices");
const { validationResult } = require("express-validator");
const CustomError = require("../entity/customError");
const jwtVariable = require("../utils/jwt");
const process = require("process");
const authMethods = require("../utils/authMethods");
const randToken = require("rand-token");
const workspace = require("../utils/workspace");
const workspaceService = require("../services/workspaceService");
const db = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const passwordResetService = require("../services/resetPasswordService");
const htmlEmailToResetPassword = require("../views/forgot-password");
const sendEmailService = require("../config/nodemailer");

const createUserController = async (req, res) => {
  try {
    const errors = validationResult(req);
    let errorsInfor = "";
    if (!errors.isEmpty) {
      errors.array().forEach((e) => {
        errorsInfor += e.param + " " + e.msg + "\n";
      });
      throw new CustomError("Validate Error", 400);
    }
    const { firstName, lastName, userName, password, email } = req.body;
    const existUser = await userServices.getUserAccount({ email, userName });
    if (existUser.count != 0) {
      throw new CustomError("Exist User", 400);
    } else {
      const createUserComplete = await userServices.createUser({ firstName, lastName, userName, password, email });
      await workspace.createWorkspace(userName);
      if (createUserComplete) {
        await workspaceService.createWorkspace({
          workspaceName: workspace.formatWorkspaceName(userName),
          userId: createUserComplete.id
        });
        return res.status(200).json({ message: "Create User Successfull" });
      }
    }
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.getUserAccountByEmail(email);
    if (!user) {
      throw new CustomError("User Not Found", 400);
    }
    if (password != user.password) {
      throw new CustomError("Password is incorrect", 400);
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
    const dataForAccessToken = {
      email: user.email,
      username: user.userName,
      id: user.id
    };

    const accessToken = await authMethods.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
    if (!accessToken) {
      throw new CustomError("Login Faild", 400);
    }
    let newRefreshToken = randToken.generate(jwtVariable.refreshTokenSize);
    if (!user.refreshToken) {
      await userServices.updateUserByEmail(user.email, { refreshToken: newRefreshToken });
    } else {
      newRefreshToken = user.refreshToken;
    }
    const options = {
      maxAge: 5 * 1000 * 3600,
      expires: new Date(Date.now() + 5 * 1000 * 3600),
      httpOnly: true,
      secure: true
    };
    res.cookie("SessionID", accessToken, options);
    return res.status(200).json({
      message: "LoginSuccess",
      data: {
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        role: user.role,
        accessToken,
        newRefreshToken
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getAccountController = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  try {
    const user = await userServices.getUserAccountByToken(refreshToken);
    if (!user) {
      throw new CustomError("User Not Found", 400);
    }
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
    const dataForAccessToken = {
      email: user.email,
      username: user.userName,
      id: user.id
    };

    const accessToken = await authMethods.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
    if (!accessToken) {
      throw new CustomError("Login Faild", 400);
    }
    return res.status(200).json({
      message: "LoginSuccess",
      data: {
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        role: user.role,
        accessToken
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const userLogout = async (req, res) => {
  const user = req.user;
  const accessToken = req.accessToken;
  try {
    const newBlacklist = await db.Blacklist.create({
      userId: user.id,
      token: accessToken
    });
    if (newBlacklist) {
      return res.status(200).json({ message: "You are logged out!" });
    }
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const sendEmailForgot = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await userServices.getUserAccountByEmail(email);
    if (!user) {
      throw new CustomError("User Not Found", 400);
    }
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const newPasswordReset = await passwordResetService.createPasswordReset({
      userId: user.id,
      token,
      expiresAt,
      used: false
    });
    if (!newPasswordReset) {
      throw new CustomError("Password Reset Not Found", 400);
    }
    const htmlContent = htmlEmailToResetPassword.generateResetPasswordEmail(
      user.userName,
      `${process.env.FRONTEND_URL}/reset-password/${token}`
    );
    const mailOptions = {
      ...sendEmailService.mailOptionsTemplate,
      to: [user.email],
      subject: "Reset Your NextPhylo Password",
      html: htmlContent
    };

    sendEmailService.sendEmail(mailOptions);

    return res.status(200).json({
      message: "Reset token generated successfully."
    });
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const checkTokenResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const resetRecord = await passwordResetService.checkTokenDuration(token);
    if (!resetRecord) {
      throw new CustomError("Invalid token or token has expired.", 400);
    }
    return res.status(200).json({ message: "Token is valid.", data: { userId: resetRecord.userId } });
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const errors = validationResult(req);
    let errorsInfor = "";
    if (!errors.isEmpty) {
      errors.array().forEach((e) => {
        errorsInfor += e.param + " " + e.msg + "\n";
      });
      throw new CustomError("Validate Error", 400);
    }
    const { userId, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      throw new CustomError("Passwords do not match");
    }
    const userUpdate = await userServices.updateUserById(userId, { password: newPassword });
    if (userUpdate) {
      const closeTokenResetPassword = await passwordResetService.closeToken(token);
      if (closeTokenResetPassword) {
        const htmlContent = htmlEmailToResetPassword.resetPasswordComplete(userUpdate.userName);
        const mailOptions = {
          ...sendEmailService.mailOptionsTemplate,
          to: [userUpdate.email],
          subject: "Your NextPhylo Password Has Been Changed",
          html: htmlContent
        };

        sendEmailService.sendEmail(mailOptions);
        res.status(200).json({ message: "update successfull" });
      }
    }
  } catch (error) {
    if (error instanceof CustomError) {
      process.env.NODE_ENV == "development" ? console.log(error) : null;
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createUserController,
  userLoginController,
  getAccountController,
  userLogout,
  sendEmailForgot,
  checkTokenResetPassword,
  resetPassword
};
