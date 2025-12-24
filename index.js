const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

// Create WebSocket server
const server = new WebSocket.Server({ port: PORT });

const clients = new Set(); // Keep track of connected clients

server.on("listening", () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

server.on("connection", (ws) => {
  console.log("Client connected");
  clients.add(ws);

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg); // Parse incoming JSON
      console.log("Received from client:", data);

      // Example: if there's a message field
      if (data.message) {
        console.log(`Message from ${data.name || "unknown"}:`, data.message);
      }

      // Optionally send a response back to the same client
      ws.send(JSON.stringify({ status: "received", original: data }));
    } catch (err) {
      console.error("Failed to parse message:", msg);
      ws.send(JSON.stringify({ status: "error", error: err.message }));
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err.message);
  });
});

// Optional: broadcast to all connected clients
function broadcast(data) {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
