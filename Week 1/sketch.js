let chessboardPixelList = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 0, 1]
];
let chessboardPixelSize = 25;

let trafficLightFrameHeight = 140;
let trafficLightDiameter = 30;
let trafficLightRadius = trafficLightDiameter / 2;

let diceSize = 100;
let halfDiceSize = diceSize / 2;
let diceDotDiameter = 25;
let diceDotRadius = diceDotDiameter / 2;

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

let redScientistPixelList = [
  [-1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0],
  [-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0],
  [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1, -1, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0],
  [-1, 0, 0, 0, 2, 1, 1, 2, 0, 0, 2, 1, 1, 2, 0, 0, 0],
  [-1, 0, 0, 0, 2, 1, 1, 2, 0, 0, 2, 1, 1, 2, 0, 0, 0],
  [-1, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 0],
  [-1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1, -1, -1, -1, 2, 2, 2, 0, 3, 3, 0, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 0, 3, 3, 0, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, -1, 2, 2, 2, 2, 0, 3, 3, 0, 2, 2, 2, 2, -1, 2, 2],
  [2, 2, -1, 2, 2, 2, 2, 0, 3, 3, 0, 2, 2, 2, 2, -1, 2, 2],
  [2, 2, -1, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, -1, 2, 2],
  [2, 2, -1, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, -1, 2, 2],
  [2, 2, -1, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, -1, 2, 2],
  [2, 2, -1, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, -1, 2, 2],
  [3, 3, -1, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, -1, 3, 3],
  [3, 3, -1, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, -1, 3, 3],
  [3, 3, -1, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, -1, 3, 3],
  [-1, -1, -1, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2],
  [-1, -1, -1, -1, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
  [-1, -1, -1, -1, -1, 2, 2, 3, -1, -1, 3, 2, 2],
  [-1, -1, -1, -1, -1, 2, 2, 3, -1, -1, 3, 2, 2],
  [-1, -1, -1, -1, -1, 2, 2, 3, -1, -1, 3, 2, 2],
  [-1, -1, -1, -1, -1, 2, 2, 3, -1, -1, 3, 2, 2],
  [-1, -1, -1, -1, -1, 2, 2, 3, -1, -1, 3, 2, 2],
  [-1, -1, -1, -1, -1, 3, 3, 3, -1, -1, 3, 3, 3],
  [-1, -1, -1, -1, -1, 3, 3, 3, -1, -1, 3, 3, 3],
  [-1, -1, -1, -1, -1, 3, 3, 3, -1, -1, 3, 3, 3],
  [-1, -1, -1, -1, 3, 3, 3, 3, -1, -1, 3, 3, 3, 3],
  [-1, -1, -1, 3, 3, 3, 3, 3, -1, -1, 3, 3, 3, 3, 3],
  [-1, -1, -1, 3, 3, 3, 3, 3, -1, -1, 3, 3, 3, 3, 3],
];
let redScientistPixelSize = 5;

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
        square(x * pixelSize + (xOffset || 0), y * pixelSize + (yOffset || 0), pixelSize);
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
  drawPixels(chessboardPixelList, chessboardPixelSize, chessboardPixelColors, 15);

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

  fill(255, 0, 0);
  circle(45, trafficLightRadius + 10, trafficLightDiameter);

  fill(255, 155, 0);
  circle(45, 70, trafficLightDiameter);

  fill(0, 255, 0);
  circle(45, trafficLightFrameHeight - trafficLightRadius - 10, trafficLightDiameter);

  pop();

  // Dice

  push();
  translate(150, 250);

  text("6:", 0, 0);

  fill(255);
  strokeWeight(3);
  square(20, 0, diceSize, 15);

  // Used circles instead of dots, but too lazy to change

  fill(0);
  noStroke();
  circle(20 + diceDotRadius + 10, diceDotRadius + 10, diceDotDiameter);
  circle(20 + halfDiceSize, halfDiceSize, diceDotDiameter);
  circle(20 + diceSize - diceDotRadius - 10, diceSize - diceDotRadius - 10, diceDotDiameter);

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
  drawPixels(marioPixelList, marioPixelSize, marioPixelColors, 15);

  pop();

  // Red Scientist

  push();
  translate(300, 200);

  let redScientistPixelColors = [
    color(255, 0, 0),
    color(0),
    color(255),
    color(50, 50, 50)
  ];

  text("8:", 0, 0);

  text("Red Scientist", 30, -10);

  noStroke();
  drawPixels(redScientistPixelList, redScientistPixelSize, redScientistPixelColors, 50);

  pop();
}