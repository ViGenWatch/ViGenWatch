const db = require("../models/index");
const CustomError = require("../entity/customError");
const { where, Op } = require("sequelize");

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

const checkTokenDuration = async (token) => {
  try {
    const resetRecord = await db.PasswordReset.findOne({
      where: {
        token,
        expiresAt: { [Op.gt]: new Date() },
        used: false
      }
    });
    return resetRecord;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const closeToken = async (token) => {
  try {
    const updateUsed = await db.PasswordReset.update(
      { used: 1 },
      {
        where: { token }
      }
    );
    return updateUsed;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = { createPasswordReset, checkTokenDuration, closeToken };
