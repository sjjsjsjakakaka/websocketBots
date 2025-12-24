const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

const server = new WebSocket.Server({ port: PORT });

server.on("listening", () => {
  console.log("WebSocket server running on port", PORT);
});

server.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    ws.send(msg); // echo test
  });
});
