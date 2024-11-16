const db = require("../models/index");
const CustomError = require("../entity/customError");
const { where, Op } = require("sequelize");

const getUserAccount = async (user) => {
  try {
    const existUsers = await db.User.findAndCountAll({
      where: {
        [Op.or]: [{ userName: user.userName }, { email: user.email }]
      }
    });
    return existUsers;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const getUserAccountByEmail = async (email) => {
  try {
    const userAccount = await db.User.findOne({ where: { email: email } });
    return userAccount;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const getUserAccountByToken = async (refreshToken) => {
  try {
    const userAccount = await db.User.findOne({ where: { refreshToken: refreshToken } });
    return userAccount;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const createUser = async (user) => {
  try {
    const newUser = await db.User.create({
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
    return newUser;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const updateUserByEmail = async (email, data) => {
  console.log(email, data);
  try {
    const [updatedRowsCount] = await db.User.update(
      {
        ...data
      },
      {
        where: {
          email: email
        }
      }
    );
    if (updatedRowsCount === 0) {
      throw new CustomError("No user found with the provided email", 404);
    }
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const updateUserById = async (userId, data) => {
  try {
    const userUpdate = db.User.update(data, {
      where: { id: userId }
    });
    return userUpdate;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = {
  getUserAccount,
  createUser,
  getUserAccountByEmail,
  updateUserByEmail,
  getUserAccountByToken,
  updateUserById
};
