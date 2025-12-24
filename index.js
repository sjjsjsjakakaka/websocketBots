import { WebSocketServer } from 'ws';

// Railway exposes the port your application should bind to via the PORT environment variable
const PORT = process.env.PORT || 8080; 

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    // Echo message back to client
    ws.send(`You said: ${data}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server started on port ${PORT}`);
