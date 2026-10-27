const PAGE_TO_CANVAS_DIST = 8;

const WINDOW_WIDTH = 960;
const WINDOW_HEIGHT = 720;

const CENTER_POS_X = WINDOW_WIDTH / 2;
const CENTER_POS_Y = WINDOW_HEIGHT / 2;

const ASSET_FOLDER = "./assets";

let buttonPressSound;
let insufficientPointsSound;
let saveGameSound;

const ELEMENT_BORDER_RADIUS = "15px";
const ELEMENT_BORDER_WIDTH = "5px";
const ELEMENT_FONT_WEIGHT = "Bold";
const ELEMENT_TEXT_STROKE = "1px rgb(0, 0, 0)";

let elementBackgroundColor;
let elementBorderColor;
let elementTextColor;

const LIVINGROOM_SCENE = "LIVINGROOM";
const KITCHEN_SCENE = "KITCHEN";
const BATHROOM_SCENE = "BATHROOM";
const BEDROOM_SCENE = "BEDROOM";

const ROOM_SELECTOR_WIDTH = 200;
const ROOM_SELECTOR_HEIGHT = 40;
const ROOM_SELECTOR_BOUND_DIST = 15;
const ROOM_SELECTOR_POS_X = WINDOW_WIDTH - ROOM_SELECTOR_WIDTH - ROOM_SELECTOR_BOUND_DIST + PAGE_TO_CANVAS_DIST;
const ROOM_SELECTOR_POS_Y = ROOM_SELECTOR_BOUND_DIST + PAGE_TO_CANVAS_DIST;
const ROOM_SELECTOR_TEXT_SIZE = "22px";

let currentScene = LIVINGROOM_SCENE;

let livingroomBackground;
let kitchenBackground;
let bathroomBackground;
let bedroomBackground;

const PET_ANIMATIONS = {
  mainIdle: {
    track: ["main-idle.webm", "main-idle.mov"],
    looped: true
  },
  hungryIdle: {
    track: ["main-idle.webm", "main-idle.mov"],
    looped: true
  },
  sadIdle: {
    track: ["main-idle.webm", "main-idle.mov"],
    looped: true
  },
  sleepyIdle: {
    track: ["main-idle.webm", "main-idle.mov"],
    looped: true
  },
  deathIdle: {
    track: ["main-idle.webm", "main-idle.mov"],
    looped: true
  },
  eatAnim: { track: ["main-idle.webm", "main-idle.mov"] },
  happyAnim: { track: ["main-idle.webm", "main-idle.mov"] },
  dieAnim: { track: ["main-idle.webm", "main-idle.mov"] }
};

let petAnimator;

const STATS_MAX_VALUE = 100;
const STATS_SAVE_INTERVAL = 30000;
const STATS_SAVE_COOLDOWN = 2000;
const STATS_STORE_KEY = "Stats";
const STATS_EXPRESSION_THRESHOLD = 30;
const STATS_DEFAULT = {
  fullness: STATS_MAX_VALUE,
  energy: STATS_MAX_VALUE,
  happiness: STATS_MAX_VALUE,
  health: STATS_MAX_VALUE,
  foodPackets: 5,
  medicine: 1
};

const FULLNESS_DRAIN_SPEED = 0.0015;
const ENERGY_DRAIN_SPEED = 0.00075;
const HAPPINESS_DRAIN_SPEED = 0.001;
const HEALTH_DRAIN_SPEED = 0;

const ZERO_FULLNESS_HEALTH_DRAIN_SPEED_ADDITION = 0.00025;
const ZERO_ENERGY_HEALTH_DRAIN_SPEED_ADDITION = 0.00015;
const ZERO_HAPPINESS_HEALTH_DRAIN_SPEED_ADDITION = 0.0001;

const ZERO_FULLNESS_HAPPINESS_DRAIN_SPEED_ADDITION = 0.0005;

const ZERO_FULLNESS_ENERGY_DRAIN_SPEED_ADDITION = 0.00015;

const SLEEP_ENERGY_GAIN_SPEED = 0.001;
const SLEEP_HEALTH_GAIN_SPEED = 0.00075;

const FEED_BUTTON_STRING = "FEED";
const FEED_BUTTON_WIDTH = 200;
const FEED_BUTTON_HEIGHT = 50;
const FEED_BUTTON_POS_X = CENTER_POS_X - FEED_BUTTON_WIDTH / 2 + PAGE_TO_CANVAS_DIST;
const FEED_BUTTON_POS_Y = WINDOW_HEIGHT - FEED_BUTTON_HEIGHT - 15 + PAGE_TO_CANVAS_DIST;
const FEED_BUTTON_TEXT_SIZE = "30px";
const FEED_BUTTON_FULLNESS_ADDITION = 10;

const SLEEP_BUTTON_STRING = "TOGGLE SLEEP";
const SLEEP_BUTTON_WIDTH = 200;
const SLEEP_BUTTON_HEIGHT = 50;
const SLEEP_BUTTON_POS_X = 15 + PAGE_TO_CANVAS_DIST;
const SLEEP_BUTTON_POS_Y = CENTER_POS_Y - SLEEP_BUTTON_HEIGHT / 2 + PAGE_TO_CANVAS_DIST;
const SLEEP_BUTTON_TEXT_SIZE = "22px";

const MEDICINE_BUTTON_STRING = "GIVE MEDICINE";
const MEDICINE_BUTTON_WIDTH = 200;
const MEDICINE_BUTTON_HEIGHT = 50;
const MEDICINE_BUTTON_POS_X = WINDOW_WIDTH - MEDICINE_BUTTON_WIDTH - 15 + PAGE_TO_CANVAS_DIST;
const MEDICINE_BUTTON_POS_Y = CENTER_POS_Y - SLEEP_BUTTON_HEIGHT / 2 + PAGE_TO_CANVAS_DIST;
const MEDICINE_BUTTON_TEXT_SIZE = "22px";
const MEDICINE_BUTTON_HEALTH_ADDITION = 20;

const FULLNESS_STING = "FULLNESS";
const ENERGY_STRING = "ENERGY";
const HAPPINESS_STRING = "HAPPINESS";
const HEALTH_STRING = "HEALTH";

const SAVE_TEXT_STRING = "Game saved!";
const SAVE_TEXT_SIZE = 50;
const SAVE_TEXT_POS_Y = 50;
const SAVE_TEXT_STROKE_WEIGHT = 4;

const NO_FOOD_TEXT_STRING = "Not enough food packets";
const NO_FOOD_TEXT_SIZE = 30;
const NO_FOOD_TEXT_POS_Y = 50;
const NO_FOOD_TEXT_STROKE_WEIGHT = 4;
const NO_FOOD_TEXT_DURATION = 1000;

const NO_MEDICINE_TEXT_STRING = "Not enough medicine";
const NO_MEDICINE_TEXT_SIZE = 40;
const NO_MEDICINE_TEXT_POS_Y = 50;
const NO_MEDICINE_TEXT_STROKE_WEIGHT = 4;
const NO_MEDICINE_TEXT_DURATION = 1000;

const SAVE_BUTTON_STRING = "SAVE GAME";
const SAVE_BUTTON_WIDTH = 150;
const SAVE_BUTTON_HEIGHT = 60;
const SAVE_BUTTON_BOUND_DIST = 15 - PAGE_TO_CANVAS_DIST;
const SAVE_BUTTON_POS_X = WINDOW_WIDTH - SAVE_BUTTON_WIDTH - SAVE_BUTTON_BOUND_DIST;
const SAVE_BUTTON_POS_Y = WINDOW_HEIGHT - SAVE_BUTTON_HEIGHT - SAVE_BUTTON_BOUND_DIST;
const SAVE_BUTTON_TEXT_SIZE = "21px";

const STAT_BAR_LENGTH = 250;
const STAT_BAR_HEIGHT = 25;
const STAT_BAR_SPACING = STAT_BAR_HEIGHT * 1.5;
const STAT_BAR_CORNER_RADIUS = STAT_BAR_HEIGHT / 3;
const STAT_BAR_STROKE_WEIGHT = 1.5;
const STAT_BAR_POS_X = 15;
const STAT_BAR_ORIGIN_Y = WINDOW_HEIGHT - STAT_BAR_HEIGHT - 15;
const STAT_BAR_TEXT_SIZE = STAT_BAR_HEIGHT * 0.65;
const STAT_BAR_TEXT_STROKE_WEIGHT = 2;
const STAT_BAR_TEXT_OFFSET_X = STAT_BAR_LENGTH / 2;
const STAT_BAR_TEXT_OFFSET_Y = STAT_BAR_HEIGHT / 2;

const POINT_INDICATOR_SPACING = 40;
const POINT_INDICATOR_POS_X = 15;
const POINT_INDICATOR_ORIGIN_Y = 20;
const POINT_INDICATOR_TEXT_SIZE = 30;
const POINT_INDICATOR_TEXT_STROKE_WEIGHT = 3;

const FOOD_PACKET_TEXT_STRING = "FOOD PACKETS";

const MEDICINE_TEXT_STRING = "MEDICINE";

let fullness;
let energy;
let happiness;
let health;
let foodPackets;
let medicine;

let feedButton;
let sleepButton;
let medicineButton;

let isSleeping = false;
let isDead = false;
let inScene;

let statsSaveDebounce = true;

let showNoFoodText = false;
let showNoMedicineText = false;

let backgroundBarColor;
let statBarTextColor;

let fullnessBarMinColor;
let fullnessBarMaxColor;
let energyBarMinColor;
let energyBarMaxColor;
let happinessBarMinColor;
let happinessBarMaxColor;
let healthBarMinColor;
let healthBarMaxColor;

let lightsOffTintColor;

let saveTextColor;
let noFoodTextColor;
let noMedicineTextColor;

let foodPacketTextColor;
let medicineTextColor;

const START_BUTTON_STRING = "START GAME!";
const START_BUTTON_WIDTH = 300;
const START_BUTTON_HEIGHT = 150;
const START_BUTTON_POS_X = CENTER_POS_X - START_BUTTON_WIDTH / 2 + PAGE_TO_CANVAS_DIST;
const START_BUTTON_POS_Y = 500;
const START_BUTTON_TEXT_SIZE = "40px";

let onMenu = true;

function preload() {
  buttonPressSound = loadSound(getFilePath(ASSET_FOLDER, "button-press.mp3"));
  buttonPressSound.setVolume(0.8);

  insufficientPointsSound = loadSound(getFilePath(ASSET_FOLDER, "insufficient-points.mp3"));
  insufficientPointsSound.setVolume(1.25);

  saveGameSound = loadSound(getFilePath(ASSET_FOLDER, "game-save.mp3"));
  saveGameSound.setVolume(1.5);

  livingroomBackground = loadImage(getFilePath(ASSET_FOLDER, "livingroom.jpg"));
  kitchenBackground = loadImage(getFilePath(ASSET_FOLDER, "kitchen.webp"));
  bathroomBackground = loadImage(getFilePath(ASSET_FOLDER, "bathroom.jpg"));
  bedroomBackground = loadImage(getFilePath(ASSET_FOLDER, "bedroom.jpg"));

  petAnimator = new AnimationPlayer(PET_ANIMATIONS);
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  // Making the pivot of text in the center on default

  textAlign(CENTER, CENTER);

  // Assigning some element settings

  elementBackgroundColor = color(175, 175, 175);
  elementBorderColor = color(200, 200, 200);
  elementTextColor = color(255);

  // Retrieving the pet stats from the local storage, and merging them with the default stats

  const gameStats = {
    ...STATS_DEFAULT,
    ...getItem(STATS_STORE_KEY)
  };

  fullness = gameStats.fullness;
  energy = gameStats.energy;
  happiness = gameStats.happiness;
  health = gameStats.health;
  foodPackets = gameStats.foodPackets;
  medicine = gameStats.medicine;

  // Assigning the stat bar colors

  backgroundBarColor = color(200);
  statBarTextColor = color(255);

  fullnessBarMinColor = color(165, 85, 55);
  fullnessBarMaxColor = color(200, 165, 100);
  energyBarMinColor = color(100, 0, 255);
  energyBarMaxColor = color(255, 100, 255);
  happinessBarMinColor = color(0, 0, 255);
  happinessBarMaxColor = color(255, 255, 0);
  healthBarMinColor = color(255, 0, 0);
  healthBarMaxColor = color(0, 215, 0);

  // The color that appears in the dark

  lightsOffTintColor = color(100, 100, 100);

  // The color of the save indicator that pops up when saving the game

  saveTextColor = color(0, 225, 255);

  // The color of the no food text

  noFoodTextColor = color(255, 255, 0);
  noMedicineTextColor = color(255, 0, 255);

  // The color of the food packet indicator

  foodPacketTextColor = color(255, 155, 0);
  medicineTextColor = color(0, 155, 255);

  // Creating the room selector, which makes you able to change scenes

  const roomSelector = createSelect();

  // Positioning and sizing it correctly

  roomSelector.position(ROOM_SELECTOR_POS_X, ROOM_SELECTOR_POS_Y);
  roomSelector.size(ROOM_SELECTOR_WIDTH, ROOM_SELECTOR_HEIGHT);

  // Adding the possible rooms and make it select the current scene on default

  roomSelector.option(LIVINGROOM_SCENE);
  roomSelector.option(KITCHEN_SCENE);
  roomSelector.option(BATHROOM_SCENE);
  roomSelector.option(BEDROOM_SCENE);
  roomSelector.selected(currentScene);

  // Playing a little sound when opened or closed

  roomSelector.mousePressed(() => buttonPressSound.play());

  /*
    Making sure the current scene changes when the current selected tag changes
    Also making sure that things such as buttons are setup correctly in the next scene
  */

  roomSelector.changed(() => {
    currentScene = roomSelector.selected();
    setupRoom();
    buttonPressSound.play();
  });

  roomSelector.hide();

  styleElement(roomSelector, ROOM_SELECTOR_TEXT_SIZE);

  // Creating a feeding button

  feedButton = createButton(FEED_BUTTON_STRING);

  // Placing and sizing it

  feedButton.position(FEED_BUTTON_POS_X, FEED_BUTTON_POS_Y);
  feedButton.size(FEED_BUTTON_WIDTH, FEED_BUTTON_HEIGHT);

  // Making it add fullness when feeding

  feedButton.mouseClicked(() => {
    if (foodPackets > 0) {
      foodPackets--;

      addFullness(FEED_BUTTON_FULLNESS_ADDITION);
      petAnimator.play("eatAnim");

      buttonPressSound.play();
    } else if (!showNoFoodText) {
      showNoFoodText = true;

      setTimeout(() => (showNoFoodText = false), NO_FOOD_TEXT_DURATION);
      insufficientPointsSound.play();
    }
  });

  feedButton.hide();

  styleElement(feedButton, FEED_BUTTON_TEXT_SIZE);

  // Creating sleep buttob

  sleepButton = createButton(SLEEP_BUTTON_STRING);

  // Placing and sizing

  sleepButton.position(SLEEP_BUTTON_POS_X, SLEEP_BUTTON_POS_Y);
  sleepButton.size(SLEEP_BUTTON_WIDTH, SLEEP_BUTTON_HEIGHT);

  // Toggling sleep mode

  sleepButton.mouseClicked(() => {
    isSleeping = !isSleeping;

    if (isSleeping) inScene = BEDROOM_SCENE;
    else inScene = null;

    buttonPressSound.play();
  });

  sleepButton.hide();

  styleElement(sleepButton, SLEEP_BUTTON_TEXT_SIZE);

  // Creating medicine button

  medicineButton = createButton(MEDICINE_BUTTON_STRING);

  // Placement

  medicineButton.position(MEDICINE_BUTTON_POS_X, MEDICINE_BUTTON_POS_Y);
  medicineButton.size(MEDICINE_BUTTON_WIDTH, MEDICINE_BUTTON_HEIGHT);

  // Adding health

  medicineButton.mouseClicked(() => {
    if (medicine > 0) {
      medicine--;

      addHealth(MEDICINE_BUTTON_HEALTH_ADDITION);
      petAnimator.play("eatAnim");

      buttonPressSound.play();
    } else if (!showNoMedicineText) {
      showNoMedicineText = true;

      setTimeout(() => (showNoMedicineText = false), NO_MEDICINE_TEXT_DURATION);
      insufficientPointsSound.play();
    }
  });

  medicineButton.hide();

  styleElement(medicineButton, MEDICINE_BUTTON_TEXT_SIZE);

  // Creating a new button for manual stat saving

  const saveButton = createButton(SAVE_BUTTON_STRING);

  // Also positioning this correctly

  saveButton.position(SAVE_BUTTON_POS_X, SAVE_BUTTON_POS_Y);
  saveButton.size(SAVE_BUTTON_WIDTH, SAVE_BUTTON_HEIGHT);

  // Saving the stats when you click on the button

  saveButton.mouseClicked(() => {
    if (!saveStats()) buttonPressSound.play();
  });

  saveButton.hide();

  styleElement(saveButton, SAVE_BUTTON_TEXT_SIZE);

  const startButton = createButton(START_BUTTON_STRING);

  // Doing the same thing like with the other elements

  startButton.position(START_BUTTON_POS_X, START_BUTTON_POS_Y);
  startButton.size(START_BUTTON_WIDTH, START_BUTTON_HEIGHT);

  // Making the game start when the button has been clicked

  startButton.mouseClicked(() => {
    onMenu = false;

    setupRoom();
    startButton.hide();
    roomSelector.show();
    saveButton.show();

    buttonPressSound.play();
  });

  styleElement(startButton, START_BUTTON_TEXT_SIZE);

  // Resizing the backgrounds to make them fit within the canvas

  livingroomBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);
  kitchenBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);
  bathroomBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);
  bedroomBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);

  // Making the game save every interval

  setInterval(() => {
    if (!onMenu) saveStats();
  }, STATS_SAVE_INTERVAL);
}

function draw() {
  // Rendering the game or the menu screen based on game state

  if (onMenu) {
    background(220);
  } else {
    // Rendering the core background

    background(220);

    push();

    if (isSleeping) {
      tint(lightsOffTintColor);
    }

    // Rendering the current scene

    switch (currentScene) {
      case LIVINGROOM_SCENE:
        drawLivingroom();
        break;
      case KITCHEN_SCENE:
        drawKitchen();
        break;
      case BATHROOM_SCENE:
        drawBathroom();
        break;
      case BEDROOM_SCENE:
        drawBedroom();
        break;
      default:
        currentScene = LIVINGROOM_SCENE;
        console.warn(`The current scene is reset to ${LIVINGROOM_SCENE} because it couldn't find a valid scene`);
    }

    // Rendering the pet

    if (!inScene || currentScene === inScene) {
      petAnimator.render(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }

    pop();

    // Rendering the stat bars

    drawStatBar(FULLNESS_STING, fullness, fullnessBarMinColor, fullnessBarMaxColor);
    drawStatBar(ENERGY_STRING, energy, energyBarMinColor, energyBarMaxColor, 1);
    drawStatBar(HAPPINESS_STRING, happiness, happinessBarMinColor, happinessBarMaxColor, 2);
    drawStatBar(HEALTH_STRING, health, healthBarMinColor, healthBarMaxColor, 3);

    // Displaying the point indicators

    drawPointIndicator(FOOD_PACKET_TEXT_STRING, foodPackets, foodPacketTextColor);
    drawPointIndicator(MEDICINE_TEXT_STRING, medicine, medicineTextColor, 1);

    // Displaying an indicator that tells you that the game has been saved

    if (!statsSaveDebounce) {
      push();

      stroke(0);
      strokeWeight(SAVE_TEXT_STROKE_WEIGHT);
      fill(saveTextColor);
      textSize(SAVE_TEXT_SIZE);
      text(SAVE_TEXT_STRING, CENTER_POS_X, SAVE_TEXT_POS_Y);

      pop();
    }

    if (showNoFoodText) {
      push();

      stroke(0);
      strokeWeight(NO_FOOD_TEXT_STROKE_WEIGHT);
      fill(noFoodTextColor);
      textSize(NO_FOOD_TEXT_SIZE);
      text(NO_FOOD_TEXT_STRING, CENTER_POS_X, NO_FOOD_TEXT_POS_Y);

      pop();
    }

    if (showNoMedicineText) {
      push();

      stroke(0);
      strokeWeight(NO_MEDICINE_TEXT_STROKE_WEIGHT);
      fill(noMedicineTextColor);
      textSize(NO_MEDICINE_TEXT_SIZE);
      text(NO_MEDICINE_TEXT_STRING, CENTER_POS_X, NO_MEDICINE_TEXT_POS_Y);

      pop();
    }

    let energyDrainSpeed = (isSleeping && -SLEEP_ENERGY_GAIN_SPEED) || ENERGY_DRAIN_SPEED;
    let happinessDrainSpeed = HAPPINESS_DRAIN_SPEED;
    let healthDrainSpeed = (isSleeping && -SLEEP_HEALTH_GAIN_SPEED) || HEALTH_DRAIN_SPEED;

    // Modifying the stat drain speeds based on other stats

    if (energy === 0) healthDrainSpeed += ZERO_ENERGY_HEALTH_DRAIN_SPEED_ADDITION;
    if (happiness === 0) healthDrainSpeed += ZERO_HAPPINESS_HEALTH_DRAIN_SPEED_ADDITION;
    if (fullness === 0) {
      energyDrainSpeed += ZERO_FULLNESS_ENERGY_DRAIN_SPEED_ADDITION;
      happinessDrainSpeed += ZERO_FULLNESS_HAPPINESS_DRAIN_SPEED_ADDITION;
      healthDrainSpeed += ZERO_FULLNESS_HEALTH_DRAIN_SPEED_ADDITION;
    }

    // Draining the stats over time and based on some other factors

    addFullness(-FULLNESS_DRAIN_SPEED * deltaTime);
    if (energyDrainSpeed !== 0) addEnergy(-energyDrainSpeed * deltaTime);
    if (!isSleeping && happinessDrainSpeed !== 0) addHappiness(-happinessDrainSpeed * deltaTime);
    if (healthDrainSpeed !== 0) addHealth(-healthDrainSpeed * deltaTime);

    if (isSleeping || energy <= STATS_EXPRESSION_THRESHOLD) {
      petAnimator.play("sleepyIdle");
    } else if (happiness <= STATS_EXPRESSION_THRESHOLD || health <= STATS_EXPRESSION_THRESHOLD) {
      petAnimator.play("sadIdle");
    } else if (fullness <= STATS_EXPRESSION_THRESHOLD) {
      petAnimator.play("hungryIdle");
    } else {
      petAnimator.play("mainIdle");
    }
  }
}

function keyPressed() {
  switch (key) {
    case "f":
      foodPackets++;
      buttonPressSound.play();
      break;
    case "r":
      removeItem(STATS_STORE_KEY);
      window.location.reload();
      break;
    case "m":
      medicine++;
      buttonPressSound.play();
      break;
    case "h":
      addHappiness(5);
      buttonPressSound.play();
  }
}

function setupRoom() {
  feedButton.hide();
  sleepButton.hide();
  medicineButton.hide();

  let showButtons = !isSleeping && !isDead;

  switch (currentScene) {
    case LIVINGROOM_SCENE:
      console.log("Scene switched to livingroom!");
      break;
    case KITCHEN_SCENE:
      if (showButtons) feedButton.show();
      console.log("Scene switched to kitchen!");
      break;
    case BATHROOM_SCENE:
      if (showButtons) medicineButton.show();
      console.log("Scene switched to bathroom!");
      break;
    case BEDROOM_SCENE:
      sleepButton.show();
      console.log("Scene switched to bedroom!");
      break;
    default:
      console.warn("Scene switched to an unknown scene");
  }
}

// Draws the livingroom scene

function drawLivingroom() {
  image(livingroomBackground, 0, 0);
}

// Draws the kitchen scene

function drawKitchen() {
  image(kitchenBackground, 0, 0);
}

// Draws the bathroom scene

function drawBathroom() {
  image(bathroomBackground, 0, 0);
}

// Draws the bedroom scene

function drawBedroom() {
  image(bedroomBackground, 0, 0);
}

// A function that draws a stat bar, with optional stack index that offsets the stat bar

function drawStatBar(label, value, minColor, maxColor, stackIndex = 0) {
  let percentage = value / STATS_MAX_VALUE;

  push();

  translate(STAT_BAR_POS_X, STAT_BAR_ORIGIN_Y - STAT_BAR_SPACING * stackIndex);

  strokeWeight(STAT_BAR_STROKE_WEIGHT);
  fill(backgroundBarColor);
  rect(0, 0, STAT_BAR_LENGTH, STAT_BAR_HEIGHT, STAT_BAR_CORNER_RADIUS);

  fill(lerpColor(minColor, maxColor, percentage));
  rect(0, 0, STAT_BAR_LENGTH * percentage, STAT_BAR_HEIGHT, STAT_BAR_CORNER_RADIUS);

  stroke(0);
  strokeWeight(STAT_BAR_TEXT_STROKE_WEIGHT);
  fill(statBarTextColor);
  textSize(STAT_BAR_TEXT_SIZE);
  text(`${label}: ${ceil(value)}`, STAT_BAR_TEXT_OFFSET_X, STAT_BAR_TEXT_OFFSET_Y);

  pop();
}

function drawPointIndicator(label, value, textColor, stackIndex = 0) {
  push();

  stroke(0);
  strokeWeight(POINT_INDICATOR_TEXT_STROKE_WEIGHT);
  fill(textColor);
  textAlign(LEFT, TOP);
  textSize(POINT_INDICATOR_TEXT_SIZE);
  text(`${label}: ${value}`, POINT_INDICATOR_POS_X, POINT_INDICATOR_ORIGIN_Y + POINT_INDICATOR_SPACING * stackIndex);

  pop();
}

function clampStat(value) {
  return constrain(value, 0, STATS_MAX_VALUE);
}

function addHealth(amount) {
  health = clampStat(health + amount);
}

function addHappiness(amount) {
  happiness = clampStat(happiness + amount);
}

function addEnergy(amount) {
  energy = clampStat(energy + amount);
}

function addFullness(amount) {
  fullness = clampStat(fullness + amount);
}

function saveStats() {
  if (statsSaveDebounce) {
    statsSaveDebounce = false;

    storeItem(STATS_STORE_KEY, {
      fullness,
      energy,
      happiness,
      health,
      foodPackets,
      medicine
    });

    setTimeout(() => (statsSaveDebounce = true), STATS_SAVE_COOLDOWN);

    saveGameSound.play();

    return true;
  }

  return false;
}

// A function to easily construct a full file path

function getFilePath(path, name) {
  if (Array.isArray(name)) {
    for (let i = 0; i < name.length; i++) {
      name[i] = `${path}/${name[i]}`;
    }
  } else {
    name = `${path}/${name}`;
  }

  return name;
}

// Easily styles the element, with custom text size

function styleElement(element, textSize) {
  element.style("background-color", elementBackgroundColor);
  element.style("border-radius", ELEMENT_BORDER_RADIUS);
  element.style("border-width", ELEMENT_BORDER_WIDTH);
  element.style("border-color", elementBorderColor);
  element.style("font-size", textSize);
  element.style("font-weight", ELEMENT_FONT_WEIGHT);
  element.style("color", elementTextColor);
  element.style("-webkit-text-stroke", ELEMENT_TEXT_STROKE);
}

// AnimationPlayer class that makes me able to use videos as animations easily

class AnimationPlayer {
  constructor(animations) {
    for (let animation of Object.values(animations)) {
      let track = createVideo(getFilePath(ASSET_FOLDER, animation.track), () => {
        track.attribute("muted", "true");

        if (animation.looped) {
          track.attribute("loop", "true");
        } else {
          track.onended(() => {
            let loopingTrack = this.loopingTrack;

            if (loopingTrack) {
              this.play(loopingTrack, true);
            } else {
              this.stop();
            }
          });
        }

        track.hide();
      });

      animation.track = track;
    }

    this.animations = animations;
  }

  // Plays the animation

  play(name, force) {
    let animations = this.animations;
    let playingTrack = this.playingTrack;
    let currentAnimation = animations[playingTrack];
    let newAnimation = animations[name];
    let isLooped = newAnimation.looped;

    // Overwrites the currentIdle when the new anim is an idle animation

    if (isLooped) {
      this.loopingTrack = name;
    }

    /*
      Will only instantly overwrite the animation when conditions are met
      Either the force parameter must be true (makes sure it will overwrite the anim no matter what)
      It has to be an action anim
      There was no previous animation
      Or both the old and new animation were idle animations
    */

    if (force || !isLooped || !currentAnimation || (isLooped && currentAnimation.looped && name !== playingTrack)) {
      this.playingTrack = name;

      if (currentAnimation) {
        currentAnimation.track.stop();
      }

      newAnimation.track.play();
    }
  }

  // Stops the animation

  stop() {
    this.playingTrack = null;
    this.loopingTrack = null;
  }

  // Renders the animation onto the canvas

  render(x, y, width, height) {
    let playingAnimation = this.animations[this.playingTrack];

    if (playingAnimation) {
      image(playingAnimation.track, x, y, width, height);
    }
  }
}
