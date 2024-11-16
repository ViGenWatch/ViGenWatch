const db = require("../models/index");
const CustomError = require("../entity/customError");
const { where } = require("sequelize");

const createPasswordReset = async (data) => {
  try {
    const newPasswordReset = await db.PasswordReset.create({
      userId: data.userId,
      token: data.token,
      expiresAt: data.expiresAt,
      used: data.used
    });
    return newPasswordReset;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = { createPasswordReset };
