function setup() {
  createCanvas(400, 400, "webgl");
}

function draw() {
  background(220);

  push();

  rotateX(frameCount / 50)
  fill(155, 0, 255);
  ellipse(-100, -100, 50, 100);

  pop();

  push();

  rotateY(frameCount / 50);
  fill(255, 155, 0);
  square(-50, -50, 100);

  pop();

  push();

  rotateZ(frameCount / 50);
  fill(0, 155, 255);
  circle(100, 100, 50);

  pop();

  push();

  rotateX(frameCount / 50),
  rotateY(frameCount / 50);
  rotateZ(frameCount / 50);
  fill(255, 100, 155);
  rect(100, 100, 50, 100);

  pop();
}