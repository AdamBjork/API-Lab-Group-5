// SET UP SERVER

// require express
const express = require('express');

// App setup
const app = express();

// create server, fire function when listen
const server = app.listen(4000, function () {
    console.log('Listening to request on port 4000');
});

// direct static files
app.use(express.static('public'));

// SET UP SOCKET
const socket = require('socket.io');
const io = socket(server);

// function when socket connect
io.on('connection', function (socket) {
    console.log('made socket connection');
});
