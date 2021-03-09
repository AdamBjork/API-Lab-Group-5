// call browserS library in variable
var browserSocket = io();

// variables for DOM elements
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const feedback = document.getElementById('feedback');
const display = document.getElementById('display');

let isBothActive;
let isButtonOnePressed = false;
let isButtonTwoPressed;

// event listeners
button1.addEventListener('mousedown', onButtonOneDown);
button2.addEventListener('mousedown', onButtonTwoDown);

onStart();

async function onButtonOneDown(event) {
    const message = 'Change light of button 1';
    const buttonOne = true;
    const data = { message, buttonOne };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch('/set-arduino-light-one', options);
    const responseJSON = await response.json();

    isButtonOnePressed = data.isLedOneOn;

    constResponseJSONdata = JSON.parse(responseJSON.data);
    console.log('someString: ' + constResponseJSONdata.someString);

    isButtonOnePressed = constResponseJSONdata.isLedOneOn;

    // emit event for button1
    browserSocket.emit('message', {
        message: feedback.value,
    });
}

// Listening for events from server
browserSocket.on('message', function (data) {
    display.innerHTML += '<p>' + data.message + '</p>';
});

async function onButtonTwoDown(event) {
    const message = 'Change light of button 2';
    const someBoolean = true;
    const data = { message, someBoolean };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch('/set-arduino-light-two', options);
    const responseJSON = await response.json();

    constResponseJSONdata = JSON.parse(responseJSON.data);
    console.log('someString: ' + constResponseJSONdata.someString);

    isButtonTwoPressed = constResponseJSONdata.isLedTwoOn;

    stateOfButtonTwo();
}

async function onStart() {
    const response = await fetch('/light-state');
    const data = await response.json();

    isButtonOnePressed = data.isLedOneOn;
    isButtonTwoPressed = data.isLedTwoOn;

    stateOfButtonOne();
    stateOfButtonTwo();

    debug.textContent = 'state received, buttons ready!';
}

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
    browserSocket.emit('typing', handle.value);
});

// listen for server for feedback
browserSocket.on('typing', function (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
