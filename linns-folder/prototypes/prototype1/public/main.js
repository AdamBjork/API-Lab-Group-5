// call browserS library in variable
var browserSocket = io();

// variables for DOM elements
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const feedback = document.getElementById('feedback');
const display = document.getElementById('display');
const hello = document.getElementById('hello');

let isBothActive;
let isButtonOnePressed;
let isButtonTwoPressed;

// event listeners
button1.addEventListener('mousedown', onButtonOneDown);
button2.addEventListener('mousedown', onButtonTwoDown);

// EMIT EVENTS

async function onButtonOneDown(event) {
    // emit event for button1
    browserSocket.emit('light', {
        light: 0,
    });
}

async function onButtonTwoDown(event) {
    // emit event for button1
    browserSocket.emit('light', {
        light: 1,
    });
}

// LISTEN ON SERVER

// Listening for events from server
browserSocket.on('lightState', function (data) {
    console.log(data);

    // display.innerHTML += '<p>' + data.message + '</p>';
});

// Set state of button1 and button2
function stateOfButtonOne() {
    if (isButtonOnePressed) {
        console.log('button 1 here');
        button1.textContent = 'LEFT BUTTON IS PRESSED';
        button1.style.color = 'black';
        button1.style.backgroundColor = 'yellow';
    } else {
        button1.textContent = 'PUSH LEFT BUTTON';
        button1.style.color = 'white';
        button1.style.backgroundColor = 'lightslategray';
    }
}

function stateOfButtonTwo() {
    if (isButtonTwoPressed) {
        console.log('button 2 hello');
        button2.textContent = 'RIGHT BUTTON IS PRESSED';
        button2.style.color = 'black';
        button2.style.backgroundColor = 'yellow';
    } else {
        button2.textContent = 'PUSH RIGHT BUTTON';
        button2.style.color = 'white';
        button2.style.backgroundColor = 'lightslategray';
    }
}

// send feedback on feedback to server
feedback.addEventListener('keypress', function () {
    hello.innerHTML = '';
    browserSocket.emit('typing', feedback.value);
});

// listen for server for feedback
browserSocket.on('typing', function (data) {
    hello.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
