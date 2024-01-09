const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection' , (socket) => {
    console.log('User has been connected ', socket.id);

    socket.on('msg_send', (data) => {
        console.log(data);
        // for all the web sockets connection that exist with my corresponding web socket server:
        // io.emit('msg_rcvd' , data);
        //It is for same client the one who actually sends this event , that particular clients only will going to receive this :
        // socket.emit('msg_rcvd' , data);
        //Except the sending client , other client will receive this:
        socket.broadcast.emit('msg_rcvd' , data);
    });
});

app.use('/' , express.static(__dirname + '/public'));

server.listen(3000 , () => {
    console.log('Server Started');
});