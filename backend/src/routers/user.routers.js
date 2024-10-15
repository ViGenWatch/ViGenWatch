const express = require("express");
const userController = require("../controllers/userController");
const checkInput = require("../middlewares/validate");

let userRoutes = express.Router();

userRoutes.post("/create", checkInput.validateRegisterUser(), userController.createUserController);
userRoutes.post("/login", checkInput.validateSignIn(), userController.userLoginController);

module.exports = userRoutes;
