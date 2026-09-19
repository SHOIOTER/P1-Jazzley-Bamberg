let windowSize = 1000;
let windowOffset = windowSize / 2;

let boardScale = 0.65;
let boardSize = windowSize * boardScale;
let boardOffset = boardSize / 2;
let boardPos = windowOffset - boardOffset;

let gridSize = 3;
let gridStop = gridSize - 1;
let gridList = [];
for (let y = 0; y < gridSize; y++) {
  let rowValues = [];
  for (let x = 0; x < gridSize; x++) {
    rowValues[x] = 0;
  }
  gridList[y] = rowValues;
}

let buttonSize = boardSize / (gridSize * 1.35);
let buttonOffset = windowOffset - buttonSize / 2;
let buttonCornerSize = buttonSize / 6;
let buttonSpacing = buttonSize * 1.2;
let buttonsOnSide = gridSize / 2 - 0.5;
let buttonColors;
let buttonHoverColor;

let playerAmount = 2;
let currentPlayerID = 1;

let textPosX = windowSize / 2;
let textMinSize = 60;
let textMaxSize = 80;
let textScaleSpeed = 0.04;
let textMaxRotation;
let textRotateSpeed = 0.04;

let turnTextPosY = windowSize * (1 - boardScale) / 4;
let turnTextDrawColor;
let playerNames = [
  "Blue",
  "Red"
];

let resetTextPosY = windowSize - turnTextPosY;
let resetTextColor;
let resetTextHoverColor;
let resetTextColliderWidth = 400;
let resetTextColliderHeight = 50;
let resetTextColliderX = textPosX - resetTextColliderWidth / 2;
let resetTextColliderY = resetTextPosY - resetTextColliderHeight / 2;

let roundOver = false;
let roundOverText;

function setup() {
  buttonColors = [
    color(200),
    color(0, 0, 255),
    color(255, 0, 0),
    color(50)
  ];
  buttonHoverColor = color(100);

  textMaxRotation = radians(6);

  turnTextDrawColor = color(150);

  resetTextColor = color(255, 100, 0);
  resetTextHoverColor = color(100);

  createCanvas(windowSize, windowSize);
}

function getButtonSpacing(a) {
  return buttonSpacing * lerp(-buttonsOnSide, buttonsOnSide, a);
}

function forEachButton(callback) {
  for (let y = 0; y < gridSize; y++) {
    let rowValues = gridList[y];
    for (let x = 0; x < gridSize; x++) {
      callback(
        buttonOffset + getButtonSpacing(x / gridStop),
        buttonOffset + getButtonSpacing(y / gridStop),
        rowValues,
        x
      );
    }
  }
}

function mouseInBounds(buttonPosX, buttonPosY, sizeX, sizeY) {
  sizeX = (sizeX || buttonSize);
  sizeY = (sizeY || buttonSize);
  return mouseX >= buttonPosX
    && mouseX <= buttonPosX + sizeX
    && mouseY >= buttonPosY
    && mouseY <= buttonPosY + sizeY;
}

function boardIsFull() {
  let boardFull = true;

  for (rowValues of gridList) {
    for (colorValue of rowValues) {
      if (colorValue == 0) {
        boardFull = false;
        break;
      }
    }
    if (!boardFull) {
      break;
    }
  }

  return boardFull;
}

function draw() {
  background(0, 155, 255);

  noStroke();
  fill(0);
  square(boardPos, boardPos, boardSize, 50);

  forEachButton(function (buttonPosX, buttonPosY, rowValues, x) {
    let colorValue = rowValues[x];
    if (colorValue === 0 && mouseInBounds(buttonPosX, buttonPosY)) {
      fill(buttonHoverColor);
    } else {
      fill(buttonColors[colorValue]);
    }
    square(
      buttonPosX,
      buttonPosY,
      buttonSize,
      buttonCornerSize
    );
  });

  push();
  translate(textPosX, turnTextPosY);

  let textScaleAlpha = frameCount * textScaleSpeed;
  let textRotateAlpha = frameCount * textRotateSpeed;

  stroke(0);
  strokeWeight(5);
  fill(roundOverText && turnTextDrawColor || buttonColors[currentPlayerID]);
  textSize(lerp(textMinSize, textMaxSize, (sin(textScaleAlpha) + 1) / 2));
  rotate(textMaxRotation * cos(textRotateAlpha));
  textAlign(CENTER, CENTER);
  text(roundOverText || "It's " + playerNames[currentPlayerID - 1] + "'s turn!", 0, 0);

  pop();

  if (roundOver) {
    push();
    translate(textPosX, resetTextPosY);

    stroke(0);
    strokeWeight(5);
    if (mouseInBounds(
      resetTextColliderX,
      resetTextColliderY,
      resetTextColliderWidth,
      resetTextColliderHeight
    )) {
      fill(resetTextHoverColor);
    } else {
      fill(resetTextColor);
    }
    textSize(lerp(textMinSize, textMaxSize, (cos(textScaleAlpha) + 1) / 2));
    rotate(textMaxRotation * sin(textRotateAlpha));
    textAlign(CENTER, CENTER);
    text("New round!", 0, 0);

    pop();
  }
}

function mouseClicked() {
  forEachButton(function (buttonPosX, buttonPosY, rowValues, x) {
    if (rowValues[x] == 0 && mouseInBounds(buttonPosX, buttonPosY)) {
      rowValues[x] = currentPlayerID;
      currentPlayerID = currentPlayerID % playerAmount + 1;
    }
  });

  if (boardIsFull()) {
    if (roundOver) {
      if (mouseInBounds(
        resetTextColliderX,
        resetTextColliderY,
        resetTextColliderWidth,
        resetTextColliderHeight
      )) {
        for (let rowValues of gridList) {
          for (let x = 0; x < gridSize; x++) {
            rowValues[x] = 0;
          }
        }
        currentPlayerID = 1;
        roundOver = false;
        roundOverText = null;
      }
    } else {
      for (let rowValues of gridList) {
        for (let x = 0; x < gridSize; x++) {
          rowValues[x] = playerAmount + 1;
        }
      }
      roundOver = true;
      roundOverText = "Draw!";
    }
  }
}