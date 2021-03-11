// SERVER SETUP
const express = require('express');
const app = express();

// SOCKET SETUP
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4009; // changing the port

// direct static files to public
app.use(express.static(__dirname + '/public'));
app.use(express.json({ limit: '1mb' }));

// listen on port
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
    // new led lights
    const led1 = new Led(13);
    const led2 = new Led(7);

    // listen for new socket connection
    io.on('connection', function (socket) {
        console.log('made socket connection', socket.id);
    });

    // creating socket function
    function onConnection(socket) {
        socket.emit('lightState', {
            light: 0,
            state: isLedOneOn,
        });
        socket.emit('lightState', {
            light: 1,
            state: isLedTwoOn,
        });

        // server listen for emit 'light' event
        socket.on('light', function (data) {
            if (data.light === 0) {
                // function for turning led1 ON/OFF
                if (isLedOneOn === false) {
                    led1.blink(500);
                } else {
                    led1.stop().off();
                }
                isLedOneOn = !isLedOneOn;
                // send lightState data
                io.emit('lightState', {
                    light: 0,
                    state: isLedOneOn,
                });
            } else if (data.light === 1) {
                // function for turning led2 on/off
                if (isLedTwoOn === false) {
                    led2.blink(500);
                } else {
                    led2.stop().off();
                }
                isLedTwoOn = !isLedTwoOn;
                // send lightState data
                io.emit('lightState', {
                    light: 1,
                    state: isLedTwoOn,
                });
            }
        });
    }

    // calling socket function when new connection
    io.on('connection', onConnection);
});
