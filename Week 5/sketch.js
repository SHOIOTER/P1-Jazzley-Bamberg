const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

const ASSET_FOLDER = "./Assets/";

const CENTER_POS_X = WINDOW_WIDTH / 2;

const TITLE_TEXT_SIZE = 70;
const TITLE_TEXT_POS_Y = 70;
const TITLE_TEXT_STROKE_WEIGHT = 3;

const QUIZ_SELECT_TEXT_STRING = "Select a quiz!";
const QUIZ_SELECT_TEXT_COLOR = "rgb(0, 200, 255)";

const VARIATION_SELECT_TEXT_STRING = "Select a variation!";
const VARIATION_SELECT_TEXT_COLOR = "rgb(100, 200, 100)";

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

const SELECT_BUTTON_SIZE = 50;
const SELECT_BUTTON_COLUMNS = 4;
const SELECT_BUTTON_ORIGIN_X = 0;
const SELECT_BUTTON_ORIGIN_Y = 0;
const SELECT_BUTTON_OFFSET = SELECT_BUTTON_SIZE * 1.2;

let quizSelectButtons = [];
let variationSelectButtons = [];

let quizList;
let currentVariation;
let currentQuestion;
let currentIndex = 0;

let quizSceneSwitchActions = {
  QuizSelect: function () {
    // Making stuff reset if replaying the quiz
  },
  VariantSelect: function () {
    // Making sure the variant buttons are loaded
  },
  QuizGame: function () {
    // Enable the buttons and other quiz elements
  },
  EndScreen: function () {
    // Show the end screen that shows your score and the menu button
  }
};
let quizScenes = {
  QuizSelect: function () {
    // Rendering the quiz selection screen

    displayTitle(QUIZ_SELECT_TEXT_STRING, QUIZ_SELECT_TEXT_COLOR);
  },
  VariantSelect: function () {
    // Rendering the variant selection screen

    displayTitle(VARIATION_SELECT_TEXT_STRING, VARIATION_SELECT_TEXT_COLOR);
  },
  QuizGame: function () {
    // Rendering the whole quiz layout

    push();
    translate(CENTER_POS_X, 0);

    noStroke();

    // The question image area

    push();
    translate(0, QUESTION_IMAGE_AREA_POS_Y);

    fill(QUESTION_IMAGE_AREA_COLOR);
    rect(0, 0, WINDOW_WIDTH, QUESTION_IMAGE_AREA_HEIGHT);

    fill(0, 155, 255);
    rect(0, 0, 500, QUESTION_IMAGE_BOUND_HEIGHT);

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
    text("What color is the sun?", 0, 0);

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

    displayTitle("The quiz is over!", "rgb(150, 150, 150)");
  }
};
let quizScene = quizScenes.QuizGame;

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
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  rectMode(CENTER);
  imageMode(CENTER);

  let i = 0;
  forEachQuiz(function (_, quizName) {
    let quizButton = createButton(quizName);
    quizButton.position();
    i++;
  });

  i = 0;

}

function draw() {
  background(220);

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

function changeQuestion() {

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