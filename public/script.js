var socket = io();

let btn = document.getElementById('btn');
let inputMsg = document.getElementById('newmsg');
let msglist = document.getElementById('msglist');

btn.onclick = function exec(){
    // Syntax : socket.emit(event_name , data_value);
    socket.emit('msg_send' , {
        msg: inputMsg.value,
    });
}

socket.on('msg_rcvd', (data) => {
    let limsg = document.createElement('li');
    limsg.innerText = data.msg;
    msglist.appendChild(limsg);
});