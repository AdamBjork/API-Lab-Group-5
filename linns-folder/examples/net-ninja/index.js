// require express
const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(4000, function () {
    console.log('Listening to request on port 4000');
});

// Static files, folder public to server
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection', function (socket) {
    console.log('made socket connection');
});