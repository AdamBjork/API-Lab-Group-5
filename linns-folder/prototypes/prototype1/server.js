// SERVER SETUP
const express = require('express');
const app = express();

// SOCKET SETUP
const socket = require('socket.io');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4009; // changing the port

// direct static files to public
app.use(express.static(__dirname + '/public'));
app.use(express.json({ limit: '1mb' }));

// creating socket function
function onConnection(socket) {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

    // receiving feedback message
    socket.on('message', function (data) {
        io.sockets.emit('message', data);
    });

    // broadcast when someone is typing
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });
}

// calling socket function
io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));

// JOHNNY-FIVE SETUP
const { Board, Led } = require('johnny-five');
const board = new Board();

// VARIABLES
//var for checking if led1 and led2 is on or off
let isLedOneOn = false;
let isLedTwoOn = false;

// BOARD READY
board.on('ready', () => {
    console.log('hello board');
    const led1 = new Led(13); // port 13 on arduino
    const led2 = new Led(7);
    const bothLed = new Led(3);

    // function when socket connect
    io.on('connection', function (socket) {
        console.log('made socket connection', socket.id);
    });

    app.post('/set-arduino-light-one', (request, response) => {
        const data = request.body;

        //for debugging
        console.log('message: ' + data.message);
        console.log('buttonOne: ' + data.buttonOne);

        // function for turning the led1 ON/OFF
        if (isLedOneOn === false) {
            led1.blink(500);
        } else {
            led1.stop().off();
        }
        isLedOneOn = !isLedOneOn;
    });

    app.post('/set-arduino-light-two', (request, response) => {
        const data = request.body;
        const someString = 'Hi light 2';

        //for debugging
        console.log('message: ' + data.message);
        console.log('someBoolean: ' + data.someBoolean);

        // function for turning led2 on/off
        if (isLedTwoOn === false) {
            led2.blink(500);
            console.log(someString);
        } else {
            led2.stop().off();
        }
        isLedTwoOn = !isLedTwoOn;
    });

    // function for both led
    if (isLedOneOn === true && isLedTwoOn === true) {
        bothLed.blink(500);
    } else {
        bothLed.stop().off();
    }

    app.get('/light-state', function (request, response) {
        console.log('get received');

        const data = { isLedOneOn, isLedTwoOn };
        response.send(data);
    });
});
