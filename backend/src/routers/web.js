import { Router } from "express";
const { getUserTest } = require("../controllers/userController");
let router = Router();

let initWebRouter = (app) => {
  router.get("/user", getUserTest);
  return app.use(router);
};

export default initWebRouter;
