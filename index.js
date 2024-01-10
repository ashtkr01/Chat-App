const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const connect = require('./config/databse-config');

const Chat = require('./models/chat');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection' , (socket) => {
    socket.on('join_room' , (data) => {
        console.log('joining a room' , data.roomid);
        socket.join(data.roomid);
    });

    socket.on('msg_send', async (data) => {
        console.log(data);
        //Save in Database:
        const chat = await Chat.create({
            content: data.msg,
            user: data.usr,
            roomId: data.roomid
        });
        // for all the web sockets connection that exist with my corresponding web socket server:
        io.to(data.roomid).emit('msg_rcvd' , data);
        //It is for same client the one who actually sends this event , that particular clients only will going to receive this :
        // socket.emit('msg_rcvd' , data);
        //Except the sending client , other client will receive this:
        // socket.broadcast.emit('msg_rcvd' , data);
    });
});

app.use('/' , express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/chat/:roomId', async (req , res) => {
    //Import chat:
    const chats = await Chat.find({
        roomId : req.params.roomId
    }).select('content user');
    res.render('index', {
        name : "Sanket",
        id : req.params.roomId,
        chats : chats
    });
});

server.listen(3000 , async () => {
    console.log('Server Started');

    await connect();
    console.log('mongodb connected');
});