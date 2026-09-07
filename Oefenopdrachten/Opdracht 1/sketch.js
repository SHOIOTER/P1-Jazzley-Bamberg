let percentage = 0;
let duration = 60;

let ballRadius = 20;

let startLevel = 200;
let floorLevel = ballRadius;
let difference = startLevel - floorLevel;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 0, 0);
  
  percentage = (frameCount % duration) / duration;
  
  fill(200, 200, 200)
  circle(
    width / 2,
    startLevel + difference * pow(percentage * 2 - 1, 2),
    ballRadius * 2
  );
}