const GRAVITY = 0.0015;

let currentVelocity = 0;

let currentY = -50;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);

  currentVelocity += GRAVITY * deltaTime;
  currentY += currentVelocity * deltaTime;

  if (collidePointCircle(400, 600, 400, currentY, 100)) currentVelocity = -1;

  fill(255, 0, 0);
  circle(400, currentY, 100);
}
