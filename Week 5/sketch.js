const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

const ASSET_FOLDER = "./Assets/";
const DATA_FOLDER = "./Data/"

const CENTER_POS_X = WINDOW_WIDTH / 2;

const TITLE_TEXT_SIZE = 70;
const TITLE_TEXT_POS_Y = 70;
const TITLE_TEXT_STROKE_WEIGHT = 3;

const BUTTON_BACKGROUND_COLOR = "rgb(175, 175, 175)";
const BUTTON_BORDER_COLOR = "rgb(200, 200, 200)";
const BUTTON_TEXT_COLOR = "rgb(255, 255, 255)";
const BUTTON_BORDER_RADIUS = 15;
const BUTTON_BORDER_WIDTH = 5;
const BUTTON_FONT_WEIGHT = "Bold";
const BUTTON_TEXT_STROKE_WIDTH = 1;
const BUTTON_TEXT_STROKE_COLOR = "rgb(0, 0, 0)";

const QUIZ_SELECT_TEXT_STRING = "Select a quiz!";
const QUIZ_SELECT_TEXT_COLOR = "rgb(0, 200, 255)";
const QUIZ_SELECT_BACKGROUND_COLOR = "rgb(255, 155, 0)";
const QUIZ_SELECT_BUTTON_TEXT_SIZE = 25;

const VARIATION_SELECT_TEXT_STRING = "Select a variation!";
const VARIATION_SELECT_TEXT_COLOR = "rgb(100, 200, 100)";
const VARIATION_SELECT_BACKGROUND_COLOR = "rgb(200, 100, 200)";
const VARIATION_SELECT_BUTTON_TEXT_SIZE = 35;

const QUESTION_IMAGE_AREA_HEIGHT = WINDOW_HEIGHT * 0.45;
const QUESTION_IMAGE_AREA_POS_Y = QUESTION_IMAGE_AREA_HEIGHT / 2;
const QUESTION_IMAGE_AREA_COLOR = "rgb(255, 155, 0)";
const QUESTION_IMAGE_BOUND_HEIGHT = QUESTION_IMAGE_AREA_HEIGHT * 0.9;

let currentPlaceholderImage;
let currentQuestionImage;
let currentImageWidth;

const QUESTION_TEXT_AREA_HEIGHT = WINDOW_HEIGHT * 0.1;
const QUESTION_TEXT_AREA_POS_Y = QUESTION_IMAGE_AREA_HEIGHT + QUESTION_TEXT_AREA_HEIGHT / 2;
const QUESTION_TEXT_AREA_COLOR = "rgb(0, 200, 255)";
const QUESTION_TEXT_SIZE = 25;
const QUESTION_TEXT_COLOR = "rgb(220, 220, 220)";

const QUESTION_BUTTONS_AREA_HEIGHT = QUESTION_IMAGE_AREA_HEIGHT;
const QUESTION_BUTTONS_AREA_POS_Y = WINDOW_HEIGHT - QUESTION_IMAGE_AREA_POS_Y;
const QUESTION_BUTTONS_AREA_COLOR = "rgb(255, 155, 0)";
const QUESTION_BUTTONS_BOUND_HEIGHT = QUESTION_BUTTONS_AREA_HEIGHT * 0.9;
const QUESTION_BUTTON_TEXT_SIZE = 25;
const QUESTION_BUTTON_HEIGHT_MARGIN = 0.8;
const QUESTION_BUTTON_WIDTH = WINDOW_WIDTH * 0.67;
const QUESTION_BUTTON_ORIGIN_X = CENTER_POS_X - QUESTION_BUTTON_WIDTH / 2;
const QUESTION_BUTTON_ORIGIN_Y = QUESTION_BUTTONS_AREA_POS_Y + 7;
const QUESTION_BUTTON_WRONG_COLOR = "rgb(255, 0, 0)";
const QUESTION_BUTTON_RIGHT_COLOR = "rgb(0, 200, 0)";

let canClickAnswer = true;
let answerRightSound;
let answerWrongSound;
let buttonPressSound;

const SELECT_BUTTON_SIZE_WIDTH = 150;
const SELECT_BUTTON_SIZE_HEIGHT = 100;
const SELECT_BUTTON_COLUMNS = 3;
const SELECT_BUTTON_ORIGIN_X = 150;
const SELECT_BUTTON_ORIGIN_Y = 175;
const SELECT_BUTTON_OFFSET_WIDTH = SELECT_BUTTON_SIZE_WIDTH * 1.2;
const SELECT_BUTTON_OFFSET_HEIGHT = SELECT_BUTTON_SIZE_HEIGHT * 1.2;

const END_SCREEN_BACKGROUND_COLOR = "rgb(100, 200, 100)";
const END_SCREEN_TEXT_COLOR = "rgb(0, 200, 255)"

const SCORE_TEXT_POS_Y = WINDOW_HEIGHT / 2;
const SCORE_TEXT_SIZE = 50;
const SCORE_TEXT_COLOR = "rgb(255, 155, 0)";

const MENU_BUTTON_WIDTH = 300;
const MENU_BUTTON_HEIGHT = 100;
const MENU_BUTTON_POS_X = CENTER_POS_X - MENU_BUTTON_WIDTH / 2;
const MENU_BUTTON_POS_Y = WINDOW_HEIGHT - MENU_BUTTON_HEIGHT * 1.25;
const MENU_BUTTON_TEXT_STRING = "Back to menu!";
const MENU_BUTTON_TEXT_SIZE = 40;

const NEXT_QUESTION_DELAY = 2500;

let quizSelectButtons = [];
let variationSelectButtons = [];
let quizAnswerButtons = [];
let menuButton;

let quizList;
let currentVariation;
let currentQuestion;
let currentAnswers;
let questionText;
let questionIndex = -1;
let questionAmount;
let questionsCorrect = 0;
let answerAmount;

let quizSceneSwitchActions = {
  QuizSelect: function () {
    // Resetting some stuff

    questionIndex = -1;
    questionsCorrect = 0;

    menuButton.hide();

    for (let quizbutton of quizSelectButtons) {
      quizbutton.show();
    }
  },
  VariantSelect: function () {
    // Hiding all the quiz selection buttons

    for (let quizButton of quizSelectButtons) {
      quizButton.hide();
    }
  },
  QuizGame: function () {
    for (let variationButton of variationSelectButtons) {
      variationButton.hide();
    }

    // Making sure to setup some stuff before the quiz begins
  },
  EndScreen: function () {
    // Show the end screen that shows your score and the menu button

    menuButton.show();
  }
};
let quizScenes = {
  QuizSelect: function () {
    // Rendering the quiz selection screen

    background(QUIZ_SELECT_BACKGROUND_COLOR);

    displayTitle(QUIZ_SELECT_TEXT_STRING, QUIZ_SELECT_TEXT_COLOR);
  },
  VariantSelect: function () {
    // Rendering the variant selection screen

    background(VARIATION_SELECT_BACKGROUND_COLOR);

    displayTitle(VARIATION_SELECT_TEXT_STRING, VARIATION_SELECT_TEXT_COLOR);
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

    fill(QUESTION_IMAGE_AREA_COLOR);
    rect(0, 0, WINDOW_WIDTH, QUESTION_IMAGE_AREA_HEIGHT);

    image(currentQuestionImage, 0, 0, currentImageWidth, QUESTION_IMAGE_BOUND_HEIGHT);

    pop();

    // The question text area

    push();
    translate(0, QUESTION_TEXT_AREA_POS_Y);

    fill(QUESTION_TEXT_AREA_COLOR);
    rect(0, 0, WINDOW_WIDTH, QUESTION_TEXT_AREA_HEIGHT);

    stroke(0);
    strokeWeight(TITLE_TEXT_STROKE_WEIGHT);
    fill(QUESTION_TEXT_COLOR);

    textSize(QUESTION_TEXT_SIZE);
    text(questionText, 0, 0);

    pop();

    // The question buttons area

    push();
    translate(0, QUESTION_BUTTONS_AREA_POS_Y);

    fill(QUESTION_BUTTONS_AREA_COLOR);
    rect(0, 0, WINDOW_WIDTH, QUESTION_BUTTONS_AREA_HEIGHT);

    pop();

    pop();
  },
  EndScreen: function () {
    // Rendering the end screen

    background(END_SCREEN_BACKGROUND_COLOR);

    displayTitle("The quiz ended!", END_SCREEN_TEXT_COLOR);

    push();
    translate(CENTER_POS_X, SCORE_TEXT_POS_Y);

    stroke(0);
    strokeWeight(TITLE_TEXT_STROKE_WEIGHT);
    fill(SCORE_TEXT_COLOR);

    textSize(SCORE_TEXT_SIZE);
    text(`Score: ${questionsCorrect}/${questionAmount}`, 0, 0);

    pop();
  }
};
let quizScene = quizScenes.QuizSelect;

function preload() {
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
  answerRightSound = loadSound(getFilePath(ASSET_FOLDER, "Answer_Right.mp3"));
  answerRightSound.setVolume(0.1);

  answerWrongSound = loadSound(getFilePath(ASSET_FOLDER, "Answer_Wrong.mp3"));
  answerWrongSound.setVolume(0.2);

  buttonPressSound = loadSound(getFilePath(ASSET_FOLDER, "Button_Press.mp3"));
  buttonPressSound.setVolume(0.8);
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  rectMode(CENTER);
  imageMode(CENTER);

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
      currentPlaceholderImage = currentVariation.image;
      currentVariation = currentVariation.variations;

      let variationNames = Object.keys(currentVariation);

      for (let j = 0; j < variationNames.length; j++) {
        let variationButton = variationSelectButtons[j];
        variationButton.html(variationNames[j]);
        variationButton.show();
      }

      changeScene("VariantSelect");

      buttonPressSound.play();
    });

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
      questionAmount = currentVariation.length;
      shuffle(currentVariation, true);
      nextQuestion();
      changeScene("QuizGame");
      buttonPressSound.play();
    });

    styleButton(variationButton, VARIATION_SELECT_BUTTON_TEXT_SIZE);

    variationButton.hide();

    variationSelectButtons[j] = variationButton;
  }

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
            otherAnswerButton.style("background-color", QUESTION_BUTTON_RIGHT_COLOR);
          } else if (k == clickedIndex) {
            otherAnswerButton.style("background-color", QUESTION_BUTTON_WRONG_COLOR);
          }
        }

       setTimeout(nextQuestion, NEXT_QUESTION_DELAY);
      }
    });

    styleButton(answerButton, QUESTION_BUTTON_TEXT_SIZE);

    answerButton.hide();

    quizAnswerButtons[j] = answerButton;
  }

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
  textAlign(CENTER, CENTER);
  quizScene();
}

function getFilePath(fileContainer, fileName) {
  return fileContainer + fileName;
}

function forEachQuiz(callback) {
  for (let quizName of Object.keys(quizList)) {
    callback(quizList[quizName], quizName);
  }
}

function forEachVariation(callback) {
  forEachQuiz(function (quiz) {
    let quizVariations = quiz.variations;

    for (let variationName of Object.keys(quizVariations)) {
      callback(quizVariations[variationName], variationName);
    }
  });
}

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

  for (let answerButton of quizAnswerButtons) {
    answerButton.hide();
  }

  if (questionIndex < questionAmount) {
    currentQuestion = currentVariation[questionIndex];
    currentQuestionImage = currentQuestion.image || currentPlaceholderImage;
    currentImageWidth = currentQuestionImage.width / (currentQuestionImage.height / QUESTION_IMAGE_BOUND_HEIGHT);
    questionText = currentQuestion.question;

    currentAnswers = currentQuestion.answers;
    shuffle(currentAnswers, true);

    answerAmount = currentAnswers.length;
    let buttonAreaHeight = QUESTION_BUTTONS_BOUND_HEIGHT / answerAmount;
    let buttonHeight = buttonAreaHeight * QUESTION_BUTTON_HEIGHT_MARGIN;
    let halfButtonHeight = buttonHeight / 2;
    let buttonMagnitude = (answerAmount / 2 - 0.5) * buttonAreaHeight;
    let buttonIndexStop = answerAmount - 1;

    for (let i = 0; i < answerAmount; i++) {
      answerButton = quizAnswerButtons[i];
      answerButton.html(currentAnswers[i].answer);
      answerButton.position(
        QUESTION_BUTTON_ORIGIN_X,
        QUESTION_BUTTON_ORIGIN_Y + lerp(-buttonMagnitude, buttonMagnitude, i / buttonIndexStop) - halfButtonHeight
      );
      answerButton.size(QUESTION_BUTTON_WIDTH, buttonHeight);
      answerButton.style("background-color", BUTTON_BACKGROUND_COLOR);
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
  button.style("background-color", BUTTON_BACKGROUND_COLOR);
  button.style("border-radius", toCSS(BUTTON_BORDER_RADIUS));
  button.style("border-width", toCSS(BUTTON_BORDER_WIDTH));
  button.style("border-color", BUTTON_BORDER_COLOR);
  button.style("font-size", toCSS(textSize));
  button.style("font-weight", BUTTON_FONT_WEIGHT);
  button.style("color", BUTTON_TEXT_COLOR);
  button.style("webkit-text-stroke", `${toCSS(BUTTON_TEXT_STROKE_WIDTH)} ${BUTTON_TEXT_STROKE_COLOR}`);
}