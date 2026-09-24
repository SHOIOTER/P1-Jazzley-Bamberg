let windowSize = 1000;
let windowOffset = windowSize / 2;

let boardScale = 0.65;
let boardSize = windowSize * boardScale;
let boardOffset = boardSize / 2;
let boardPos = windowOffset - boardOffset;

// This controls the side of the board, a bigger number means more buttons

let minGridSize = 3;
let maxGridSize = 6;
let gridSize;
let gridStop;
let gridList;

let buttonSize;
let buttonOffset;
let buttonCornerSize;
let buttonSpacing;
let buttonsOnSide;
let buttonColors;
let buttonHoverColor;
let buttonNoLineColor;

// This controls how many players there are

let minPlayers = 2;
let maxPlayers = 4;
let playerAmount;
let currentPlayerID = 1;

let backgroundTransitionStart;
let backgroundTransitionDuration = 15;
let backgroundTransitionElapsed = backgroundTransitionDuration;

let textPosX = windowSize / 2;
let textScaleSpeed = 0.04;
let textMaxRotation;
let textRotateSpeed = 0.04;
let textHoverColor;

let turnTextMinSize = 60;
let turnTextMaxSize = 80;
let turnTextPosY = windowSize * (1 - boardScale) / 4;
let turnTextBounceStart = turnTextPosY * 2;
let turnTextBounceDuration = 60;
let turnTextColor;
let turnText;

/*
   These are the names of the players, if a name is missing it defaults to "undefined"
   That's actually unintentional
   But when adding undefined to a string, it actually says for example: "It's undefined's turn"
*/

let playerNames = [
  "Blue",
  "Red",
  "Green",
  "Pink",
];

let endTextMinSize = 30;
let endTextMaxSize = 40;
let endTextPosY = windowSize - turnTextPosY;
let endTextFloatAmplitude = turnTextPosY / 2;
let endTextFloatSpeed = 0.02;
let endTextHeight = 0;
let endTextHalfHeight = 0;

let resetTextString = "Restart round";
let resetTextColor;
let resetTextPosX = textPosX - 150;
let resetTextPosY = 0;
let resetTextWidth = 0;

let returnTextString = "Return to menu";
let returnTextColor;
let returnTextPosX = textPosX + 150;
let returnTextPosY = 0;
let returnTextWidth = 0;

let checkWinConditionFunctions = [];

let clickSound;
let drawSound;
let winSounds;
let restartSound;
let backToMenuSound;
let startGameSound;

let onMenu = true;
let roundOver = false;
let roundOverText;

let menuBackgroundColor;

let gameTitleTextString = "Tic Tac Toe";
let gameTitleTextSize = 175;
let gameTitleTextRotateSpeed = 0.015;
let gameTitleTextPosY = 225;
let gameTitleTextColor;

let sliderTextFloatAmplitude = 25;
let sliderTextFloatSpeed = 0.02;
let sliderTextSize = 50;
let sliderPosX = windowOffset / 2;

let gridSizeSlider;
let gridSizeSliderPosY = windowOffset - 25;

let gridSizeTextPosY = gridSizeSliderPosY - 62.5;
let gridSizeTextColor;

let playerAmountSlider;
let playerAmountSliderPosY = windowOffset + 125;

let playerAmountTextPosY = playerAmountSliderPosY - 62.5;
let playerAmountTextColor;

let startTextString = "Start game!";
let startTextScaleSpeed = 0.015;
let startTextMinSize = 100;
let startTextMaxSize = 125;
let startTextPosY = windowSize - 200;
let startTextWidth = 0;
let startTextHeight = 0;
let startTextColor;

// This calculates everything in order for the sized board to work

function calculateButtons(size) {
  gridSize = size;
  gridStop = gridSize - 1;
  gridList = [];
  for (let y = 0; y < gridSize; y++) {
    let rowValues = [];
    for (let x = 0; x < gridSize; x++) {
      rowValues[x] = 0;
    }
    gridList[y] = rowValues;
  }

  buttonSize = boardSize / (gridSize * 1.35);
  buttonOffset = windowOffset - buttonSize / 2;
  buttonCornerSize = buttonSize / 6;
  buttonSpacing = buttonSize * 1.2;
  buttonsOnSide = gridSize / 2 - 0.5;
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
    && mouseY < buttonPosY + (sizeY || buttonSize)
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

function changeCurrentPlayer(newCurrentPlayerID, noBackgroundLerp) {
  if (!noBackgroundLerp) {
    backgroundTransitionStart = buttonColors[currentPlayerID] || buttonNoLineColor;
    backgroundTransitionElapsed = 0;
  }
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
  noLineGridList = noLineGridList || [];

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

// Calculates an alpha that bounces

function getQuadBounceAlpha(t) {
  return -pow(t * 2 - 1, 2) + 1;
}

function resetRound(noBackgroundLerp) {
  changeCurrentPlayer(1, noBackgroundLerp);
  roundOver = false;
}

// Initializing some variables in the setup function

function preload() {
  clickSound = loadSound("./Assets/ButtonClick.mp3");
  clickSound.setVolume(0.3);

  drawSound = loadSound("./Assets/Draw.mp3");
  drawSound.setVolume(0.5);

  winSounds = [
    loadSound("./Assets/WinPlayer1.mp3"),
    loadSound("./Assets/WinPlayer2.mp3"),
    loadSound("./Assets/WinPlayer3.mp3"),
    loadSound("./Assets/WinPlayer4.mp3")
  ];

  winSounds[0].setVolume(0.1);
  winSounds[1].setVolume(0.1);
  winSounds[2].setVolume(0.4);
  winSounds[3].setVolume(0.05);

  restartSound = loadSound("./Assets/RestartGame.mp3");
  restartSound.setVolume(0.4);

  backToMenuSound = loadSound("./Assets/BackToMenu.mp3");
  backToMenuSound.setVolume(0.3);

  startGameSound = loadSound("./Assets/GameStart.mp3");
  startGameSound.setVolume(0.05);
}

function setup() {
  buttonColors = [
    color(200),
    color(0, 0, 255),
    color(255, 0, 0),
    color(0, 185, 0),
    color(255, 0, 255)
  ];
  buttonHoverColor = color(100);
  buttonNoLineColor = color(50);

  backgroundTransitionStart = buttonColors[currentPlayerID];

  textMaxRotation = radians(6);
  textHoverColor = color(150);

  turnTextColor = color(0, 200, 255);

  resetTextColor = color(255, 200, 0);

  returnTextColor = color(255, 0, 255);

  menuBackgroundColor = color(100, 200, 150);

  gameTitleTextColor = color(75, 150, 75);

  gridSizeSlider = createSlider(minGridSize, maxGridSize, minGridSize, 1);
  gridSizeSlider.position(sliderPosX, gridSizeSliderPosY);
  gridSizeSlider.size(windowOffset);
  gridSizeSlider.input(function () {
    clickSound.play();
  });

  gridSizeTextColor = color(155, 0, 255);

  playerAmountSlider = createSlider(minPlayers, maxPlayers, minPlayers, 1);
  playerAmountSlider.position(sliderPosX, playerAmountSliderPosY);
  playerAmountSlider.size(windowOffset);
  playerAmountSlider.input(function () {
    clickSound.play();
  });

  playerAmountTextColor = color(255, 0, 155);

  startTextColor = color(200, 200, 0);

  createCanvas(windowSize, windowSize);
}

function draw() {
  // If the menu is on, it will draw the menu instead

  if (onMenu) {
    background(menuBackgroundColor);

    push();
    translate(textPosX, gameTitleTextPosY);

    stroke(0);
    strokeWeight(5);

    fill(gameTitleTextColor);
    textSize(gameTitleTextSize);
    rotate(cos(frameCount * gameTitleTextRotateSpeed) * textMaxRotation);
    textAlign(CENTER, CENTER);
    text(gameTitleTextString, 0, 0);

    pop();

    let sliderTextFloatAlpha = frameCount * sliderTextFloatSpeed;

    push();
    translate(
      textPosX,
      gridSizeTextPosY + sin(sliderTextFloatAlpha) * sliderTextFloatAmplitude
    );

    stroke(0);
    strokeWeight(5);

    fill(gridSizeTextColor);
    textSize(sliderTextSize);
    textAlign(CENTER, CENTER);
    text("Level " + (gridSizeSlider.value() - 2) + " board", 0, 0);

    pop();

    push();
    translate(
      textPosX,
      playerAmountTextPosY + cos(sliderTextFloatAlpha) * sliderTextFloatAmplitude
    );

    stroke(0);
    strokeWeight(5);

    fill(playerAmountTextColor);
    textSize(sliderTextSize);
    textAlign(CENTER, CENTER);
    text(playerAmountSlider.value() + " Players", 0, 0);

    pop();

    push();
    translate(textPosX, startTextPosY);

    stroke(0);
    strokeWeight(5);

    if (mouseInBounds(
      textPosX - startTextWidth / 2,
      startTextPosY - startTextHeight / 2,
      startTextWidth,
      startTextHeight
    )) {
      fill(textHoverColor);
    } else {
      fill(startTextColor);
    }

    textSize(lerp(startTextMinSize, startTextMaxSize, (sin(frameCount * startTextScaleSpeed) + 1) / 2));
    textAlign(CENTER, CENTER);
    text(startTextString, 0, 0);

    startTextWidth = textWidth(startTextString);
    startTextHeight = textDescent() + textAscent();

    pop();
  } else {
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

    strokeWeight(5);
    fill(100);
    square(boardPos, boardPos, boardSize, 50);

    forEachButton(drawButtons);

    push();
    translate(textPosX, lerp(turnTextBounceStart, turnTextPosY, getQuadBounceAlpha(frameCount % turnTextBounceDuration / turnTextBounceDuration)));

    let textScaleAlpha = frameCount * textScaleSpeed;
    let textRotateAlpha = frameCount * textRotateSpeed;

    stroke(0);
    strokeWeight(5);
    fill(turnTextColor);
    textSize(lerp(turnTextMinSize, turnTextMaxSize, (sin(textScaleAlpha) + 1) / 2));
    rotate(textMaxRotation * cos(textRotateAlpha));
    textAlign(CENTER, CENTER);
    text(
      roundOver && roundOverText || "It's " + playerNames[currentPlayerID - 1] + "'s turn!",
      0,
      0
    );

    pop();

    // If the round is over, the reset button will appear, along with the menu button

    if (roundOver) {

      // The reset button

      push();

      let textFloatAlpha = frameCount * endTextFloatSpeed;
      resetTextPosY = endTextPosY + sin(textFloatAlpha) * endTextFloatAmplitude;
      let endTextSize = lerp(endTextMinSize, endTextMaxSize, (cos(textScaleAlpha) + 1) / 2);
      let endTextRotation = textMaxRotation * sin(textRotateAlpha);

      translate(resetTextPosX, resetTextPosY);

      stroke(0);
      strokeWeight(5);

      if (mouseInBounds(
        resetTextPosX - resetTextWidth / 2,
        resetTextPosY - endTextHalfHeight,
        resetTextWidth,
        endTextHeight
      )) {
        fill(textHoverColor);
      } else {
        fill(resetTextColor);
      }

      textSize(endTextSize);
      rotate(endTextRotation);
      textAlign(CENTER, CENTER);
      text(resetTextString, 0, 0);

      resetTextWidth = textWidth(resetTextString);

      pop();

      // The menu button

      push();

      returnTextPosY = endTextPosY + cos(textFloatAlpha) * endTextFloatAmplitude;

      translate(returnTextPosX, returnTextPosY);

      stroke(0);
      strokeWeight(5);

      if (mouseInBounds(
        returnTextPosX - returnTextWidth / 2,
        returnTextPosY - endTextHalfHeight,
        returnTextWidth,
        endTextHeight
      )) {
        fill(textHoverColor);
      } else {
        fill(returnTextColor);
      }

      textSize(endTextSize);
      rotate(endTextRotation);
      textAlign(CENTER, CENTER);
      text(returnTextString, 0, 0);

      returnTextWidth = textWidth(returnTextString);
      endTextHeight = textDescent() + textAscent();
      endTextHalfHeight = endTextHeight / 2;

      pop();
    }
  }
}

function mouseClicked() {
  // If the menu is supposed to show, it will check if the start button gets clicked

  if (onMenu) {
    if (mouseInBounds(
      textPosX - startTextWidth / 2,
      startTextPosY - startTextHeight / 2,
      startTextWidth,
      startTextHeight
    )) {
      calculateButtons(gridSizeSlider.value());
      playerAmount = playerAmountSlider.value();
      gridSizeSlider.hide();
      playerAmountSlider.hide();
      onMenu = false;
      startGameSound.play();
    }
  } else {
    // Calls the clickButtons function for every button

    forEachButton(clickButtons);

    /*
       If the round is over it will check if the reset button is clicked
       Else it will check if a line win condition has formed
    */

    if (roundOver) {
      if (mouseInBounds(
        resetTextPosX - resetTextWidth / 2,
        resetTextPosY - endTextHalfHeight,
        resetTextWidth,
        endTextHeight
      )) {
        for (let rowValues of gridList) {
          for (let x = 0; x < gridSize; x++) {
            rowValues[x] = 0;
          }
        }
        resetRound();
        restartSound.play();
      }

      if (mouseInBounds(
        returnTextPosX - returnTextWidth / 2,
        returnTextPosY - endTextHalfHeight,
        returnTextWidth,
        endTextHeight
      )) {
        onMenu = true;
        gridSizeSlider.show();
        playerAmountSlider.show();
        backToMenuSound.play();
        resetRound(true);
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
});

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
});

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
});