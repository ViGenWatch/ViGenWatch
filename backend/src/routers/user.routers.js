const express = require("express");
const userController = require("../controllers/userController");
const checkInput = require("../middlewares/validate");
const authMiddleware = require("../middlewares/authMiddleware");

let userRoutes = express.Router();

userRoutes.post("/create", checkInput.validateRegisterUser(), userController.createUserController);
userRoutes.post("/login", checkInput.validateSignIn(), userController.userLoginController);
userRoutes.post("/account", checkInput.validateGetAccountByToken(), userController.getAccountController);
userRoutes.post("/forgot-password", userController.sendEmailForgot);
userRoutes.get("/logout", authMiddleware, userController.userLogout);
userRoutes.get("/reset-password/:token", userController.checkTokenResetPassword);
userRoutes.put("/update-password", userController.resetPassword);

module.exports = userRoutes;
