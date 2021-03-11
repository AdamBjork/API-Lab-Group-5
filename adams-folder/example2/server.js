//NOTE!!!! Very important to use "Go Live" with Live server on VS Code itself, otherwise it doesn't work!

//Credit to "Kibae Kim", commented the solution to an error in the comments on the tutorial
const io = require("socket.io")(3000, {
    cors: {
      origin: "*",
    },
  });

io.on('connection', socket => {
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', message)
    })
})