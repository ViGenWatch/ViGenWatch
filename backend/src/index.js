import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import initWebRouter from "./routers/web";
require("dotenv").config();

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL || "http://127.0.0.1:3000" }));
app.use(json());
app.use(urlencoded({ extended: true }));
initWebRouter(app);
const port = process.env.BACKEND_PORT || 5051;
app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
