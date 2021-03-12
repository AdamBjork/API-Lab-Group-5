//Server set up
let express = require('express');
let app = express();
let server = app.listen(3000);

//Linking to the public folder
app.use(express.static('public'));

//Feedback that let's you know that it's running
console.log("My socket server is running");

//Require socket.io library
let socket = require('socket.io');

let io = socket(server);

//Calling function
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






