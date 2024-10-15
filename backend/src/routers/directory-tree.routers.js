const express = require("express");
const getDirectoryTree = require("../controllers/directoryTreeController");

let directoryTreeRouters = express.Router();

directoryTreeRouters.get("/tree", getDirectoryTree);

module.exports = directoryTreeRouters;
