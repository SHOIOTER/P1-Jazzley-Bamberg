function setup() {
  createCanvas(960, 540);
}

function draw() {
  background(220);

  fill(0, 155, 255);
  circle(width / 2, height / 2, 100);

  console.log(mouseX, mouseY);
}
