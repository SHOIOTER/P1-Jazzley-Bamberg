let x = 200;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(30);

  fill(255, 100, 0);
      ellipse(x, 120, 80);

  fill(0, 170, 255);
  ellipse(x, 220, 80);

fill(120, 255, 0);
  ellipse(x, 320, 80);

  x = x + 1;
}