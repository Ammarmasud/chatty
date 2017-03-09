const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
const randomColor = require('random-color')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const clients = {};
clientConnected = (clientId) => {
  clients[clientId] = {
    id    : clientId,
    color : randomColor().hexString()
  };

  const numOfClients = Object.keys(clients).length;
  wss.broadcast({type:'numOfClients', numOfClients: numOfClients, id:clientId});
};

clientDisconnected = (clientId) => {
  delete clients[clientId];
  const numOfClients = Object.keys(clients).length;
  wss.broadcast({type:'numOfClients', numOfClients: numOfClients});
};

handleMessage = (dataRaw) => {
  const data = JSON.parse(dataRaw);

  switch(data.type) {
    case 'postMessage':
      console.log(`User ${data.username} said ${data.content}`);
      data.id = uuid.v1();
      data.type = 'incomingMessage'
      data.color = clients[data.clientId].color;
      wss.broadcast(data);
      break;

    case 'postNotification':
      data.type = 'incomingNotification';
      wss.broadcast(data);
      break;

    default:
      throw new Error(`Unknown event type ${data.type}`);
  }
};


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  const clientId = uuid.v1();
  clientConnected(clientId);

  ws.on('message', handleMessage);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    clientDisconnected(clientId);
    console.log('Client disconnected');
  });
});

wss.broadcast = (data) => {
  wss.clients.forEach( (client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

