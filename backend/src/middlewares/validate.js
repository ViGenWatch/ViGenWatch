const { check } = require("express-validator");

const validateRegisterUser = () => {
  return [
    check("userName").notEmpty().withMessage("Username cannot be empty"),
    check("password").notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    check("repassword")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Confirm password must be at least 8 characters long"),
    check("email").notEmpty().withMessage("Email is required"),
    check("email").isEmail().withMessage("Invalid email format"),
    check("firstName").notEmpty().withMessage("First name cannot be empty"),
    check("lastName").notEmpty().withMessage("Last name cannot be empty")
  ];
};

const validateSignIn = () => {
  return [
    check("email").notEmpty().withMessage("Email is required"),
    check("email").isEmail().withMessage("Invalid email format"),
    check("password").notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
  ];
};

module.exports = { validateRegisterUser, validateSignIn };
