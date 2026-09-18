let windowSize = 1000;
let boardSize = windowSize * 0.65;
let boardOffset = boardSize / 2;
let boardPos = windowSize / 2 - boardOffset;

let gridSize = 3;
let gridOffset;
let gridList = [];
for (let y = 0; y < gridSize; y++) {
  let newRow = [];
  for (let x = 0; x < gridSize; x++) {
    newRow[x] = 0;
  }
  gridList[y] = newRow;
}

let buttonSize = boardSize / 4;
let buttonOffset = buttonSize / 2;
let buttonCornerSize = buttonSize / 6;
let buttonSpacing = 20;
let buttonColors;

function setup() {
  gridOffset = ceil(gridSize / 2);

  buttonColors = [
    color(200),
    color(150),
    color(0, 0, 255),
    color(255, 0, 0)
  ];

  createCanvas(windowSize, windowSize);
}

function draw() {
  background(220);

  noStroke();
  fill(0);
  square(boardPos, boardPos, boardSize, 50);

  gridList.forEach(function (row, y) {
    row.forEach(function (value, x) {
      let xOffset = x + 1 - gridOffset;
      let yOffset = y + 1 - gridOffset;
      fill(buttonColors[value]);
      square(
        0,
        0,
        buttonSize,
        buttonCornerSize
      );
    });
  });
}