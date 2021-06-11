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
    ws.send(message);
  });

  ws.on('close', () => {
    ws.send("userCount " + --userCount);
  })
});


// server.addListener("connection", function(conn){
//   server.broadcast("userCount " + ++userCount);
//   conn.addListener("message", function(message){
//     server.broadcast(message);
//   });
// });

// server.addListener("close", function(conn){
//   server.broadcast("userCount " + --userCount);
// });

