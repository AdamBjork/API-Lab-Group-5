// create color for canvas, snake, food
const BG_COLOUR = '#231f20';
const SNAKE_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66916';

// connect socket
var socket = io();
//const socket = io('http://localhost:3000');

socket.on('init', handleInit);

// Grab hold on game screen div
const gameScreen = document.getElementById('gameScreen');

// Create canvas element
let canvas, ctx;

// game state object
const gameState = {
    player: {
        pos: {
            x: 3,
            y: 10,
        },
        vel: {
            x: 1,
            y: 0,
        },
        snake: [
            { x: 1, y: 10 },
            { x: 2, y: 10 },
            { x: 3, y: 10 },
        ],
    },
    food: {
        x: 7,
        y: 7,
    },
    gridsize: 20,
};

// create init function
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 600;

    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.addEventListener('keydown', keydown);
}

function keydown(ev) {
    console.log(ev.keyCode);
}

// call init function
init();

// paint game function
function paintGame(state) {
    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const food = state.food;
    const gridsize = state.gridsize;
    const size = canvas.width / gridsize;

    ctx.fillStyle = FOOD_COLOUR;
    ctx.fillRect(food.x * size, food.y * size, size, size);

    paintPlayer(state.player, size, SNAKE_COLOUR);
}

// paint player function
function paintPlayer(playerState, size, colour) {
    const snake = playerState.snake;

    ctx.fillStyle = colour;
    for (let cell of snake) {
        ctx.fillRect(cell.x * size, cell.y * size, size, size);
    }
}

// call paintGame
paintGame(gameState);

// function socket init
function handleInit(msg) {
    console.log(msg);
}
