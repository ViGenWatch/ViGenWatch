import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import initWebRouter from "./routers/web";
require("dotenv").config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", initWebRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.BACKEND_PORT || 5051;
app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
