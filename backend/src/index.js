import express from "express";
import { urlencoded } from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import initWebRouter from "./routers/web";
require("dotenv").config();

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL || "http://127.0.0.1:3005" }));
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/", initWebRouter);
const port = process.env.BACKEND_PORT || 5051;
app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.res.status(400).send({ message: "Error" });
});

app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
