const db = require("../models/index");
const CustomError = require("../entity/customError");
const { where } = require("sequelize");

const createExecution = async (execution) => {
  try {
    const newExecution = await db.Execution.create({
      executionName: execution.executionName,
      executionNumber: execution.executionNumber,
      referenceId: execution.referenceId,
      executionPath: execution.executionPath,
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

const getListExecutions = async (userId) => {
  try {
    const executions = await db.Execution.findAll({
      attributes: ["id", "executionName", "executionNumber"],
      where: {
        userId: userId
      }
    });
    return executions;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const getExecutionById = async (executionId) => {
  try {
    const execution = await db.Execution.findOne({
      where: {
        id: executionId
      }
    });
    return execution;
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = { createExecution, getNextExecutionNumber, getListExecutions, getExecutionById };
