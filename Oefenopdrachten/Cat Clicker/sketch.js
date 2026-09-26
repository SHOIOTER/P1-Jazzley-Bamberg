let windowWidth = 1024;
let windowHeight = 768;

let pointName = "cat points";
let pointCount = 0;
let pointsPerClick = 1000000;
let pointsPerSecond = 400;

let leftElementPosX = windowWidth / 5;

let pointIndicatorPosY = windowHeight / 12;
let pointIndicatorSize = 30;
let pointIndicatorAnimSpeed = 0.03;
let pointIndicatorFloatAmplitude = 15;
let pointIndicatorRotation;
let pointIndicatorColor;

let catImage;
let catImagePosY = windowHeight / 2;
let catImageRadius;
let catImageHoverScale = 1.06;
let catImagePressScale = 0.96;

let clickSound;

let compactNumFormat;

function mouseOnCatImage() {
  return dist(mouseX, mouseY, leftElementPosX, catImagePosY) <= catImageRadius;
}

function preload() {
  catImage = loadImage("./Assets/Cat.png", function (catImage) {
    catImage.resize(catImage.width * 0.4, catImage.height * 0.4);
    catImageRadius = max(catImage.width, catImage.height) / 2;
  });
  clickSound = loadSound("./Assets/Click.mp3");
}

function setup() {
  pointIndicatorRotation = radians(6);
  pointIndicatorColor = color(0, 155, 255);

  compactNumFormat = Intl.NumberFormat(
    "en-US",
    {
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

  let pointIndicatorAnimAlpha = frameCount * pointIndicatorAnimSpeed;

  translate(
    leftElementPosX,
    pointIndicatorPosY + sin(pointIndicatorAnimAlpha) * pointIndicatorFloatAmplitude
  );

  stroke(0);
  strokeWeight(4);
  rotate(cos(pointIndicatorAnimAlpha) * pointIndicatorRotation);
  textSize(pointIndicatorSize);
  textAlign(CENTER, CENTER);
  fill(pointIndicatorColor);
  text(compactNumFormat(floor(pointCount)) + " " + pointName, 0, 0);

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