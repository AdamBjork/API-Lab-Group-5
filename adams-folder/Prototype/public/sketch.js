//creating variable
let socket;

//setting up the canvas
function setup() {
    createCanvas(600, 400);
    background(51);

    //defining socket variable
    socket = io();
    //calling function that draws
    socket.on('mouse', newDrawing);

    //predetermined lifespan in the form of a setInterval function
    setInterval(clearScreen, 5000);
}

//Function that handles the data coming in from the others users
function newDrawing(data){
    noStroke();
    fill(255, 0, 100);
    ellipse(data.x, data.y, 20, 20);
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
    ellipse(mouseX, mouseY, 20, 20);
}

function draw() {
}

//function that clears the canvas and the re-draws the background
function clearScreen() {
    clear();
    background(51);
}