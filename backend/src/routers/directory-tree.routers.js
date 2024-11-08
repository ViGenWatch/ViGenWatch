const express = require("express");
const getDirectoryTree = require("../controllers/directoryTreeController");
const authMiddleware = require("../middlewares/authMiddleware");

let directoryTreeRouters = express.Router();

directoryTreeRouters.get("/tree", authMiddleware, getDirectoryTree);

module.exports = directoryTreeRouters;
