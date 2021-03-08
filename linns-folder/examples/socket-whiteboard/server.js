// index.js from https://github.com/socketio/socket.io/blob/master/examples/whiteboard/index.js

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4400; // changing the port from 3000 to 4400

app.use(express.static(__dirname + '/public'));

function onConnection(socket) {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
