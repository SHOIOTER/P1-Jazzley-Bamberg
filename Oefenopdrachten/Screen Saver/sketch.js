let windowSize = 400;

let ballDiameter = 50;
let ballRadius = ballDiameter / 2;
let ballPosX = windowSize / 2;
let ballPosY = ballPosX;
let ballVelocityX = 200;
let ballVelocityY = ballVelocityX / 2;
let ballUpperBound = windowSize - ballRadius;

let currentColor;

function setup() {
  createCanvas(windowSize, windowSize);

  rectMode(CENTER);

  currentColor = getRandomColor();
}

function draw() {
  background(220);

  ballPosX += deltaTime * ballVelocityX / 1000;
  ballPosY += deltaTime * ballVelocityY / 1000;

  fill(currentColor);
  square(ballPosX, ballPosY, ballDiameter);

  if (ballPosX <= ballRadius || ballPosX >= ballUpperBound) {
    ballVelocityX = -ballVelocityX;
    currentColor = getRandomColor();
  }

  if (ballPosY <= ballRadius || ballPosY >= ballUpperBound) {
    ballVelocityY = -ballVelocityY;
    currentColor = getRandomColor();
  }
}

function getRandomColor() {
  return color(random(0, 255), random(0, 255), random(0, 255));
}