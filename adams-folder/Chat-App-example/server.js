//NOTE!!!! Very important to use "Go Live" with Live server on VS Code itself, otherwise it doesn't work!

//Requiring socket.io library and setting the port to 3000
//Credit to "Kibae Kim", commented the solution to an error in the comments of the tutorial
const io = require("socket.io")(3000, {
    cors: {
      origin: "*",
    },
  });

//Adding object that stores users
const users = {}

//Functions that happens on connection
io.on('connection', socket => {
    //handle new users
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    //handle chat events
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    //handle what happens on disconnection
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})