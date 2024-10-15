const express = require("express");
const postFileRouters = require("./file.routers");
const directoryTreeRouters = require("./directory-tree.routers");
const userRoutes = require("./user.routers");

let router = express.Router();
router.use("/file", postFileRouters);
router.use("/directory", directoryTreeRouters);
router.use("/auth", userRoutes);
module.exports = router;
