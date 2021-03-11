let socket;

function setup() {
    createCanvas(600, 400);
    background(51);

    socket = io();
    socket.on('mouse', newDrawing);

    setInterval(clearScreen, 5000);
}

function newDrawing(data){
    noStroke();
    fill(255, 0, 100);
    ellipse(data.x, data.y, 20, 20);
}

function mouseDragged() {
    console.log('Sending: ' + mouseX + ',' + mouseY);

    let data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse', data);

    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 20, 20);
}

function draw() {
}

function clearScreen() {
    clear();
    background(51);
}