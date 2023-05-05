const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('¡Un cliente se ha conectado!');

  socket.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('¡Un cliente se ha desconectado!');
  });
});
