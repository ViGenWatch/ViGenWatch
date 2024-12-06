const userServices = require("../services/userServices");
const { validationResult } = require("express-validator");
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
const bcrypt = require("bcrypt");

const createUserController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    let errorsInfor = "";
    if (!errors.isEmpty) {
      errors.array().forEach((e) => {
        errorsInfor += e.param + " " + e.msg + "\n";
      });
      throw new Error("Validate Error", 400);
    }
    const { firstName, lastName, userName, password, repassword, email, role } = req.body;
    if (password !== repassword) {
      throw new Error("Password and RePassword not true", 400);
    }
    const existUser = await userServices.getUserAccount({ email, userName });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (existUser.count != 0) {
      throw new Error("Exist User", 400);
    } else {
      const createUserComplete = await userServices.createUser({
        firstName,
        lastName,
        userName,
        password: hashedPassword,
        email,
        role
      });
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
    next(error);
  }
};

const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.getUserAccountByEmail(email);
    if (!user) {
      throw new Error("User Not Found", 400);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password is incorrect", 400);
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
      throw new Error("Login Faild", 400);
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
    next(error);
  }
};

const getAccountController = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  try {
    const user = await userServices.getUserAccountByToken(refreshToken);
    if (!user) {
      throw new Error("User Not Found", 400);
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
      throw new Error("Login Faild", 400);
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
    next(error);
  }
};

const userLogout = async (req, res, next) => {
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
    next(error);
  }
};

const sendEmailForgot = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await userServices.getUserAccountByEmail(email);
    if (!user) {
      throw new Error("User Not Found", 400);
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
      throw new Error("Password Reset Not Found", 400);
    }
    const htmlContent = htmlEmailToResetPassword.generateResetPasswordEmail(
      user.userName,
      `${process.env.NODE_ENV === "development" ? process.env.FRONTEND_URL : process.env.URL_HOST}/reset-password/${token}`
    );
    const mailOptions = {
      ...sendEmailService.mailOptionsTemplate,
      to: [user.email],
      subject: "Reset Your ViGenWatch Password",
      html: htmlContent
    };

    sendEmailService.sendEmail(mailOptions);

    return res.status(200).json({
      message: "Reset token generated successfully."
    });
  } catch (error) {
    next(error);
  }
};

const checkTokenResetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const resetRecord = await passwordResetService.checkTokenDuration(token);
    if (!resetRecord) {
      throw new Error("Invalid token or token has expired.", 400);
    }
    return res.status(200).json({ message: "Token is valid.", data: { userId: resetRecord.userId } });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const errors = validationResult(req);
    let errorsInfor = "";
    if (!errors.isEmpty) {
      errors.array().forEach((e) => {
        errorsInfor += e.param + " " + e.msg + "\n";
      });
      throw new Error("Validate Error", 400);
    }
    const { userId, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const userUpdate = await userServices.updateUserById(userId, { password: hashedPassword });
    if (userUpdate) {
      const closeTokenResetPassword = await passwordResetService.closeToken(token);
      if (closeTokenResetPassword) {
        const htmlContent = htmlEmailToResetPassword.resetPasswordComplete(userUpdate.userName);
        const mailOptions = {
          ...sendEmailService.mailOptionsTemplate,
          to: [userUpdate.email],
          subject: "Your ViGenWatch Password Has Been Changed",
          html: htmlContent
        };

        sendEmailService.sendEmail(mailOptions);
        res.status(200).json({ message: "update successfull" });
      }
    }
  } catch (error) {
    next(error);
  }
};

const updateInforUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = user;
    const data = req.body;
    const update = await userServices.updateInforUserById(id, data);
    if (update) {
      const user = await userServices.getUserAccountById(id);
      res.status(200).json({
        message: "update successfull",
        data: {
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { prePassword, newPassword, newPasswordConfirm } = req.body;
    const { password, id } = req.user;
    const isPasswordValid = await bcrypt.compare(prePassword, password);
    if (!isPasswordValid) {
      throw new Error("Pre Password Error", 400);
    } else {
      if (newPassword !== newPasswordConfirm) {
        throw new Error("new pw and new pwc not true", 400);
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      const update = await userServices.updateInforUserById(id, { password: hashedPassword });
      if (update) {
        res.status(200).json({
          message: "change password successfull"
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUserController,
  userLoginController,
  getAccountController,
  userLogout,
  sendEmailForgot,
  checkTokenResetPassword,
  resetPassword,
  updateInforUser,
  changePassword
};
