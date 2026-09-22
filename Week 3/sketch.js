let windowSize = 1000;
let windowOffset = windowSize / 2;

let boardScale = 0.65;
let boardSize = windowSize * boardScale;
let boardOffset = boardSize / 2;
let boardPos = windowOffset - boardOffset;

// This controls the side of the board, a bigger number means more buttons

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
let buttonNoLineColor;

// This controls how many players there are

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
let turnTextBounceStart = turnTextPosY * 2;
let turnTextBounceDuration = 60;
let turnText;

/*
   These are the names of the players, if a name is missing it defaults to "undefined"
   That's actually unintentional
   But when adding undefined to a string, it actually says for example: "It's undefined's turn"
*/

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
let resetTextFloatAmplitude = turnTextPosY / 3;
let resetTextFloatDuration = 90;

let roundOver = false;
let roundOverText;

let checkWinConditionFunctions = [];

let clickSound;
let drawSound;
let winSounds;
let restartSound;

// Initializing some variables in the setup function

function preload() {
  clickSound = loadSound("./Assets/Button_Click.mp3");
  drawSound = loadSound("./Assets/Draw_Sound.mp3");
  winSounds = [
    loadSound("./Assets/Green_Giant.mp3"),
    loadSound("./Assets/Heheheha.mp3")
  ];
  restartSound = loadSound("./Assets/Green_Giant.mp3");
}

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

  turnTextColor = color(0, 200, 255);

  resetTextColor = color(255, 200, 0);
  resetTextHoverColor = color(150);

  createCanvas(windowSize, windowSize);
}

// Calculates the spacing for the button, used to place every specific button

function getButtonSpacing(a) {
  return buttonSpacing * lerp(-buttonsOnSide, buttonsOnSide, a);
}

/*
   A function that calls the callback function for every button
   The callback has some parameters
   The x and y position of the button, the rowValues and the x value
*/

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

// Returns true if the mouse is inside of the button's bounds

function mouseInBounds(buttonPosX, buttonPosY, sizeX, sizeY) {
  return mouseX > buttonPosX
    && mouseX < buttonPosX + (sizeX || buttonSize)
    && mouseY > buttonPosY
    && mouseY < buttonPosY + (sizeY || buttonSize);
}

// Displays the buttons on the board, also making sure they get the right color

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

/*
   Changes the current player to something else
   Also resets the backgroundlerping values, so it will lerp towards the new player color
*/

function changeCurrentPlayer(newCurrentPlayerID) {
  backgroundTransitionStart = buttonColors[currentPlayerID] || buttonNoLineColor;
  backgroundTransitionElapsed = 0;
  currentPlayerID = newCurrentPlayerID;
}

/*
   Checks if any buttons are clicked, will be called inside the mouseClicked function
   If that's the case, it will place the right value into the right column inside the row
   Which will make it clear which player clicked that button
*/

function clickButtons(buttonPosX, buttonPosY, rowValues, x) {
  if (rowValues[x] == 0 && mouseInBounds(buttonPosX, buttonPosY)) {
    clickSound.play();
    rowValues[x] = currentPlayerID;
    changeCurrentPlayer(currentPlayerID % playerAmount + 1);
  }
}

/*
   This checks if the board is full
   This is done after checking if there are lines formed
   This will always result in a draw if board is full and no lines were formed
*/

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

/*
   This makes the round end, will also asign the endText to the roundOverText
   Which will make it that the top text will display something else besides who's turn it is
*/

function endRound(endText, noLineGridList) {
  noLineGridList = noLineGridList || []

  for (let y = 0; y < gridSize; y++) {
    let rowValues = gridList[y];
    let noLineRowValues = noLineGridList[y] || [];

    for (let x = 0; x < gridSize; x++) {
      if (!noLineRowValues[x]) {
        rowValues[x] = -1;
      }
    }
  }

  roundOverText = endText;
  roundOver = true;
  (winSounds[currentPlayerID - 1] || drawSound).play();
}

function getQuadBounceAlpha(t) {
  return -pow(t * 2 - 1, 2) + 1;
}

function getQuadFloatAmplitude(t) {
  return abs(t * 2 - 1) * 2 - 1;
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
  translate(textPosX, lerp(turnTextBounceStart, turnTextPosY, getQuadBounceAlpha(frameCount % turnTextBounceDuration / turnTextBounceDuration)));

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

  // If the round is over, the reset button will appear

  if (roundOver) {
    push();
    translate(
      textPosX,
      resetTextPosY + getQuadFloatAmplitude(frameCount % resetTextFloatDuration / resetTextFloatDuration) * resetTextFloatAmplitude
    );

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

  /*
     If the round is over it will check if the reset button is clicked
     Else it will check if a line win condition has formed
  */

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
      restartSound.play();
    }
  } else {
    for (let checkWinCondition of checkWinConditionFunctions) {
      let [winningPlayerID, noLineGridList] = checkWinCondition();
      if (winningPlayerID) {
        currentPlayerID = winningPlayerID;
        endRound(
          playerNames[winningPlayerID - 1] + " has won!",
          noLineGridList
        );
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
  let noLineGridList = [];

  for (let y = 0; y < gridSize; y++) {
    let rowValues = gridList[y];
    let firstColorValue = rowValues[0];

    if (firstColorValue > 0) {
      let noLineRowValues = [true];
      let lineFormed = true;

      for (let x = 1; x < gridSize; x++) {
        noLineRowValues[x] = true;

        if (rowValues[x] != firstColorValue) {
          lineFormed = false;
          break
        }
      }

      if (lineFormed) {
        winningPlayerID = firstColorValue;
        noLineGridList[y] = noLineRowValues;
        break;
      }
    }
  }

  return [winningPlayerID, noLineGridList];
})

// Vertical checking

checkWinConditionFunctions.push(function () {
  let winningPlayerID;
  let noLineGridList = [];

  for (let x = 0; x < gridSize; x++) {
    let firstColorValue = gridList[0][x]

    if (firstColorValue > 0) {
      let noLineRowValues = [];
      let lineFormed = true;

      noLineRowValues[x] = true;
      noLineGridList[0] = noLineRowValues;

      for (let y = 1; y < gridSize; y++) {
        noLineRowValues = [];

        noLineRowValues[x] = true;
        noLineGridList[y] = noLineRowValues

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

  return [winningPlayerID, noLineGridList];
})

/// Diagonally checking

checkWinConditionFunctions.push(function () {
  let winningPlayerID;
  let noLineGridList = [];
  let firstColorValue = gridList[0][0];

  if (firstColorValue > 0) {
    let noLineRowValues = [true];
    let lineFormed = true;

    noLineGridList[0] = noLineRowValues;

    for (let y = 1; y < gridSize; y++) {
      noLineRowValues = [];

      noLineRowValues[y] = true;
      noLineGridList[y] = noLineRowValues;

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
      let noLineRowValues = [];
      let lineFormed = true;

      noLineRowValues[gridStop] = true;
      noLineGridList[0] = noLineRowValues;

      for (let y = 1; y < gridSize; y++) {
        let x = abs(y - gridStop);
        noLineRowValues = [];

        noLineRowValues[x] = true;
        noLineGridList[y] = noLineRowValues;

        if (gridList[y][x] != firstColorValue) {
          lineFormed = false;
        }
      }

      if (lineFormed) {
        winningPlayerID = firstColorValue;
      }
    }
  }

  return [winningPlayerID, noLineGridList];
})