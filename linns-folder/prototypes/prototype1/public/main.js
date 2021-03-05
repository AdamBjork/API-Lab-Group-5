var socket = io();

const button = document.getElementById('button');
let isButtonActive;

const debug = document.getElementById('debug');
debug.textContent = 'Starting ...';

button.addEventListener('mousedown', onMouseDown);

onStart();

async function onMouseDown(event) {
    const message = 'Change light state';
    const someBoolean = true;
    const data = { message, someBoolean };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch('/set-arduino-light', options);
    const responseJSON = await response.json();

    constResponseJSONdata = JSON.parse(responseJSON.data);

    console.log('someString: ' + constResponseJSONdata.someString);

    isButtonActive = constResponseJSONdata.isLightOn;

    setButtonState();
}

async function onStart() {
    const response = await fetch('/light-state');
    const data = await response.json();

    isButtonActive = data.isLightOn;

    setButtonState();

    debug.textContent = 'state received, button ready!';
}

function setButtonState() {
    if (isButtonActive) {
        button.textContent = 'TURN OFF';
        button.style.color = 'black';
        button.style.backgroundColor = 'yellow';
    } else {
        button.textContent = 'TURN ON';
        button.style.color = 'white';
        button.style.backgroundColor = 'lightslategray';
    }
}
