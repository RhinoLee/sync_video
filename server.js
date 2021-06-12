const PORT = process.env.PORT || 3000;
const express = require('express')
const INDEX = '/index.html';
const { Server } = require('ws');
let userCount = [];

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('server connection')
  setInterval(() => {
    wss.clients.forEach((client) => {
      client.send(new Date().toTimeString());

      client.on('message', (data) => {
        ws.send(data)
      })
    });
  }, 10000);

  // ws.on('close', () => {
  //   ws.send("userCount " + --userCount);
  // })
});

