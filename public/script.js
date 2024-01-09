var socket = io();

const btn = document.getElementById('btn');
btn.onclick = function exec(){
    socket.emit('from_client');
}

socket.on('from_server', () => {
    console.log('Collected a new event from the server ');
    const div = document.createElement('div');
    div.innerText = 'New Event from Server';
    document.body.appendChild(div);
}); 