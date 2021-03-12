//Server set up
let express = require('express');
let app = express();
let server = app.listen(3000);

//direct to static files
app.use(express.static('public'));

//Feedback that let's you know that it's running
console.log("My socket server is running");

//Require socket.io library
let socket = require('socket.io');

//variable that keeps track of inputs and outputs
let io = socket(server);

//Calling function on connection
io.sockets.on('connection', newConnection);

//Function to what happens on connection
function newConnection(socket) {
    console.log('new connection' + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }



}






