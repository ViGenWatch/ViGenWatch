const db = require("../models/index");
const CustomError = require("../entity/customError");
const { where } = require("sequelize");

const createExecution = async (execution) => {
  try {
    const newExecution = await db.Execution.create({
      executionName: execution.executionName,
      executionNumber: execution.executionNumber,
      userId: execution.userId
    });

    return newExecution;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const getNextExecutionNumber = async (userId) => {
  try {
    const count = await db.Execution.count({
      where: {
        userId: userId
      }
    });
    return count + 1;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = { createExecution, getNextExecutionNumber };
