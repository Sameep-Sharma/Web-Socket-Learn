const express = require("express");
const app = express();
const http = require("http");
//WebSocket ko start karne ke liye normal app.listen() enough nahi hota, because WebSockets are not just another HTTP route—they start as HTTP and then “upgrade” the connection.
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);//handle sockets
const path = require("path");
app.use(express.static(path.resolve("./public")));

//Socket.io handle
io.on('connection', (socket) =>{
  console.log('A new user has connected',socket.id);
  socket.on('user-message',(message) =>{
    console.log('A new user message');
    console.log(message);
    io.emit('message',message);
  })
})

app.get("/", (req, res) => {
  return res.send("/public/index.html");
});

server.listen(9000, () => {
  console.log(`Server Started at PORT:9000`);
});
