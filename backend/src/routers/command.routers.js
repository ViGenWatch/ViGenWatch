const express = require("express");
const commandController = require("../controllers/commandController");

let commandRouters = express.Router();

commandRouters.get("/run", commandController.CommandRunExecution);

module.exports = commandRouters;
