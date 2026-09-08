let circleDiameter = 40;
let startYPos = 400 - circleDiameter / 2;
let targetYPos = 200;
let ballElapsed = 0;
let ballDuration = 60;

let colorInterval = 35;

let currentBallColor = undefined;
let currentLightColor = 0;

let otherBallElapsed = 0;
let otherBallDuration = 30;
let otherBallMaxSize = 80;
let otherBallCurrentShape = "Ball";

let clickCount = 0;
let spaceCount = 1;

function setup() {
  createCanvas(600, 400);
}

function getQuadT(t) {
  return -pow(t * 2 - 1, 2) + 1;
}

function draw() {
  background(220);

  push();

  ballElapsed++;
  let ballT = getQuadT(ballElapsed / ballDuration);

  if (currentBallColor == undefined) {
    currentBallColor = color(0, 155, 255);
  }

  fill(currentBallColor);
  circle(width / 2, lerp(startYPos, targetYPos, ballT), circleDiameter);

  if (ballElapsed == ballDuration) {
    ballElapsed = 0;
    currentBallColor = color(random(0, 255), random(0, 255), random(0, 255));
  }

  pop();

  push();

  let lightColors = [
    color(255, 0, 0),
    color(255, 155, 0),
    color(0, 255, 0)
  ];

  if (frameCount % colorInterval == 0) {
    currentLightColor = (currentLightColor + 1) % lightColors.length;
  }
  fill(lightColors[currentLightColor]);
  circle(200, 200, 50);

  pop();

  push();

  fill(255, 0, 155)
  for (let x = 0; x < 30; x++) {
    square(10 * x + 50, noise(x * 0.1, frameCount / 60) * 150, 10);
  }

  pop();

  push();

  otherBallElapsed++;
  let otherBallT = getQuadT(otherBallElapsed / otherBallDuration);
  let newT = lerp(0, otherBallMaxSize, otherBallT);

  fill(155, 0, 255);
  if (otherBallCurrentShape == "Ball") {
    circle(75, 200, newT)
  } else if (otherBallCurrentShape == "Square") {
    square(75, 200, newT)
  } else if (otherBallCurrentShape == "Rectangle") {
    rect(75, 200, -newT / 2, -newT * 2);
  } else {
    ellipse(75, 200, -newT * 1.25, -newT * 4);
  }

  if (otherBallElapsed == otherBallDuration) {
    otherBallElapsed = 0
    if (otherBallCurrentShape == "Ball") {
      otherBallCurrentShape = "Square"
    } else if (otherBallCurrentShape == "Square") {
      otherBallCurrentShape = "Rectangle";
    } else if (otherBallCurrentShape == "Rectangle") {
      otherBallCurrentShape = "Elipse";
    } else {
      otherBallCurrentShape = "Ball";
    }
  }

  pop();

  push();

  fill(0, 155, 0);
  stroke(1);
  textSize(20);
  text("FrameCount: " + frameCount, 350, 200)

  pop();

  push();

  fill(255, 0, 255);
  stroke(1);
  textSize(20);
  text("Points: " + clickCount, 350, 170)

  pop();

  push();

  fill(0, 155, 255);
  stroke(1);
  textSize(20);
  text("Power: " + spaceCount, 350, 230)

  pop();
}

function mouseClicked() {
  clickCount += spaceCount;
}

function keyPressed() {
  spaceCount++;
}

// f12 or (ctlr + shift + i)