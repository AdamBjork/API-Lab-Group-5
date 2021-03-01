// Make connection
var browserSocket = io.connect('http://localhost:4000');

// Query DOM
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

// emit events
btn.addEventListener('click', function () {
    browserSocket.emit('chat', {
        message: message.value,
        handle: handle.value,
    });
});

// listen for keypress, broadcast it
message.addEventListener('keypress', function () {
    browserSocket.emit('typing', handle.value);
});

// Listen for events

//display messages
browserSocket.on('chat', function (data) {
    feedback.innerHTML = '';
    output.innerHTML +=
        '<strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

browserSocket.on('typing', function (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
