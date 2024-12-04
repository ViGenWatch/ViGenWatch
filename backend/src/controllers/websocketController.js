const sessionManager = require("../entity/sessionManager");
const RunCommandAnalysis = require("../entity/runCommandAnalysis");

const handleWebSocketConnection = (ws) => {
  let currentSessionId = null;
  const handleMessage = async (message) => {
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

        case "RUN_EXECUTION":
          if (data) {
            const command = new RunCommandAnalysis(data);
            ws.send(JSON.stringify({ type: "PROCESSING_COMMAND" }));

            try {
              const result = await command.runCommandExecution();
              if (result) {
                ws.send(JSON.stringify({ type: "COMPLETE_ANALYSIS_EXECUTION" }));
              } else {
                ws.send(JSON.stringify({ type: "EXECUTION_ANALYSIS_NOT_FOUND" }));
              }
            } catch (error) {
              console.error("Error during command execution:", error);
              ws.send(JSON.stringify({ type: "COMMAND_EXECUTION_FAILED", error: error.message }));
            }
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
