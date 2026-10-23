const PAGE_TO_CANVAS_DIST = 8;

const WINDOW_WIDTH = 960;
const WINDOW_HEIGHT = 720;

const CENTER_X = WINDOW_WIDTH / 2;
const CENTER_Y = WINDOW_HEIGHT / 2;

const ASSET_FOLDER = "./Assets/";
const ESSENTIALS_IMAGE_FOLDER = "../Essentials/images/";

const MIN_STATS = 0;
const MAX_STATS = 100;

const STAT_BAR_LENGTH = 250;
const STAT_BAR_HEIGHT = 25;
const STAT_BAR_SPACING = STAT_BAR_HEIGHT * 1.5;
const STAT_BAR_CORNER_RADIUS = STAT_BAR_HEIGHT / 3;
const STAT_BAR_STROKE_WEIGHT = 1.5;

const STAT_BAR_POS_X = 15;
const STAT_BAR_ORIGIN_Y = WINDOW_HEIGHT - STAT_BAR_HEIGHT / 2 - 15;
const STATIC_BAR_POS_X = STAT_BAR_POS_X + STAT_BAR_LENGTH / 2;

const STAT_BAR_TEXT_SIZE = STAT_BAR_HEIGHT * 0.65;
const STAT_BAR_TEXT_STROKE_WEIGHT = 2;

let hungerDrainSpeed = 0.002;
let energyDrainSpeed = 0.00075;
let happinessDrainSpeed = 0.001;
let healthDrainSpeed = 0.0005;

let staticBarColor;
let hungerBarColors;
let energyBarColors;
let happinessBarColors;
let healthBarColors;

let defaultStats = {
  hunger: 100,
  energy: 100,
  happiness: 100,
  health: 100
};

let statObjects = {};

let petAnimations = {
  default: {
    anim: "Battle_Cats_Loading.mp4",
    idle: true
  },
  sick: {
    anim: "Battle_Cats_Attack.mov",
    idle: true
  },
  angry: {
    anim: "Battle_Cats_Loading.mp4"
  },
  eat: {
    anim: "Battle_Cats_Loading.mp4"
  }
};

let petAnimator;

const ELEMENT_BORDER_RADIUS = 15;
const ELEMENT_BORDER_WIDTH = 5;
const ELEMENT_FONT_WEIGHT = "Bold";
const ELEMENT_TEXT_STROKE_WIDTH = 1;
const ELEMENT_TEXT_STROKE_COLOR = "rgb(0, 0, 0)";

let elementBackgroundColor;
let elementBorderColor;
let elementTextColor;

const ROOM_SELECTOR_WIDTH = 200;
const ROOM_SELECTOR_HEIGHT = 40;
const ROOM_SELECTOR_BOUND_DIST = 15;
const ROOM_SELECTOR_POS_X = WINDOW_WIDTH - ROOM_SELECTOR_WIDTH - ROOM_SELECTOR_BOUND_DIST + PAGE_TO_CANVAS_DIST;
const ROOM_SELECTOR_POS_Y = ROOM_SELECTOR_BOUND_DIST + PAGE_TO_CANVAS_DIST;
const ROOM_SELECTOR_TEXT_SIZE = 22;

const STAT_SAVE_FREQUENCY = 30000;
const SAVE_TEXT_STRING = "Game saved!";
const SAVE_TEXT_SIZE = 50;
const SAVE_TEXT_POS_Y = 50;
const SAVE_TEXT_STROKE_WEIGHT = 4;
const SAVE_TEXT_DURATION = 2000;

const SAVE_BUTTON_STRING = "SAVE GAME";
const SAVE_BUTTON_WIDTH = 150;
const SAVE_BUTTON_HEIGHT = 60;
const SAVE_BUTTON_BOUND_DIST = 15;
const SAVE_BUTTON_POS_X = WINDOW_WIDTH - SAVE_BUTTON_WIDTH - SAVE_BUTTON_BOUND_DIST + PAGE_TO_CANVAS_DIST;
const SAVE_BUTTON_POS_Y = WINDOW_HEIGHT - SAVE_BUTTON_HEIGHT - SAVE_BUTTON_BOUND_DIST + PAGE_TO_CANVAS_DIST;
const SAVE_BUTTON_TEXT_SIZE = 21;

let saveTextColor;
let lastStatSave;
let displaySaveText = false;

let livingroomImage;
let kitchenImage;
let bedroomImage;
let bathroomImage;

let gameScenes = {
  livingroom: function () {
    renderBackground(livingroomImage);
  },
  kitchen: function () {
    renderBackground(kitchenImage);
  },
  bedroom: function () {
    renderBackground(bedroomImage);
  },
  bathroom: function () {
    renderBackground(bathroomImage);
  }
};
let currentScene;

let textImage;

function preload() {
  petAnimator = new AnimationPlayer(petAnimations);
  livingroomImage = loadImage(getFilePath(ASSET_FOLDER, "Livingroom.jpg"));
  kitchenImage = loadImage(getFilePath(ASSET_FOLDER, "Kitchen.webp"));
  bedroomImage = loadImage(getFilePath(ASSET_FOLDER, "Bedroom.jpg"));
  bathroomImage = loadImage(getFilePath(ASSET_FOLDER, "Bathroom.jpg"));
  textImage = loadImage(getFilePath(ESSENTIALS_IMAGE_FOLDER, "Sad_Expression.png"));
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  rectMode(CENTER);
  imageMode(CENTER);

  // Retrieving stats, if not available it defaults to defaultStats

  let gameStats = getItem("Stats") || defaultStats;

  // Removing stuff that doesn't exist in the defaultStats anymore

  for (let statName in gameStats) {
    if (defaultStats[statName] == null) {
      gameStats[statName] = null;
    }
  }

  // Adding stuff that didn't exist in the gameStats yet

  for (let statName in defaultStats) {
    if (gameStats[statName] == null) {
      gameStats[statName] = defaultStats[statName];
    }
  }

  // Initializing some colors

  staticBarColor = color(200);
  hungerBarColors = [
    color(165, 85, 55),
    color(200, 165, 100)
  ];
  energyBarColors = [
    color(100, 0, 255),
    color(255, 100, 255)
  ];
  happinessBarColors = [
    color(0, 0, 255),
    color(255, 255, 0)
  ];
  healthBarColors = [
    color(255, 0, 0),
    color(0, 215, 0)
  ];

  // Adding the stats

  new GameStat(
    "hunger",
    gameStats.hunger,
    hungerDrainSpeed,
    hungerBarColors
  );
  new GameStat(
    "energy",
    gameStats.energy,
    energyDrainSpeed,
    energyBarColors
  );
  new GameStat(
    "happiness",
    gameStats.happiness,
    happinessDrainSpeed,
    happinessBarColors
  );
  new GameStat(
    "health",
    gameStats.health,
    healthDrainSpeed,
    healthBarColors
  );

  // Adding some element colors

  elementBackgroundColor = color(175, 175, 175);
  elementBorderColor = color(200, 200, 200);
  elementTextColor = color(255);

  // Creating the room selector, which makes you able to switch rooms

  let roomSelector = createSelect();
  roomSelector.position(ROOM_SELECTOR_POS_X, ROOM_SELECTOR_POS_Y);
  roomSelector.size(ROOM_SELECTOR_WIDTH, ROOM_SELECTOR_HEIGHT);

  let sceneNames = Object.keys(gameScenes);
  let firstScene = sceneNames[0];
  currentScene = gameScenes[firstScene];

  for (let sceneName of sceneNames) {
    roomSelector.option(sceneName.toUpperCase(), sceneName);
  }

  roomSelector.selected(firstScene.toUpperCase());

  roomSelector.changed(function () {
    currentScene = gameScenes[roomSelector.value()];
  });

  styleElement(roomSelector, ROOM_SELECTOR_TEXT_SIZE);

  // Adding a save button that will instantly save the game

  let saveButton = createButton(SAVE_BUTTON_STRING);
  saveButton.position(SAVE_BUTTON_POS_X, SAVE_BUTTON_POS_Y);
  saveButton.size(SAVE_BUTTON_WIDTH, SAVE_BUTTON_HEIGHT);
  saveButton.mouseClicked(saveData);

  styleElement(saveButton, SAVE_BUTTON_TEXT_SIZE);

  // Setting this to the current time, since it doesn't have to instantly save data

  saveTextColor = color(0, 225, 255);
  lastStatSave = millis();

  textImage.resize(0, 300);
}

function draw() {
  textAlign(CENTER, CENTER);

  // Rendering the current scene

  currentScene();

  // Rendering the pet onto the canvas

  petAnimator.render(CENTER_X, CENTER_Y, WINDOW_WIDTH, WINDOW_HEIGHT);

  // Test pet

  push();

  tint(0, 255, 255);
  image(textImage, CENTER_X + 150, CENTER_Y + 200);

  pop();

  // Displaying the stat bars

  let statBarStackIndex = 0;

  for (let gameStat of Object.values(statObjects)) {
    gameStat.add(-gameStat.drainSpeed * deltaTime);
    gameStat.render(statBarStackIndex);
    statBarStackIndex++;
  }

  // Saving the data

  if (millis() - lastStatSave >= STAT_SAVE_FREQUENCY) {
    lastStatSave = millis();
    saveData();
  }

  if (displaySaveText) {
    push();

    stroke(0);
    strokeWeight(SAVE_TEXT_STROKE_WEIGHT);
    fill(saveTextColor);

    textSize(SAVE_TEXT_SIZE);
    text(SAVE_TEXT_STRING, CENTER_X, SAVE_TEXT_POS_Y);

    pop();
  }
}

function keyPressed() {
  switch (key) {
    case "q":
      petAnimator.play("default");
      break;
    case "w":
      petAnimator.play("sick");
      break;
    case "e":
      petAnimator.play("angry");
      break;
    case "r":
      addStat("health", 5);
      break;
    case "t":
      addStat("happiness", 5);
      break;
    case "y":
      addStat("energy", 5);
      break;
    case "u":
      addStat("hunger", 5);
      break;
    case "i":
      petAnimator.hide();
  }
}

function getFilePath(path, name) {
  if (Array.isArray(name)) {
    for (let i = 0; i < name.length; i++) {
      name[i] = path + name[i];
    }
  }

  return path + name;
}

function renderBackground(imageObject) {
  image(imageObject, CENTER_X, CENTER_Y, WINDOW_WIDTH, WINDOW_HEIGHT);
}

function saveData() {
  let gameStats = {};

  for (let [statName, gameStat] of Object.entries(statObjects)) {
    gameStats[statName] = gameStat.value;
  }

  storeItem("Stats", gameStats);

  if (!displaySaveText) {
    displaySaveText = true;
    setTimeout(function () {
      displaySaveText = false;
    }, SAVE_TEXT_DURATION);
  }
}

function addStat(name, amount) {
  statObjects[name].add(amount);
}

function toCSS(num) {
  return num + "px";
}

function styleElement(element, textSize) {
  element.style("background-color", elementBackgroundColor);
  element.style("border-radius", toCSS(ELEMENT_BORDER_RADIUS));
  element.style("border-width", toCSS(ELEMENT_BORDER_WIDTH));
  element.style("border-color", elementBorderColor);
  element.style("font-size", toCSS(textSize));
  element.style("font-weight", ELEMENT_FONT_WEIGHT);
  element.style("color", elementTextColor);
  element.style("webkit-text-stroke", `${toCSS(ELEMENT_TEXT_STROKE_WIDTH)} ${ELEMENT_TEXT_STROKE_COLOR}`);
}

class GameStat {
  constructor(name, value, drainSpeed, barColors) {
    this.name = name;
    this.value = value;
    this.drainSpeed = drainSpeed;
    this.barColors = barColors;
    statObjects[name] = this;
  }

  add(amount) {
    this.value = constrain(this.value + amount, MIN_STATS, MAX_STATS);
  }

  render(stackIndex) {
    let statValue = this.value;
    let statPercentage = statValue / MAX_STATS;
    let currentLength = lerp(0, STAT_BAR_LENGTH, statPercentage);
    let currentY = STAT_BAR_ORIGIN_Y - STAT_BAR_SPACING * stackIndex;
    let statColors = this.barColors;

    push();

    strokeWeight(STAT_BAR_STROKE_WEIGHT);
    fill(staticBarColor);
    rect(
      STATIC_BAR_POS_X,
      currentY,
      STAT_BAR_LENGTH,
      STAT_BAR_HEIGHT,
      STAT_BAR_CORNER_RADIUS
    );

    fill(lerpColor(statColors[0], statColors[1], statPercentage));
    rect(
      STAT_BAR_POS_X + currentLength / 2,
      currentY,
      currentLength,
      STAT_BAR_HEIGHT,
      STAT_BAR_CORNER_RADIUS
    );

    stroke(0);
    strokeWeight(STAT_BAR_TEXT_STROKE_WEIGHT);
    fill(255);

    textSize(STAT_BAR_TEXT_SIZE);
    text(`${this.name.toUpperCase()}: ${ceil(statValue)}`, STATIC_BAR_POS_X, currentY);

    pop();
  }
}

class AnimationPlayer {
  constructor(animData) {
    let animationPlayer = this;

    for (let animInfo of Object.values(animData)) {
      let anim = createVideo(getFilePath(ASSET_FOLDER, animInfo.anim), function () {
        anim.attribute("muted", "true");

        if (animInfo.idle) {
          anim.attribute("loop", "true");
        } else {
          anim.onended(function () {
            let currentIdle = animationPlayer.currentIdle;

            if (currentIdle) {
              animationPlayer.play(currentIdle, true);
            } else {
              animationPlayer.hide();
            }
          });
        }

        anim.hide();
      });

      animInfo.anim = anim;
    }

    animationPlayer.animData = animData;
  }

  play(animName, force) {
    let currentAnim = this.currentAnim;

    if (animName !== currentAnim) {
      let animData = this.animData;
      let oldAnimInfo = animData[currentAnim];
      let newAnimInfo = animData[animName];
      let isNewIdleAnim = newAnimInfo.idle;

      // Overwrites the currentIdle when the new anim is an idle animation

      if (isNewIdleAnim) {
        this.currentIdle = animName;
      }

      /*
        Will only instantly overwrite the animation when conditions are met
        Either the force parameter must be true (makes sure it will overwrite the anim no matter what)
        It has to be an action anim
        There was no previous animation
        Or both the old and new animation were idle animations
      */

      if (
        force ||
        !isNewIdleAnim ||
        !oldAnimInfo ||
        oldAnimInfo.idle &&
        isNewIdleAnim
      ) {
        this.currentAnim = animName;

        if (oldAnimInfo) {
          oldAnimInfo.anim.stop();
        }

        newAnimInfo.anim.play();
      }
    }
  }

  hide() {
    this.currentAnim = null;
    this.currentIdle = null;
  }

  render(x, y, width, height) {
    let currentAnimInfo = this.animData[this.currentAnim];

    if (currentAnimInfo) {
      image(currentAnimInfo.anim, x, y, width, height);
    }
  }
}