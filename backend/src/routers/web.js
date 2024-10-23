const express = require("express");
const postFileRouters = require("./file.routers");
const directoryTreeRouters = require("./directory-tree.routers");
const userRoutes = require("./user.routers");
const commandRouters = require("./command.routers");
const referenceRoutes = require("./reference.routes");

let router = express.Router();
router.use("/file", postFileRouters);
router.use("/directory", directoryTreeRouters);
router.use("/auth", userRoutes);
router.use("/command", commandRouters);
router.use("/reference", referenceRoutes);
module.exports = router;
