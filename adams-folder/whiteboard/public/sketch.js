//let socket = io();
let particle;
let array = [];

function setup() {
    createCanvas(400, 400);
    background(220);

    //socket = io.connect('http://localhost:3000');
    let socket = io();
    socket.on('drawing', newDrawing);
    particle = new Particle(mouseX, mouseY);
    setInterval(clearScreen, 5000);
}

function newDrawing(data){
    noStroke();
    fill(255, 0, 100);
    particle.display(data.x, data.y);
}

function mouseDragged() {
    let socket = io();

    let data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('drawing', data);
}

function draw() {

}

function clearScreen() {
    clear();
    background(220);
}