const express = require("express");

let router = express.Router();

let initWebRouter = (app) => {
  router.get("/", (req, res) => {
    return res.send("alo alo alo");
  });
  return app.use("/", router);
};

module.exports = initWebRouter;
