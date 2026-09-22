let windowSize = 1000;
let windowOffset = windowSize / 2;

let boardScale = 0.65;
let boardSize = windowSize * boardScale;
let boardOffset = boardSize / 2;
let boardPos = windowOffset - boardOffset;

let gridSize = 4;
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
let buttonNoLineColor;

let playerAmount = 2;
let currentPlayerID = 1;

let backgroundTransitionStart;
let backgroundTransitionDuration = 15;
let backgroundTransitionElapsed = backgroundTransitionDuration;

let textPosX = windowSize / 2;
let textMinSize = 60;
let textMaxSize = 80;
let textScaleSpeed = 0.04;
let textMaxRotation;
let textRotateSpeed = 0.04;

let turnTextPosY = windowSize * (1 - boardScale) / 4;
let turnText;
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

let checkWinConditionFunctions = [];

function setup() {
  buttonColors = [
    color(200),
    color(0, 0, 255),
    color(255, 0, 0)
  ];
  buttonHoverColor = color(100);
  buttonNoLineColor = color(50);

  backgroundTransitionStart = buttonColors[currentPlayerID];

  textMaxRotation = radians(6);

  turnTextColor = color(200);

  resetTextColor = color(255, 155, 0);
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
  return mouseX >= buttonPosX
    && mouseX <= buttonPosX + (sizeX || buttonSize)
    && mouseY >= buttonPosY
    && mouseY <= buttonPosY + (sizeY || buttonSize);
}

function drawButtons(buttonPosX, buttonPosY, rowValues, x) {
  let colorValue = rowValues[x];
  if (colorValue === 0 && mouseInBounds(buttonPosX, buttonPosY)) {
    fill(buttonHoverColor);
  } else {
    fill(buttonColors[colorValue] || buttonNoLineColor);
  }
  square(
    buttonPosX,
    buttonPosY,
    buttonSize,
    buttonCornerSize
  );
}

function changeCurrentPlayer(newCurrentPlayerID) {
  backgroundTransitionStart = buttonColors[currentPlayerID] || buttonNoLineColor;
  backgroundTransitionElapsed = 0;
  currentPlayerID = newCurrentPlayerID;
}

function clickButtons(buttonPosX, buttonPosY, rowValues, x) {
  if (rowValues[x] == 0 && mouseInBounds(buttonPosX, buttonPosY)) {
    rowValues[x] = currentPlayerID;
    changeCurrentPlayer(currentPlayerID % playerAmount + 1)
  }
}

function boardIsFull() {
  let boardFull = true;

  for (let rowValues of gridList) {
    for (let colorValue of rowValues) {
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

function endRound(endText) {
  for (let y = 0; y < gridSize; y++) {
    let rowValues = gridList[y];
    for (let x = 0; x < gridSize; x++) {
      rowValues[x] = -1;
    }
  }
  roundOverText = endText;
  roundOver = true;
}

function draw() {
  let backgroundTransitionAlpha = 1;

  if (backgroundTransitionElapsed < backgroundTransitionDuration) {
    backgroundTransitionElapsed++;
    backgroundTransitionAlpha = backgroundTransitionElapsed / backgroundTransitionDuration;
  }

  background(
    lerpColor(
      backgroundTransitionStart,
      buttonColors[currentPlayerID] || buttonNoLineColor,
      backgroundTransitionAlpha
    )
  );

  noStroke();
  fill(0);
  square(boardPos, boardPos, boardSize, 50);

  forEachButton(drawButtons);

  push();
  translate(textPosX, turnTextPosY);

  let textScaleAlpha = frameCount * textScaleSpeed;
  let textRotateAlpha = frameCount * textRotateSpeed;

  stroke(0);
  strokeWeight(5);
  fill(turnTextColor);
  textSize(lerp(textMinSize, textMaxSize, (sin(textScaleAlpha) + 1) / 2));
  rotate(textMaxRotation * cos(textRotateAlpha));
  textAlign(CENTER, CENTER);
  text(
    roundOver && roundOverText || "It's " + playerNames[currentPlayerID - 1] + "'s turn!",
    0,
    0
  );

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
  forEachButton(clickButtons);

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
      changeCurrentPlayer(1);
      roundOver = false;
    }
  } else {
    for (let checkWinCondition of checkWinConditionFunctions) {
      let winningPlayerID = checkWinCondition();
      if (winningPlayerID) {
        currentPlayerID = winningPlayerID;
        endRound(playerNames[winningPlayerID - 1] + " has won!");
        return;
      }
    }
    if (boardIsFull()) {
      currentPlayerID = -1;
      endRound("Draw!");
    }
  }
}

// Horizontal checking

checkWinConditionFunctions.push(function () {
  let winningPlayerID;

  for (let y = 0; y < gridSize; y++) {
    let rowValues = gridList[y];
    let firstColorValue = rowValues[0];
    if (firstColorValue > 0) {
      let lineFormed = true;
      for (let x = 1; x < gridSize; x++) {
        if (rowValues[x] != firstColorValue) {
          lineFormed = false;
          break
        }
      }
      if (lineFormed) {
        winningPlayerID = firstColorValue;
        break;
      }
    }
  }

  return winningPlayerID;
})

// Vertical checking

checkWinConditionFunctions.push(function () {
  let winningPlayerID;

  for (let x = 0; x < gridSize; x++) {
    let firstColorValue = gridList[0][x]
    if (firstColorValue > 0) {
      let lineFormed = true;
      for (let y = 1; y < gridSize; y++) {
        if (gridList[y][x] != firstColorValue) {
          lineFormed = false;
          break;
        }
      }
      if (lineFormed) {
        winningPlayerID = firstColorValue;
        break;
      }
    }
  }

  return winningPlayerID;
})

/// Diagonally checking

checkWinConditionFunctions.push(function () {
  let winningPlayerID;
  let firstColorValue = gridList[0][0];

  if (firstColorValue > 0) {
    let lineFormed = true;

    for (let y = 1; y < gridSize; y++) {
      if (gridList[y][y] != firstColorValue) {
        lineFormed = false;
      }
    }

    if (lineFormed) {
      winningPlayerID = firstColorValue;
    }
  }

  if (!winningPlayerID) {
    firstColorValue = gridList[0][gridStop];

    if (firstColorValue > 0) {
      let lineFormed = true;

      for (let y = 1; y < gridSize; y++) {
        if (gridList[y][abs(y - gridStop)] != firstColorValue) {
          lineFormed = false;
        }
      }

      if (lineFormed) {
        winningPlayerID = firstColorValue;
      }
    }
  }

  return winningPlayerID;
})