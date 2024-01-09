const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection' , (socket) => {
    console.log('User has been connected ', socket.id);

    socket.on('from_client', () => {
        console.log('Received from client side');
    });

    setInterval(() => {
        socket.emit('from_server');
    },2000)
});

app.use('/' , express.static(__dirname + '/public'));

server.listen(3000 , () => {
    console.log('Server Started');
});