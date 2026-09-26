let windowWidth = 1280;
let windowHeight = 720;

let pointName = "cat coins";
let pointCount = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;

let leftElementPosX = windowWidth / 4;
let textElementFont;

let pointIndicatorPosY = windowHeight / 10;
let pointIndicatorSize = 40;
let pointIndicatorAnimSpeed = 0.002;
let pointIndicatorFloatAmplitude = 15;
let pointIndicatorRotation;
let pointIndicatorColor;

let ppsIndicatorPosY = windowHeight / 5;
let ppsIndicatorMinSize = 30;
let ppsIndicatorMaxSize = 40;
let ppsIndicatorAnimSpeed = 0.0015;
let ppsIndicatorPointsAbbreviation;
let ppsIndicatorColor;

let catImage;
let catImagePosY = windowHeight * 0.6;
let catImageRadius;
let catImageHoverScale = 1.06;
let catImagePressScale = 0.96;

let clickSound;

let formatNumber;

function mouseOnCatImage() {
  return dist(mouseX, mouseY, leftElementPosX, catImagePosY) <= catImageRadius;
}

function abbreviateString(str) {
  return str.trim().split(/\s+/).map(word => word.charAt(0)).join('').toLowerCase();
}

function setup() {
  textElementFont = loadFont("./Assets/LilitaOne-Regular.ttf");
  catImage = loadImage("./Assets/Cat.png", function (catImage) {
    catImage.resize(catImage.width / 2, catImage.height / 2);
    catImageRadius = max(catImage.width, catImage.height) / 2;
  });
  clickSound = loadSound("./Assets/Click.mp3");

  pointIndicatorRotation = radians(6);
  pointIndicatorColor = color(0, 155, 255);

  ppsIndicatorPointsAbbreviation = abbreviateString(pointName);
  ppsIndicatorColor = color(255, 155, 0);

  formatNumber = Intl.NumberFormat(
    "en-US",
    {
      notation: "compact",
      maximumFractionDigits: 2
    }
  ).format;

  imageMode(CENTER);

  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(155, 255, 155);

  pointCount += pointsPerSecond * deltaTime / 1000;

  push();

  let pointIndicatorAnimAlpha = millis() * pointIndicatorAnimSpeed;

  translate(
    leftElementPosX,
    pointIndicatorPosY + sin(pointIndicatorAnimAlpha) * pointIndicatorFloatAmplitude
  );

  stroke(0);
  strokeWeight(4);
  rotate(cos(pointIndicatorAnimAlpha) * pointIndicatorRotation);
  textSize(pointIndicatorSize);
  textAlign(CENTER, CENTER);
  textFont(textElementFont);
  fill(pointIndicatorColor);
  text(`${formatNumber(floor(pointCount))} ${pointName}`, 0, 0);

  pop();

  push();
  translate(leftElementPosX, ppsIndicatorPosY);

  stroke(0);
  strokeWeight(4);
  textSize(lerp(ppsIndicatorMinSize, ppsIndicatorMaxSize, (sin(millis() * ppsIndicatorAnimSpeed) + 1) / 2));
  textAlign(CENTER, CENTER);
  textFont(textElementFont);
  fill(ppsIndicatorColor);
  text(`${formatNumber(pointsPerSecond)} ${ppsIndicatorPointsAbbreviation}/s`, 0, 0);

  pop();

  push();
  translate(leftElementPosX, catImagePosY);

  if (mouseOnCatImage()) {
    scale(mouseIsPressed && catImagePressScale || catImageHoverScale);
  }

  image(catImage, 0, 0);

  pop();
}

function mouseClicked() {
  if (mouseOnCatImage()) {
    pointCount += pointsPerClick;
    clickSound.play();
  }
}