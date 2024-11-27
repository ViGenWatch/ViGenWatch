const express = require("express");
const router = express.Router();
const sessionManager = require("../services/sessionManager");
const fileService = require("../services/fileService");

router.post("/upload", (req, res) => {
  console.log("sfjsdfhsjfhkshf");
  const sessionId = req.headers["session-id"];
  const fileIndex = parseInt(req.headers["file-index"]);
  const chunkIndex = parseInt(req.headers["chunk-index"]);
  const chunkSize = parseInt(req.headers["chunk-size"]);

  const session = sessionManager.getSession(sessionId);
  if (!session) {
    return res.status(400).send("Invalid session");
  }

  const chunks = [];
  req.on("data", (chunk) => chunks.push(chunk));

  req.on("end", () => {
    try {
      const chunkData = Buffer.concat(chunks);
      const updated = session.updateChunk(fileIndex, chunkIndex, chunkData, chunkSize);

      if (!updated) {
        return res.status(400).send("Invalid file index");
      }

      // Kiểm tra file đã hoàn thành chưa
      if (session.isFileComplete(fileIndex, chunkSize)) {
        const file = session.getFile(fileIndex);
        const filePath = fileService.saveCompletedFile(file.name, file.buffer, file.size);

        // Giải phóng buffer
        file.buffer = null;

        // Thông báo hoàn thành qua WebSocket
        req.app.get("wss").clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "FILE_COMPLETED",
                fileIndex,
                fileName: file.name
              })
            );
          }
        });
      }

      res.sendStatus(200);
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).send(error.message);
    }
  });
});

module.exports = router;
