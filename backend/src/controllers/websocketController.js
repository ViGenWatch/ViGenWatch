const sessionManager = require("../entity/sessionManager");

const handleWebSocketConnection = (ws) => {
  let currentSessionId = null;
  const handleMessage = (message) => {
    try {
      const data = JSON.parse(message);
      switch (data.type) {
        case "START_UPLOAD":
          currentSessionId = sessionManager.createSession(data.files);
          ws.send(
            JSON.stringify({
              type: "SESSION_CREATED",
              sessionId: currentSessionId
            })
          );
          break;

        case "UPLOAD_PROGRESS":
          const session = sessionManager.getSession(data.sessionId);
          if (session) {
            const file = session.getFile(data.fileIndex);
            if (file) {
              ws.send(
                JSON.stringify({
                  type: "PROGRESS_UPDATE",
                  fileIndex: data.fileIndex,
                  progress: ((file.receivedChunks.size * data.chunkSize) / file.size) * 100
                })
              );
            }
          }
          break;

        case "CANCEL_UPLOAD":
          if (data.sessionId) {
            sessionManager.cleanupSession(data.sessionId);
            ws.send(JSON.stringify({ type: "UPLOAD_CANCELLED" }));
          }
          break;
      }
    } catch (error) {
      console.error("WebSocket error:", error);
      ws.send(
        JSON.stringify({
          type: "ERROR",
          message: error.message
        })
      );
    }
  };

  ws.on("message", handleMessage);

  ws.on("close", () => {
    console.log("A client has disconnected!");
    if (currentSessionId) {
      sessionManager.cleanupSession(currentSessionId);
    }
  });
};

module.exports = handleWebSocketConnection;
