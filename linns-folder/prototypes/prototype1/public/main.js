// call browserSocket library in variable
var browserSocket = io();

// variables for DOM elements
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');

const display = document.getElementById('display');
const hello = document.getElementById('hello');
const both = document.getElementById('both');

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

    isButtonOnePressed = !isButtonOnePressed;
}

async function onButtonTwoDown(event) {
    // emit event for button2
    browserSocket.emit('light', {
        light: 1,
    });

    isButtonTwoPressed = !isButtonTwoPressed;
}

// LISTEN ON SERVER

// Listening for lightState
browserSocket.on('lightState', function (data) {
    console.log(data);

    // feedback in browser :)
    if (data.light === 0) {
        isButtonOnePressed = data.state;
    } else if (data.light === 1) {
        isButtonTwoPressed = data.state;
    }

    if (isButtonOnePressed === true) {
        display.innerHTML = '<p>Button ONE has been pressed</p>';
        console.log('Button 1 is active');
    } else {
        display.innerHTML = '<p> </p>';
    }

    if (isButtonTwoPressed === true) {
        hello.innerHTML = '<p>Button TWO has been pressed</p>';
        console.log('Button 2 is active');
    } else {
        hello.innerHTML = '<p> </p>';
    }

    if (isButtonOnePressed === true && isButtonTwoPressed === true) {
        console.log('Both buttons active');
        both.innerHTML = '<p>Both buttons are being pressed!</p>';
    } else {
        both.innerHTML = '<p> </p>';
    }

    stateOfButtonOne();
    stateOfButtonTwo();
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
