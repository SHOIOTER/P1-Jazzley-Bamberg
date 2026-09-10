let roadHeight = 150;
let roadStrokeLength = 100;
let roadStrokeSpacing = 150;
let roadStrokeOffset = -25;
let roadLayerHeight = 10;

let sunCircleMin = 70;
let sunCircleMax = 140;
let sunCircleElapsed = 0;
let sunCircleDuration = 150;

let sunCircleMaxRadius = sunCircleMax / 2;
let sunStartX = -sunCircleMaxRadius - 1;
let sunStartY = 600;
let sunTargetY = 75;
let sunElapsed = 0;
let sunDuration = 2000;

let towerHeight = 500;
let towerSide = 700;
let windowSize = 40;

function setup() {
  createCanvas(1000, 800);
}

function getLoopedT(t) {
  return -abs(t * 2 - 1) + 1;
}

function getQuadT(t) {
  return -pow(t * 2 - 1, 2) + 1;
}

function draw() {
  background(0, 235, 255);

  push();

  let roadOrigin = height - roadHeight;
  let backgroundFloorHeight = roadOrigin - roadLayerHeight * 3;

  noStroke();
  fill(100);
  rect(0, roadOrigin, width, roadHeight);

  fill(200);
  for (let x = 0; x < 7; x++) {
    rect(x * roadStrokeSpacing + roadStrokeOffset, height - 70, roadStrokeLength, 15, 7.5);
  }

  fill(85, 85, 100);
  rect(0, roadOrigin - roadLayerHeight, width, roadLayerHeight);

  fill(0, 115, 0);
  rect(0, roadOrigin - roadLayerHeight * 2, width, roadLayerHeight);

  fill(0, 85, 0);
  rect(0, backgroundFloorHeight, width, roadLayerHeight);

  pop();

  push();

  let sunTargetX = width + sunCircleMaxRadius + 1;
  let sunAlpha = sunElapsed / sunDuration;

  translate(lerp(sunStartX, sunTargetX, sunAlpha), lerp(sunStartY, sunTargetY, getQuadT(sunAlpha)));

  sunCircleElapsed++;
  sunElapsed++;

  noStroke();
  fill(255, 155, 0, 255 / 2);
  for (let i = 0; i < 2; i++) {
    circle(0, 0, lerp(sunCircleMin, sunCircleMax, abs(getLoopedT(sunCircleElapsed / sunCircleDuration) - i)));
  }

  if (sunCircleElapsed == sunCircleDuration) {
    sunCircleElapsed = 0;
  }
  if (sunElapsed == sunDuration) {
    sunElapsed = 0;
  }

  fill(255, 255, 0);
  circle(0, 0, sunCircleMin);

  pop();

  push();

  let towerTop = backgroundFloorHeight - towerHeight

  noStroke();
  fill(255, 100, 100);
  rect(towerSide, towerTop, 150, towerHeight);

  stroke(1);
  textSize(15);
  fill(200);
  text("SHOIOTER's Tower", towerSide + 8, towerTop + 35);

  fill(0, 155, 255);
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 2; x++) {
      stroke(150);
      strokeWeight(5);
      square(x * 70 + towerSide + 20, y * 60 + towerTop + 60, windowSize);
    }
  }

  pop();

  push();

  noStroke();
  fill(70, 70, 80);
  triangle(200, backgroundFloorHeight, 400, backgroundFloorHeight - 400, 600, backgroundFloorHeight);

  fill(100, 100, 110);
  triangle(80, backgroundFloorHeight, 190, backgroundFloorHeight - 200, 300, backgroundFloorHeight);

  fill(100, 100, 110);
  triangle(400, backgroundFloorHeight, 650, backgroundFloorHeight - 250, 900, backgroundFloorHeight);

  pop();
}

function keyPressed() {
  if (key == "Enter") {
    // Traffic light logic here, will make that later
    console.log("Enter pressed!");
  }
}