let startPointX;
let startPointY;

function setup() {
  createCanvas(800, 600);

  rectMode(CORNERS);
}

function draw() {
  background(220);

  push();

  fill(255, 155, 0);
  circle(width / 2, height / 2, 100);

  pop();

  if (mouseIsPressed) {
    push();

    fill(0, 155, 255, 128);
    rect(startPointX, startPointY, mouseX, mouseY);

    pop();
  }
}

function mousePressed() {
  startPointX = mouseX;
  startPointY = mouseY;
}
