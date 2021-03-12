//Creating variable
let socket;

//Setting up the canvas
function setup() {
    createCanvas(600, 400);
    background(51);

    //How users connects and calling function that draws
    socket = io.connect('http://localhost:3000');
    socket.on('mouse', newDrawing);
}

//Function that handles the data coming in from the others users
function newDrawing(data){
    noStroke();
    fill(255, 0, 100);
    ellipse(data.x, data.y, 36, 36);
}

//Function that tells what happens when you click and drag the mouse (drawing)
function mouseDragged() {
    console.log('Sending: ' + mouseX + ',' + mouseY);

    //the data that gets transmitted and draws on the other users canvas
    let data = {
        x: mouseX,
        y: mouseY
    }
    //emitting the data
    socket.emit('mouse', data);

    //the actual drawing
    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 36, 36);
}

function draw() {
}