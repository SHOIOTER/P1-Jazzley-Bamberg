function setup() {
  createCanvas(400, 400, "webgl");
}

function draw() {
  background(220);
  orbitControl(2, 2, 2);
  fill(255, 0, 0);
  rotateY(frameCount / 50);
  sphere(50);
  box(50, 50, 50);
}