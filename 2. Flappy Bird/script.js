let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let topPipeImg;
let bottomPipeImg;

let velocityX = -2; // Speed Of Pipes (Moving Left)
let velocityY = 0; // Bird Jump Speed (Up)
let gravity = 0.4; // Gravity Speed (Down)

let gameOver = false;
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // Get the 2D rendering context for drawing
    
    board.style.backgroundColor = '#DEF9C4';

    // Flappy Bird
    birdImg = new Image();
    birdImg.src = "./images/flappybird.png"; 
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    // Pipe images
    topPipeImg = new Image();
    topPipeImg.src = "./images/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./images/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); 
    document.addEventListener("keydown", moveBird); 
};

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }

  context.clearRect(0, 0, boardWidth, boardHeight); // Clear the canvas

  // Flappy Bird
  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0); // Apply gravity and limit bird's jump to canvas top
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > board.height) {
    gameOver = true; // Game over if bird goes below canvas
  }

  // Pipe
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5; // Increment score when bird passes a pipe
      pipe.passed = true;
    }

    if (detectCollision(bird, pipe)) {
      gameOver = true; // Game over if bird collides with a pipe
    }
  }

  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift(); 
  }

  context.fillStyle = "white";
  context.font = "45px Poppins";
  context.fillText(score, 5, 45); 

  if (gameOver) {
    context.fillText("GAME OVER", 5, 90); 
  }
}

function placePipes() {
  if (gameOver) {
    return;
  }

  let randomPipeY = pipeY - pipeHeight / 4 - (Math.random() * pipeHeight) / 2;
  let openingSpace = board.height / 4;

  // Top pipe
  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(topPipe);

  // Bottom pipe
  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(bottomPipe);
}

function moveBird(event) {
  if (event.code == "Space" || event.code == "ArrowUp" || event.code == "KeyX") {
    velocityY = -6; // Move bird upward on key press
  }

  // Reset game on game over
  if (gameOver) {
    bird.y = birdY;
    pipeArray = [];
    score = 0;
    gameOver = false;
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ); // Check collision between bird and pipes
}
