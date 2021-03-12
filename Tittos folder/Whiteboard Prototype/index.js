
const { clear } = require('console');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));
// Run when client connects
function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  // If statement is added that listens to the "CLEAR" button 
    socket.on('clear', function(data){
    if (data.clear == 1) {
      io.emit('newScreen', {
        clear: 1,
      })
    }
    else io.emit('newScreen', {
      clear: 0,
    })
  })
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
