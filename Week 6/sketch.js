const PAGE_TO_CANVAS_DIST = 8;

const WINDOW_WIDTH = 960;
const WINDOW_HEIGHT = 720;

const CENTER_POS_X = WINDOW_WIDTH / 2;

const ASSET_FOLDER = "./assets";

let buttonPressSound;

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
    track: "ultraman.mp4",
    looped: true
  },
  sadIdle: {
    track: "ultraman.mp4",
    looped: true
  },
  sleepyIdle: {
    track: "ultraman.mp4",
    looped: true
  },
  deathIdle: {
    track: "ultraman.mp4",
    looped: true
  },
  eatAnim: { track: "ultraman.mp4" },
  happyAnim: { track: "ultraman.mp4" },
  dieAnim: { track: "ultraman.mp4" }
};

let petAnimator;

const STATS_MAX_VALUE = 100;
const STATS_SAVE_FREQUENCY = 30000;
const STATS_SAVE_COOLDOWN = 2000;
const STATS_STORE_KEY = "Stats";
const STATS_DEFAULT = {
  fullness: STATS_MAX_VALUE,
  energy: STATS_MAX_VALUE,
  happiness: STATS_MAX_VALUE,
  health: STATS_MAX_VALUE
};

const FULLNESS_STING = "FULLNESS";
const ENERGY_STRING = "ENERGY";
const HAPPINESS_STRING = "HAPPINESS";
const HEALTH_STRING = "HEALTH";

const SAVE_TEXT_STRING = "Game saved!";
const SAVE_TEXT_SIZE = 50;
const SAVE_TEXT_POS_Y = 50;
const SAVE_TEXT_STROKE_WEIGHT = 4;

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

let fullness;
let energy;
let happiness;
let health;

let statsLastSave = 0;
let statsSaveDebounce = true;

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

let saveTextColor;

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

  // The color of the save indicator that pops up when saving the game

  saveTextColor = color(0, 225, 255);

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

    switch (currentScene) {
      case LIVINGROOM_SCENE:
        console.log("Scene switched to livingroom!");
        break;
      case KITCHEN_SCENE:
        console.log("Scene switched to kitchen!");
        break;
      case BATHROOM_SCENE:
        console.log("Scene switched to bathroom!");
        break;
      case BEDROOM_SCENE:
        console.log("Scene switched to bedroom!");
        break;
      default:
        console.warn("Scene switched to an unknown scene");
    }

    buttonPressSound.play();
  });

  roomSelector.hide();

  styleElement(roomSelector, ROOM_SELECTOR_TEXT_SIZE);

  // Creating a new button for manual stat saving

  const saveButton = createButton(SAVE_BUTTON_STRING);

  // Also positioning this correctly

  saveButton.position(SAVE_BUTTON_POS_X, SAVE_BUTTON_POS_Y);
  saveButton.size(SAVE_BUTTON_WIDTH, SAVE_BUTTON_HEIGHT);

  // Saving the stats when you click on the button

  saveButton.mouseClicked(() => {
    saveStats();
    buttonPressSound.play();
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
    startButton.hide();
    roomSelector.show();
    saveButton.show();
    petAnimator.play("mainIdle");
    buttonPressSound.play();
  });

  styleElement(startButton, START_BUTTON_TEXT_SIZE);

  // Resizing the backgrounds to make them fit within the canvas

  livingroomBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);
  kitchenBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);
  bathroomBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);
  bedroomBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function draw() {
  // Rendering the game or the menu screen based on game state

  if (onMenu) {
    background(220);
  } else {
    // Rendering the core background

    background(220);

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

    petAnimator.render(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    // Rendering the stat bars

    drawStatBar(FULLNESS_STING, fullness, fullnessBarMinColor, fullnessBarMaxColor);
    drawStatBar(ENERGY_STRING, energy, energyBarMinColor, energyBarMaxColor, 1);
    drawStatBar(HAPPINESS_STRING, happiness, happinessBarMinColor, happinessBarMaxColor, 2);
    drawStatBar(HEALTH_STRING, health, healthBarMinColor, healthBarMaxColor, 3);

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

    // Draining the stats over time

    // The code I will make later

    // Saving the stats every frequency

    if (millis() - statsLastSave >= STATS_SAVE_FREQUENCY) {
      saveStats();
    }
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

function saveStats() {
  if (statsSaveDebounce) {
    statsSaveDebounce = false;
    statsLastSave = millis();

    storeItem(STATS_STORE_KEY, {
      fullness,
      energy,
      happiness,
      health
    });

    setTimeout(() => (statsSaveDebounce = true), STATS_SAVE_COOLDOWN);
  }
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
    let playingTrack = this.playingTrack;

    if (name !== playingTrack) {
      let animations = this.animations;
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

      if (force || !isLooped || !currentAnimation || (currentAnimation.looped && isLooped)) {
        this.playingTrack = name;

        if (currentAnimation) {
          currentAnimation.track.stop();
        }

        newAnimation.track.play();
      }
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
