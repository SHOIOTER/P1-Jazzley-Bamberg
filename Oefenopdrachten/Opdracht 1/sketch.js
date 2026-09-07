let chessboardPixelList = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 0, 1]
];
let chessboardPixelSize = 25;

let trafficLightFrameHeight = 140;
let trafficLightDiameter = 30;

let marioPixelList = [
  [-1, -1, -1, 0, 0, 0, 0, 0],
  [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1, -1, 1, 1, 1, 2, 2, 1, 2],
  [-1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2],
  [-1, 1, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2],
  [-1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1],
  [-1, -1, -1, 2, 2, 2, 2, 2, 2, 2],
  [-1, -1, 1, 1, 0, 1, 1, 1],
  [-1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
  [2, 2, 1, 0, 2, 0, 0, 2, 0, 1, 2, 2],
  [2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2],
  [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
  [-1, -1, 0, 0, 0, -1, -1, 0, 0, 0],
  [-1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1],
  [1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1]
];
let marioPixelSize = 8;

function setup() {
  createCanvas(600, 400);
}

function drawPixels(pixelList, pixelSize, pixelColors, xOffset, yOffset) {
  for (let y = 0; y < pixelList.length; y++) {
    let pixelRow = pixelList[y];
    for (let x = 0; x < pixelRow.length; x++) {
      let pixelColor = pixelColors[pixelRow[x]];
      if (pixelColor) {
        fill(pixelColor);
        square(x * pixelSize + xOffset, y * pixelSize, pixelSize + yOffset);
      }
    }
  }
}

function draw() {
  background(220);

  // My name
  push();
  translate(20, 25);

  text("1:", 0, 0);

  textSize(10);
  fill(0, 100, 0);
  text("Jazzley Bamberg", 15, 0);

  pop();

  // Dutch flag
  push();
  translate(20, 60);

  text("2:", 0, 0);

  noStroke();
  fill(255, 0, 0);
  rect(15, 0, 100, 20);
  fill(255);
  rect(15, 20, 100, 20);
  fill(0, 0, 255);
  rect(15, 40, 100, 20);

  pop();

  // Chessboard
  push();
  translate(20, 150);

  let chessboardPixelColors = [
    color(255),
    color(0)
  ];

  text("3:", 0, 0)

  noFill();
  strokeWeight(5);
  square(15, 0, chessboardPixelSize * 3);

  noStroke();
  drawPixels(chessboardPixelList, chessboardPixelSize, chessboardPixelColors, 15, 0);

  pop();

  // Transparent house
  push();
  translate(20, 290);

  text("4:", 0, 0);

  noFill();
  strokeWeight(5);
  triangle(20, 0, 60, -35, 100, 0);
  square(20, 0, 80);

  pop();

  // Traffic light
  push();
  translate(150, 25);

  text("5:", 0, 0);

  noStroke();
  fill(150, 150, 150);
  rect(25, 0, 40, trafficLightFrameHeight);
  rect(35, trafficLightFrameHeight, 20, 40);

  let trafficLightRadius = trafficLightDiameter / 2;

  fill(255, 0, 0);
  circle(45, trafficLightRadius + 10, trafficLightDiameter);

  fill(255, 155, 0);
  circle(45, 70, trafficLightDiameter);

  fill(0, 255, 0);
  circle(45, trafficLightFrameHeight - trafficLightRadius - 10, trafficLightDiameter);

  pop();

  // Pixel Mario
  push();
  translate(350, 35);

  let marioPixelColors = [
    color(255, 0, 0),
    color(0, 120, 0),
    color(155, 155, 0)
  ];

  text("7:", 0, 0);

  text("Mario", 30, -10);

  noStroke();
  drawPixels(marioPixelList, marioPixelSize, marioPixelColors, 15, 0);

  pop();
}