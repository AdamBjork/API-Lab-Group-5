const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/style', express.static(__dirname + '/style'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => {
  socket.username = 'anonymous';
  socket.on('change username', (name) => socket.username = name)
  socket.on('message', (msg) => io.emit('message',
  { 'user': socket.username, 'message': msg }))
  socket.on('join', (username) => {
    if (username != null) {
      socket.username = username
    }
    socket.broadcast.emit('message',
    { 'user': 'Server', 'message': socket.username + ' has joined!'})
  })
})
app.post("/set-arduino-light", (request, response) => {
  const data = request.body;
  const someString = "Hi buddy!";

  //for debugging
  console.log("message: " + data.message);
  console.log("someBoolean: " + data.someBoolean);

  // function for turning the blinking ON/OFF
  if(isLightOn == false) {
  led.blink(500);
  } else {
  led.stop().off();
  }
  isLightOn = !isLightOn;
  
  //for debugging using phone
  data.isLightOn = isLightOn;
  data.someString = someString;
  response.json({
  status: "success",
  data: JSON.stringify(data)
  });
});
http.listen(5000, () => console.log('listening on port 5000'))