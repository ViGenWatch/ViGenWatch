const WebSocket = require("ws");

const initWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  return wss;
};

module.exports = initWebSocket;
