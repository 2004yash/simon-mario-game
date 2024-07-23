const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

let clients = [];

server.on('connection', (ws) => {
  // Add new client to the clients array
  clients.push(ws);
  console.log('New client connected. Total clients:', clients.length);

  // Broadcast message to all clients
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Remove client from clients array on disconnect
  ws.on('close', () => {
    clients = clients.filter(client => client !== ws);
    console.log('Client disconnected. Total clients:', clients.length);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
