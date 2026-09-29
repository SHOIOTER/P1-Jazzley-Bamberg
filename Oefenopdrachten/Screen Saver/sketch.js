let windowSize = 400;

let ballDiameter = 50;
let ballRadius = ballDiameter / 2;
let ballPosX = windowSize / 2;
let ballPosY = ballPosX;
let ballVelocityX = 200;
let ballVelocityY = ballVelocityX / 2;
let ballUpperBound = windowSize - ballRadius

function setup() {
  createCanvas(windowSize, windowSize);
}

function draw() {
  background(220);

  ballPosX += deltaTime * ballVelocityX / 1000;
  ballPosY += deltaTime * ballVelocityY / 1000;

  circle(ballPosX, ballPosY, ballDiameter);

  if (ballPosX <= ballRadius || ballPosX >= ballUpperBound) {
    ballVelocityX = -ballVelocityX;
  }

  if (ballPosY <= ballRadius || ballPosY >= ballUpperBound) {
    ballVelocityY = -ballVelocityY;
  }
}