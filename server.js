const PORT = process.env.PORT || 3000;
const express = require('express')
const INDEX = '/index.html';
const { Server } = require('ws');
let userCount = 0;

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('server connection')
  userCount += 1

  ws.on('message', function incoming(data) {
    console.log('received: %s', data);
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  });

  ws.send(`userCount-${userCount}`);

  ws.on('close', () => {
    userCount -= 1
    ws.send("ws close");
  })
});

