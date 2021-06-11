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

server.listen(3000, "localhost");