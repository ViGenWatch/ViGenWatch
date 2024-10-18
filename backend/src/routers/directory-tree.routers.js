const express = require("express");
const getDirectoryTree = require("../controllers/directoryTreeController");

let directoryTreeRouters = express.Router();

directoryTreeRouters.get("/tree/:userName", getDirectoryTree);

module.exports = directoryTreeRouters;
