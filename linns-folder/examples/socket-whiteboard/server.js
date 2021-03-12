// index.js from https://github.com/socketio/socket.io/blob/master/examples/whiteboard/index.js

// Server set up
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 4400; // changing the port from 3000 to 4400

// Require socket.io library
const io = require('socket.io')(http);

// direct static files to public folder
app.use(express.static(__dirname + '/public'));

// listen to specified port
http.listen(port, () => console.log('listening on port ' + port));

// create socket function
function onConnection(socket) {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

// call socket function
io.on('connection', onConnection);
