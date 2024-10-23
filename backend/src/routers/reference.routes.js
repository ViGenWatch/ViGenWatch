const express = require("express");
const referenceController = require("../controllers/referenceController");

let referenceRoutes = express.Router();

referenceRoutes.get("/getlist", referenceController.getListReferencesController);

module.exports = referenceRoutes;
