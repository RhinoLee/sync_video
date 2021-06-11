const PORT = process.env.PORT || 3000;
const express = require('express')
const INDEX = '/index.html';
const { Server } = require('ws');
const wss = new Server({ server });
let userCount = [];
let server = wss.createServer({
  debug: true
});

server.addListener("connection", function(conn){
  server.broadcast("userCount " + ++userCount);
  conn.addListener("message", function(message){
    server.broadcast(message);
  });
});

server.addListener("close", function(conn){
  server.broadcast("userCount " + --userCount);
});

server.listen(PORT, "localhost");

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));