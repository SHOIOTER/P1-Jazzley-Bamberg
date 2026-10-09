const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

const ASSET_FOLDER = "./Assets/";

const CENTER_POS_X = WINDOW_WIDTH / 2;

const TITLE_TEXT_SIZE = 70;
const TITLE_TEXT_POS_Y = 70;
const TITLE_TEXT_STROKE_WEIGHT = 3;

const BUTTON_BACKGROUND_COLOR = "";
const BUTTON_BORDER_COLOR = "";
const BUTTON_TEXT_COLOR = "";

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
    questionIndex = -1;
    questionsCorrect = 0;

    menuButton.hide();

    for (let quizbutton of quizSelectButtons) {
      quizbutton.show();
    }

    // Resetting some stuff for the next round
  },
  VariantSelect: function () {
    for (let quizButton of quizSelectButtons) {
      quizButton.hide();
    }

    for (let variationButton of variationSelectButtons) {
      variationButton.show();
    }

    // Some other stuff I have to add
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
  quizList = loadJSON(getFilePath("QuizList.json"), function () {
    forEachQuiz(function (quiz) {
      quiz.image = loadImage(getFilePath(quiz.image));
    });
    forEachQuestion(function (question) {
      let questionImage = question.image;

      if (questionImage) {
        question.image = loadImage(getFilePath(questionImage));
      }
    });
  });
  answerRightSound = loadSound(getFilePath("AnswerRight.mp3"));
  answerWrongSound = loadSound(getFilePath("AnswerWrong.mp3"));
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
      changeScene("VariantSelect");
    });

    styleButton(quizButton, QUIZ_SELECT_BUTTON_TEXT_SIZE);

    quizSelectButtons[i] = quizButton;
    i++;
  });

  i = 0;
  forEachVariation(function (_, variationName) {
    let variationButton = createButton(variationName);
    variationButton.position(
      SELECT_BUTTON_ORIGIN_X + i % SELECT_BUTTON_COLUMNS * SELECT_BUTTON_OFFSET_WIDTH,
      SELECT_BUTTON_ORIGIN_Y + floor(i / SELECT_BUTTON_COLUMNS) * SELECT_BUTTON_OFFSET_HEIGHT
    );
    variationButton.size(SELECT_BUTTON_SIZE_WIDTH, SELECT_BUTTON_SIZE_HEIGHT);

    variationButton.mouseClicked(function () {
      currentVariation = currentVariation[variationButton.html()];
      questionAmount = currentVariation.length;
      shuffle(currentVariation, true);
      nextQuestion();
      changeScene("QuizGame");
    });

    styleButton(variationButton, VARIATION_SELECT_BUTTON_TEXT_SIZE);

    variationButton.hide();

    variationSelectButtons[i] = variationButton;
    i++;
  });

  let mostAnswers = 0;

  forEachQuestion(function (question) {
    let answerAmount = question.answers.length;

    if (answerAmount > mostAnswers) {
      mostAnswers = answerAmount;
    }
  });

  for (let i = 0; i < mostAnswers; i++) {
    let answerButton = createButton(undefined, i);

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

        for (let j = 0; j < answerAmount; j++) {
          let otherAnswerButton = quizAnswerButtons[j];
          
          if (currentAnswers[j].correct) {
            otherAnswerButton.style("background-color", QUESTION_BUTTON_RIGHT_COLOR);
          } else if (j == clickedIndex) {
            otherAnswerButton.style("background-color", QUESTION_BUTTON_WRONG_COLOR);
          }
        }

        /*

        nextQuestion();

        */
      }
    });

    styleButton(answerButton, QUESTION_BUTTON_TEXT_SIZE);

    answerButton.hide();

    quizAnswerButtons[i] = answerButton;
  }

  menuButton = createButton(MENU_BUTTON_TEXT_STRING, MENU_BUTTON_TEXT_SIZE);
  menuButton.position(MENU_BUTTON_POS_X, MENU_BUTTON_POS_Y);
  menuButton.size(MENU_BUTTON_WIDTH, MENU_BUTTON_HEIGHT);

  menuButton.mouseClicked(function () {
    changeScene("QuizSelect");
  });

  styleButton(menuButton, MENU_BUTTON_TEXT_SIZE);

  menuButton.hide();
}

function draw() {
  textAlign(CENTER, CENTER);
  quizScene();
}

function getFilePath(fileName) {
  return ASSET_FOLDER + fileName;
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
      answerButton.show();
    }
  } else {
    changeScene("EndScreen");
  }
}

function changeScene(scene) {
  quizSceneSwitchActions[scene]();
  quizScene = quizScenes[scene];
}

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

function styleButton(button, textSize) {
  button.style("background-color: rgb(175, 175, 175)");
  button.style("background-radius: 20px");
  button.style("border-width: 5px");
  button.style("border-color: rgb(200, 200, 200)")
  button.style("font-size", textSize + "px");
  button.style("font-weight: Bold");
  button.style("color: white")
  button.style("webkit-text-stroke: 1px rgb(0, 0, 0)");
}