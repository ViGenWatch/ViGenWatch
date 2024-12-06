import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import initWebRouter from "./routers/web";
import sshConnection from "./entity/sshConnect";
import { errorHandler } from "./entity/customError";

const http = require("http");
const initWebSocket = require("./config/websocket");
const handleWebSocketConnection = require("./controllers/websocketController");

require("dotenv").config();

const app = express();
app.use(cors());
app.options("*", cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", initWebRouter);

app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const server = http.createServer(app);
const wss = initWebSocket(server);
app.set("wss", wss);
wss.on("connection", handleWebSocketConnection);

const port = process.env.BACKEND_PORT || 5051;
sshConnection
  .connect()
  .then(() => {
    console.log("Connected to SSH");
    server.listen(port, () => {
      console.log("Backend Nodejs is running on the port: " + port);
    });
  })
  .catch((err) => {
    console.error("SSH Connection failed:", err);
  });

process.on("SIGINT", () => {
  sshConnection.close();
  process.exit();
});
