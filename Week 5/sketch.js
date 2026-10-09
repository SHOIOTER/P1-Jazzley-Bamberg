const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

const ASSET_FOLDER = "./Assets/";
const DATA_FOLDER = "./Data/"

const CENTER_POS_X = WINDOW_WIDTH / 2;

const TITLE_TEXT_SIZE = 70;
const TITLE_TEXT_POS_Y = 70;
const TITLE_TEXT_STROKE_WEIGHT = 3;

const BUTTON_BORDER_RADIUS = 15;
const BUTTON_BORDER_WIDTH = 5;
const BUTTON_FONT_WEIGHT = "Bold";
const BUTTON_TEXT_STROKE_WIDTH = 1;
const BUTTON_TEXT_STROKE_COLOR = "rgb(0, 0, 0)";

let buttonBackgroundColor;
let buttonBorderColor;
let buttonTextColor;

const QUIZ_SELECT_TEXT_STRING = "Select a quiz!";
const QUIZ_SELECT_BUTTON_TEXT_SIZE = 25;

let quizSelectTextColor;
let quizSelectBackgroundColor;

const VARIATION_SELECT_TEXT_STRING = "Select a variation!";
const VARIATION_SELECT_BUTTON_TEXT_SIZE = 35;

let variationSelectTextColor;
let variationSelectBackgroundColor;

const QUESTION_IMAGE_AREA_HEIGHT = WINDOW_HEIGHT * 0.45;
const QUESTION_IMAGE_AREA_POS_Y = QUESTION_IMAGE_AREA_HEIGHT / 2;
const QUESTION_IMAGE_BOUND_HEIGHT = QUESTION_IMAGE_AREA_HEIGHT * 0.9;

let questionImageAreaColor;
let questionTextAreaColor;
let questionButtonAreaColor;

let currentPlaceholderImage;
let currentQuestionImage;
let currentImageWidth;

const QUESTION_TEXT_AREA_HEIGHT = WINDOW_HEIGHT * 0.1;
const QUESTION_TEXT_AREA_POS_Y = QUESTION_IMAGE_AREA_HEIGHT + QUESTION_TEXT_AREA_HEIGHT / 2;
const QUESTION_TEXT_SIZE = 25;

let questionTextColor;

const QUESTION_BUTTON_AREA_HEIGHT = QUESTION_IMAGE_AREA_HEIGHT;
const QUESTION_BUTTON_AREA_POS_Y = WINDOW_HEIGHT - QUESTION_IMAGE_AREA_POS_Y;
const QUESTION_BUTTON_BOUND_HEIGHT = QUESTION_BUTTON_AREA_HEIGHT * 0.9;
const QUESTION_BUTTON_TEXT_SIZE = 25;
const QUESTION_BUTTON_HEIGHT_MARGIN = 0.8;
const QUESTION_BUTTON_WIDTH = WINDOW_WIDTH * 0.67;
const QUESTION_BUTTON_ORIGIN_X = CENTER_POS_X - QUESTION_BUTTON_WIDTH / 2;
const QUESTION_BUTTON_ORIGIN_Y = QUESTION_BUTTON_AREA_POS_Y + 7;

let questionButtonWrongColor;
let questionButtonRightColor;

let canClickAnswer = true;
let answerRightSound;
let answerWrongSound;
let buttonPressSound;
let sufficientScoreSound;
let insufficientScoreSound;

const SELECT_BUTTON_SIZE_WIDTH = 150;
const SELECT_BUTTON_SIZE_HEIGHT = 100;
const SELECT_BUTTON_COLUMNS = 3;
const SELECT_BUTTON_ORIGIN_X = 150;
const SELECT_BUTTON_ORIGIN_Y = 175;
const SELECT_BUTTON_OFFSET_WIDTH = SELECT_BUTTON_SIZE_WIDTH * 1.2;
const SELECT_BUTTON_OFFSET_HEIGHT = SELECT_BUTTON_SIZE_HEIGHT * 1.2;

let endScreenBackgroundColor;
let endScreenTextColor;

const SCORE_TEXT_POS_Y = WINDOW_HEIGHT / 2;
const SCORE_TEXT_SIZE = 40;

let minScoreTextColor;
let maxScoreTextColor;
let scoreTextColor;

const MENU_BUTTON_WIDTH = 300;
const MENU_BUTTON_HEIGHT = 100;
const MENU_BUTTON_POS_X = CENTER_POS_X - MENU_BUTTON_WIDTH / 2;
const MENU_BUTTON_POS_Y = WINDOW_HEIGHT - MENU_BUTTON_HEIGHT * 1.25;
const MENU_BUTTON_TEXT_STRING = "Back to menu!";
const MENU_BUTTON_TEXT_SIZE = 40;

const NEXT_QUESTION_DELAY = 2000;

const QUESTION_COUNTER_POS_X = WINDOW_WIDTH / 13;
const QUESTION_COUNTER_POS_Y = WINDOW_HEIGHT * 0.9;
const QUESTION_COUNTER_CIRCLE_SIZE = 90;
const QUESTION_COUNTER_TEXT_SIZE = 30;

let questionCounterCircleColor;
let questionCounterTextColor;

let quizSelectButtons = [];
let variationSelectButtons = [];
let quizAnswerButtons = [];
let menuButton;

let quizList;
let currentVariation;
let currentQuestion;
let currentAnswers;
let questionText;

/*
  questionIndex is -1 because nextQuestion function also updates the layout at the start of the game
  So it becomes 0
*/

let questionIndex = -1;
let questionAmount;
let questionsCorrect = 0;
let answerAmount;

// quizSceneSwitchActions controls the one time stuff when it gets switched to that scene

let quizSceneSwitchActions = {
  QuizSelect: function () {
    // Resetting some stuff

    questionIndex = -1;
    questionsCorrect = 0;

    menuButton.hide();

    // Showing the buttons again

    for (let quizbutton of quizSelectButtons) {
      quizbutton.show();
    }
  },
  VariantSelect: function () {
    // Hiding all the quiz selection buttons

    currentPlaceholderImage = currentVariation.image;
    currentVariation = currentVariation.variations;
    let variationNames = Object.keys(currentVariation);

    for (let quizButton of quizSelectButtons) {
      quizButton.hide();
    }

    // But showing the right buttons, while also giving them the right label

    for (let j = 0; j < variationNames.length; j++) {
      let variationButton = variationSelectButtons[j];
      variationButton.html(variationNames[j]);
      variationButton.show();
    }
  },
  QuizGame: function () {
    // Hiding all the variation buttons

    for (let variationButton of variationSelectButtons) {
      variationButton.hide();
    }

    // Shuffling the questions and also displaying the next question (which is the first one)

    questionAmount = currentVariation.length;
    shuffle(currentVariation, true);
    nextQuestion();
  },
  EndScreen: function () {
    // Show the end screen that shows your score and the menu button

    scoreTextColor = lerpColor(minScoreTextColor, maxScoreTextColor, questionsCorrect / questionAmount);

    menuButton.show();

    if (questionsCorrect >= questionAmount / 2) {
      sufficientScoreSound.play();
    } else {
      insufficientScoreSound.play();
    }
  }
};

// quizScenes handles what gets rendered on the screen currently

let quizScenes = {
  QuizSelect: function () {
    // Rendering the quiz selection screen

    background(quizSelectBackgroundColor);

    // Displaying the right title

    displayTitle(QUIZ_SELECT_TEXT_STRING, quizSelectTextColor);
  },
  VariantSelect: function () {
    // Rendering the variant selection screen

    background(variationSelectBackgroundColor);

    // Displaying the right title

    displayTitle(VARIATION_SELECT_TEXT_STRING, variationSelectTextColor);
  },
  QuizGame: function () {
    // Rendering the whole quiz layout

    background(220);

    push();
    translate(CENTER_POS_X, 0);

    noStroke();

    // The question image area

    push();
    translate(0, QUESTION_IMAGE_AREA_POS_Y);

    fill(questionImageAreaColor);
    rect(0, 0, WINDOW_WIDTH, QUESTION_IMAGE_AREA_HEIGHT);

    image(currentQuestionImage, 0, 0, currentImageWidth, QUESTION_IMAGE_BOUND_HEIGHT);

    pop();

    // The question text area

    push();
    translate(0, QUESTION_TEXT_AREA_POS_Y);

    fill(questionTextAreaColor);
    rect(0, 0, WINDOW_WIDTH, QUESTION_TEXT_AREA_HEIGHT);

    stroke(0);
    strokeWeight(TITLE_TEXT_STROKE_WEIGHT);
    fill(questionTextColor);

    textSize(QUESTION_TEXT_SIZE);
    text(questionText, 0, 0);

    pop();

    // The question buttons area

    push();
    translate(0, QUESTION_BUTTON_AREA_POS_Y);

    fill(questionButtonAreaColor);
    rect(0, 0, WINDOW_WIDTH, QUESTION_BUTTON_AREA_HEIGHT);

    pop();

    pop();

    push();
    translate(QUESTION_COUNTER_POS_X, QUESTION_COUNTER_POS_Y);

    // A circle that gets rendered behind the progress text

    noStroke();
    fill(questionCounterCircleColor);
    circle(0, 0, QUESTION_COUNTER_CIRCLE_SIZE);

    stroke(0);
    strokeWeight(TITLE_TEXT_STROKE_WEIGHT);
    fill(questionCounterTextColor);

    // Showing the quiz progress

    textSize(QUESTION_COUNTER_TEXT_SIZE);
    text(`${questionIndex + 1}/${questionAmount}`, 0, 0);

    pop();
  },
  EndScreen: function () {
    // Rendering the end screen

    background(endScreenBackgroundColor);

    displayTitle("The quiz ended!", endScreenTextColor);

    push();
    translate(CENTER_POS_X, SCORE_TEXT_POS_Y);

    stroke(0);
    strokeWeight(TITLE_TEXT_STROKE_WEIGHT);
    fill(scoreTextColor);

    // Displaying the amount of questions the user got right

    textSize(SCORE_TEXT_SIZE);
    text(`You got ${questionsCorrect} of the ${questionAmount} questions right`, 0, 0);

    pop();
  }
};

// Always starting with the quiz subject selection screen

let quizScene = quizScenes.QuizSelect;

function preload() {
  /*
    Loading the JSON quizList file to import all the quiz data
    When it's fully loaded, the images will be loaded properly
  */

  quizList = loadJSON(getFilePath(DATA_FOLDER, "QuizList.json"), function () {
    forEachQuiz(function (quiz) {
      quiz.image = loadImage(getFilePath(ASSET_FOLDER, quiz.image));
    });
    forEachQuestion(function (question) {
      let questionImage = question.image;

      if (questionImage) {
        question.image = loadImage(getFilePath(ASSET_FOLDER, questionImage));
      }
    });
  });

  // Loading all the sounds

  answerRightSound = loadSound(getFilePath(ASSET_FOLDER, "Answer_Right.mp3"));
  answerRightSound.setVolume(0.1);

  answerWrongSound = loadSound(getFilePath(ASSET_FOLDER, "Answer_Wrong.mp3"));
  answerWrongSound.setVolume(0.2);

  buttonPressSound = loadSound(getFilePath(ASSET_FOLDER, "Button_Press.mp3"));
  buttonPressSound.setVolume(0.8);

  sufficientScoreSound = loadSound(getFilePath(ASSET_FOLDER, "Sufficient_Score.mp3"));
  sufficientScoreSound.setVolume(0.4);

  insufficientScoreSound = loadSound(getFilePath(ASSET_FOLDER, "Insufficient_Score.mp3"));
  insufficientScoreSound.setVolume(0.4);
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  // Making sure rectangles and images their anchor point is in the center

  rectMode(CENTER);
  imageMode(CENTER);

  // Initializing some variables here

  buttonBackgroundColor = color(175, 175, 175);
  buttonBorderColor = color(200, 200, 200);
  buttonTextColor = color(255);

  quizSelectTextColor = color(0, 200, 255);
  quizSelectBackgroundColor = color(255, 155, 0);

  variationSelectTextColor = color(100, 200, 100);
  variationSelectBackgroundColor = color(200, 100, 200);

  questionImageAreaColor = color(255, 155, 0);
  questionTextAreaColor = color(0, 255, 155);
  questionButtonAreaColor = color(0, 155, 255);

  questionTextColor = color(225);

  questionButtonWrongColor = color(255, 0, 0);
  questionButtonRightColor = color(0, 200, 0);

  endScreenBackgroundColor = color(100, 200, 100);
  endScreenTextColor = color(0, 200, 255);

  minScoreTextColor = color(255, 0, 0);
  maxScoreTextColor = color(0, 255, 0);

  questionCounterCircleColor = color(255, 155, 0);
  questionCounterTextColor = color(225);

  let i = 0;
  forEachQuiz(function (_, quizName) {
    let quizButton = createButton(quizName);
    quizButton.position(
      SELECT_BUTTON_ORIGIN_X + i % SELECT_BUTTON_COLUMNS * SELECT_BUTTON_OFFSET_WIDTH,
      SELECT_BUTTON_ORIGIN_Y + floor(i / SELECT_BUTTON_COLUMNS) * SELECT_BUTTON_OFFSET_HEIGHT
    );
    quizButton.size(SELECT_BUTTON_SIZE_WIDTH, SELECT_BUTTON_SIZE_HEIGHT);

    quizButton.mouseClicked(function () {
      currentVariation = quizList[quizButton.html()];
      changeScene("VariantSelect");
      buttonPressSound.play();
    });

    // Styling and adding the button to the array

    styleButton(quizButton, QUIZ_SELECT_BUTTON_TEXT_SIZE);

    quizSelectButtons[i] = quizButton;
    i++;
  });

  let mostVariations = 0;

  forEachQuiz(function (quiz) {
    let variationAmount = Object.keys(quiz.variations).length;

    if (variationAmount > mostVariations) {
      mostVariations = variationAmount;
    }
  });

  for (let j = 0; j < mostVariations; j++) {
    let variationButton = createButton();
    variationButton.position(
      SELECT_BUTTON_ORIGIN_X + j % SELECT_BUTTON_COLUMNS * SELECT_BUTTON_OFFSET_WIDTH,
      SELECT_BUTTON_ORIGIN_Y + floor(j / SELECT_BUTTON_COLUMNS) * SELECT_BUTTON_OFFSET_HEIGHT
    );
    variationButton.size(SELECT_BUTTON_SIZE_WIDTH, SELECT_BUTTON_SIZE_HEIGHT);

    variationButton.mouseClicked(function () {
      currentVariation = currentVariation[variationButton.html()];
      changeScene("QuizGame");
      buttonPressSound.play();
    });

    // Styling, hiding, and adding the button to the array

    styleButton(variationButton, VARIATION_SELECT_BUTTON_TEXT_SIZE);

    variationButton.hide();

    variationSelectButtons[j] = variationButton;
  }

  // First calculating what the highest answer count is, then creating so many buttons that can be used

  let mostAnswers = 0;

  forEachQuestion(function (question) {
    let answerAmount = question.answers.length;

    if (answerAmount > mostAnswers) {
      mostAnswers = answerAmount;
    }
  });

  for (let j = 0; j < mostAnswers; j++) {
    let answerButton = createButton(undefined, j);

    answerButton.mouseClicked(function () {
      if (canClickAnswer) {
        canClickAnswer = false;
        let clickedIndex = Number(answerButton.value());
        let answer = currentAnswers[clickedIndex];

        if (answer.correct) {
          questionsCorrect++;
          answerRightSound.play();
        } else {
          answerWrongSound.play();
        }

        for (let k = 0; k < answerAmount; k++) {
          let otherAnswerButton = quizAnswerButtons[k];

          if (currentAnswers[k].correct) {
            otherAnswerButton.style("background-color", questionButtonRightColor);
          } else if (k == clickedIndex) {
            otherAnswerButton.style("background-color", questionButtonWrongColor);
          }
        }

        // Goes to the next question after the delay

        setTimeout(nextQuestion, NEXT_QUESTION_DELAY);
      }
    });

    // Styling, hiding, and adding the button to the array

    styleButton(answerButton, QUESTION_BUTTON_TEXT_SIZE);

    answerButton.hide();

    quizAnswerButtons[j] = answerButton;
  }

  // Creating the menu button and giving it's functionality

  menuButton = createButton(MENU_BUTTON_TEXT_STRING, MENU_BUTTON_TEXT_SIZE);
  menuButton.position(MENU_BUTTON_POS_X, MENU_BUTTON_POS_Y);
  menuButton.size(MENU_BUTTON_WIDTH, MENU_BUTTON_HEIGHT);

  menuButton.mouseClicked(function () {
    changeScene("QuizSelect");
    buttonPressSound.play();
  });

  styleButton(menuButton, MENU_BUTTON_TEXT_SIZE);

  menuButton.hide();
}

function draw() {
  // Renders the current scene on the screen

  textAlign(CENTER, CENTER);
  quizScene();
}

// Returns a full file path based on container and filename string

function getFilePath(fileContainer, fileName) {
  return fileContainer + fileName;
}

// Calls a function for each quiz subject

function forEachQuiz(callback) {
  for (let quizName of Object.keys(quizList)) {
    callback(quizList[quizName], quizName);
  }
}

// Calls a function for each variation

function forEachVariation(callback) {
  forEachQuiz(function (quiz) {
    let quizVariations = quiz.variations;

    for (let variationName of Object.keys(quizVariations)) {
      callback(quizVariations[variationName], variationName);
    }
  });
}

// Calls a function for each question

function forEachQuestion(callback) {
  forEachVariation(function (variation) {
    for (let question of variation) {
      callback(question);
    }
  });
}

function nextQuestion() {
  // Move on to the next question, also making the buttons mapped correctly

  questionIndex++;
  canClickAnswer = true;

  // Hides the answer buttons for now

  for (let answerButton of quizAnswerButtons) {
    answerButton.hide();
  }

  // Decides if it should to to the next question or the end screen

  if (questionIndex < questionAmount) {
    // Setting up some variables for the next question

    currentQuestion = currentVariation[questionIndex];
    currentQuestionImage = currentQuestion.image || currentPlaceholderImage;
    currentImageWidth = currentQuestionImage.width / (currentQuestionImage.height / QUESTION_IMAGE_BOUND_HEIGHT);
    questionText = currentQuestion.question;

    // Making sure the answers are shuffled

    currentAnswers = currentQuestion.answers;
    shuffle(currentAnswers, true);

    answerAmount = currentAnswers.length;
    let buttonAreaHeight = QUESTION_BUTTON_BOUND_HEIGHT / answerAmount;
    let buttonHeight = buttonAreaHeight * QUESTION_BUTTON_HEIGHT_MARGIN;
    let halfButtonHeight = buttonHeight / 2;
    let buttonMagnitude = (answerAmount / 2 - 0.5) * buttonAreaHeight;
    let buttonIndexStop = answerAmount - 1;

    // Positioning and sizing the buttons based on answer amount

    for (let i = 0; i < answerAmount; i++) {
      answerButton = quizAnswerButtons[i];
      answerButton.html(currentAnswers[i].answer);
      answerButton.position(
        QUESTION_BUTTON_ORIGIN_X,
        QUESTION_BUTTON_ORIGIN_Y + lerp(-buttonMagnitude, buttonMagnitude, i / buttonIndexStop) - halfButtonHeight
      );
      answerButton.size(QUESTION_BUTTON_WIDTH, buttonHeight);
      answerButton.style("background-color", buttonBackgroundColor);
      answerButton.show();
    }
  } else {
    changeScene("EndScreen");
  }
}

// Modifies the scene while also performing some stuff before switching the scene

function changeScene(scene) {
  quizSceneSwitchActions[scene]();
  quizScene = quizScenes[scene];
}

// Writes a big title on the upper side of the canvas

function displayTitle(titleString, titleColor) {
  push();

  translate(CENTER_POS_X, TITLE_TEXT_POS_Y);

  stroke(0);
  strokeWeight(TITLE_TEXT_STROKE_WEIGHT);
  fill(titleColor);

  textSize(TITLE_TEXT_SIZE);
  text(titleString, 0, 0);

  pop();
}

// Easily adds px to a number for css styling

function toCSS(num) {
  return num + "px";
}

// Easily styles the buttons to desired styling

function styleButton(button, textSize) {
  button.style("background-color", buttonBackgroundColor);
  button.style("border-radius", toCSS(BUTTON_BORDER_RADIUS));
  button.style("border-width", toCSS(BUTTON_BORDER_WIDTH));
  button.style("border-color", buttonBorderColor);
  button.style("font-size", toCSS(textSize));
  button.style("font-weight", BUTTON_FONT_WEIGHT);
  button.style("color", buttonTextColor);
  button.style("webkit-text-stroke", `${toCSS(BUTTON_TEXT_STROKE_WIDTH)} ${BUTTON_TEXT_STROKE_COLOR}`);
}