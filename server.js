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

  ws.send("userCount " + ++userCount);

  ws.on("message", function(message){
    //取得所有連接中的 client
    let clients = wss.clients

    //做迴圈，發送訊息至每個 client
    clients.forEach(client => {
        client.send(message)
    })
  });

  ws.on('close', () => {
    ws.send("userCount " + --userCount);
  })
});

