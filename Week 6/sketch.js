const PAGE_TO_CANVAS_DIST = 8;

const WINDOW_WIDTH = 960;
const WINDOW_HEIGHT = 720;

const CENTER_POS_X = WINDOW_WIDTH / 2;
const CENTER_POS_Y = WINDOW_HEIGHT / 2;

const ASSET_FOLDER = "./assets";
const ESSENTIALS_IMAGE_FOLDER = "../Essentials/images";

let buttonPressSound;
let dieSound;

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

let currentScene;
let roomSelector;

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
  punchAnim: { track: ["main-idle.webm", "main-idle.mov"] },
  dieAnim: { track: ["main-idle.webm", "main-idle.mov"] }
};

let petAnimator;

const STATS_MAX_VALUE = 100;
const STATS_SAVE_INTERVAL = 30000;
const STATS_SAVE_COOLDOWN = 2000;
const STATS_STORE_KEY = "Stats";
const STATS_LOW_PERCENTAGE = 30;
const STATS_DEFAULT = {
  fullness: STATS_MAX_VALUE,
  energy: STATS_MAX_VALUE,
  happiness: STATS_MAX_VALUE,
  health: STATS_MAX_VALUE,
  dirtiness: 0,
  foodPackets: 5,
  medicine: 1,
  sponges: 2,
  currentScene: LIVINGROOM_SCENE,
  isSleeping: false,
  isDead: false
};

const RESTART_DELAY = 400;

const FULLNESS_DRAIN_SPEED = 0.001;
const ENERGY_DRAIN_SPEED = 0.00075;
const HAPPINESS_DRAIN_SPEED = 0.001;
const HEALTH_DRAIN_SPEED = 0;
const DIRTINESS_GAIN_SPEED = 0.0008;

const PLAY_FULLNESS_DRAIN_ADDITION = 0.0005;

const ZERO_FULLNESS_HEALTH_DRAIN_SPEED_ADDITION = 0.00025;
const ZERO_ENERGY_HEALTH_DRAIN_SPEED_ADDITION = 0.0002;
const ZERO_HAPPINESS_HEALTH_DRAIN_SPEED_ADDITION = 0.00015;
const MAX_DIRTINESS_HEALTH_DRAIN_SPEED_ADDITION = 0.0001;

const ZERO_FULLNESS_HAPPINESS_DRAIN_SPEED_ADDITION = 0.00025;
const LOW_HEALTH_HAPPINESS_DRAIN_SPEED_ADDITION = 0.0005;

const ZERO_FULLNESS_ENERGY_DRAIN_SPEED_ADDITION = 0.00015;
const PLAY_ENERGY_DRAIN_ADDITION = 0.00035;

const SLEEP_ENERGY_GAIN_SPEED = 0.002;
const SLEEP_HEALTH_GAIN_SPEED = 0.0008;

const PLAY_HAPPINESS_GAIN_SPEED = 0.002;

const FEED_BUTTON_STRING = "FEED";
const FEED_BUTTON_WIDTH = 200;
const FEED_BUTTON_HEIGHT = 50;
const FEED_BUTTON_POS_X = CENTER_POS_X - FEED_BUTTON_WIDTH / 2 + PAGE_TO_CANVAS_DIST;
const FEED_BUTTON_POS_Y = WINDOW_HEIGHT - FEED_BUTTON_HEIGHT - 15 + PAGE_TO_CANVAS_DIST;
const FEED_BUTTON_TEXT_SIZE = "30px";
const FEED_BUTTON_FULLNESS_ADDITION = 5;

let eatSound;

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
const MEDICINE_BUTTON_HEALTH_ADDITION = 10;

let medicineTakeSound;

const CLEAN_BUTTON_STRING = "CLEAN";
const CLEAN_BUTTON_WIDTH = 150;
const CLEAN_BUTTON_HEIGHT = 50;
const CLEAN_BUTTON_POS_X = 15 + PAGE_TO_CANVAS_DIST;
const CLEAN_BUTTON_POS_Y = CENTER_POS_Y - CLEAN_BUTTON_HEIGHT / 2 + PAGE_TO_CANVAS_DIST;
const CLEAN_BUTTON_TEXT_SIZE = "30px";
const CLEAN_BUTTON_DIRTINESS_DRAIN = 20;

let cleanSound;

const MINI_GAME_BUTTON_STRING = "TOGGLE MINI GAME";
const MINI_GAME_BUTTON_WIDTH = 200;
const MINI_GAME_BUTTON_HEIGHT = 50;
const MINI_GAME_BUTTON_POS_X = CENTER_POS_X - MINI_GAME_BUTTON_WIDTH / 2 + PAGE_TO_CANVAS_DIST;
const MINI_GAME_BUTTON_POS_Y = WINDOW_HEIGHT - MINI_GAME_BUTTON_HEIGHT - 15 + PAGE_TO_CANVAS_DIST;
const MINI_GAME_BUTTON_TEXT_SIZE = "18px";

const FULLNESS_STING = "FULLNESS";
const ENERGY_STRING = "ENERGY";
const HAPPINESS_STRING = "HAPPINESS";
const HEALTH_STRING = "HEALTH";
const DIRTINESS_STRING = "DIRTINESS";

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

const NO_SPONGES_TEXT_STRING = "Not enough sponges";
const NO_SPONGES_TEXT_SIZE = 40;
const NO_SPONGES_TEXT_POS_Y = 50;
const NO_SPONGES_TEXT_STROKE_WEIGHT = 4;
const NO_SPONGES_TEXT_DURATION = 1000;

let insufficientPointsSound;

const SAVE_BUTTON_STRING = "SAVE GAME";
const SAVE_BUTTON_WIDTH = 150;
const SAVE_BUTTON_HEIGHT = 60;
const SAVE_BUTTON_BOUND_DIST = 15 - PAGE_TO_CANVAS_DIST;
const SAVE_BUTTON_POS_X = WINDOW_WIDTH - SAVE_BUTTON_WIDTH - SAVE_BUTTON_BOUND_DIST;
const SAVE_BUTTON_POS_Y = WINDOW_HEIGHT - SAVE_BUTTON_HEIGHT - SAVE_BUTTON_BOUND_DIST;
const SAVE_BUTTON_TEXT_SIZE = "21px";

let saveGameSound;

const PUNCH_BUTTON_STRING = "PUNCH";
const PUNCH_BUTTON_WIDTH = 150;
const PUNCH_BUTTON_HEIGHT = 60;
const PUNCH_BUTTON_BOUND_DIST = 15;
const PUNCH_BUTTON_POS_X = WINDOW_WIDTH - PUNCH_BUTTON_WIDTH - PUNCH_BUTTON_BOUND_DIST + PAGE_TO_CANVAS_DIST;
const PUNCH_BUTTON_POS_Y = SAVE_BUTTON_POS_Y - PUNCH_BUTTON_HEIGHT - PUNCH_BUTTON_BOUND_DIST;
const PUNCH_BUTTON_TEXT_SIZE = "30px";
const PUNCH_BUTTON_HEALTH_DRAIN = 5;
const PUNCH_BUTTON_HAPPINESS_DRAIN = 10;

let punchSound;

const RESTART_BUTTON_STRING = "RESTART GAME";
const RESTART_BUTTON_WIDTH = 200;
const RESTART_BUTTON_HEIGHT = 60;
const RESTART_BUTTON_BOUND_DIST = 15 - PAGE_TO_CANVAS_DIST;
const RESTART_BUTTON_POS_X = WINDOW_WIDTH - RESTART_BUTTON_WIDTH - RESTART_BUTTON_BOUND_DIST;
const RESTART_BUTTON_POS_Y = WINDOW_HEIGHT - RESTART_BUTTON_HEIGHT - RESTART_BUTTON_BOUND_DIST;
const RESTART_BUTTON_TEXT_SIZE = "22px";

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

const SPONGES_TEXT_STRING = "SPONGES";

let fullness;
let energy;
let happiness;
let health;
let dirtiness;
let foodPackets;
let medicine;
let sponges;

let saveButton;
let feedButton;
let sleepButton;
let medicineButton;
let cleanButton;
let miniGameButton;
let punchButton;
let restartButton;

let isSleeping;
let isDead;
let inScene;

let statsSaveDebounce = true;

let showNoFoodText = false;
let showNoMedicineText = false;
let showNoSpongesText = false;

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
let dirtinessBarMinColor;
let dirtinessBarMaxColor;

let lightsOffTintColor;

let saveTextColor;
let noFoodTextColor;
let noMedicineTextColor;
let noSpongesTextColor;

let foodPacketTextColor;
let medicineTextColor;
let spongesTextColor;

const GAME_TITLE_STRING = "Take care of Mr. Face";
const GAME_TITLE_POS_Y = 150;
const GAME_TITLE_SIZE = 80;
const GAME_TITLE_STROKE_WEIGHT = 4;

let gameTitleColor;

let menuBackgroundColor;

const START_BUTTON_STRING = "START GAME!";
const START_BUTTON_WIDTH = 300;
const START_BUTTON_HEIGHT = 150;
const START_BUTTON_POS_X = CENTER_POS_X - START_BUTTON_WIDTH / 2 + PAGE_TO_CANVAS_DIST;
const START_BUTTON_POS_Y = 500;
const START_BUTTON_TEXT_SIZE = "40px";

let onMenu = true;
let inMiniGame = false;

const ITEM_SIZE = 150;
const ITEM_FALL_SPEED = [0.4, 0.8];
const ITEM_SPAWN_INTERVAL = [1000, 2500];
const ITEM_LIST = [];
const ITEM_DETECTION_RADIUS = ITEM_SIZE / 2;
const ITEM_SPAWN_Y = -ITEM_DETECTION_RADIUS;
const ITEM_DESPAWN_Y = WINDOW_HEIGHT + ITEM_DETECTION_RADIUS;

let miniGameBackgroundColor;

let currentItemSpawnDuration;
let lastItemSpawn = 0;
let itemData;

let itemClaimSound;
let foodPacketImage;
let medicineImage;
let spongeImage;

function preload() {
  buttonPressSound = loadSound(getFilePath(ASSET_FOLDER, "button-press.mp3"));
  buttonPressSound.setVolume(0.8);

  insufficientPointsSound = loadSound(getFilePath(ASSET_FOLDER, "insufficient-points.mp3"));
  insufficientPointsSound.setVolume(1.25);

  saveGameSound = loadSound(getFilePath(ASSET_FOLDER, "game-save.mp3"));
  saveGameSound.setVolume(1.5);

  dieSound = loadSound(getFilePath(ASSET_FOLDER, "pet-die.mp3"));

  eatSound = loadSound(getFilePath(ASSET_FOLDER, "pet-eat.mp3"));

  medicineTakeSound = loadSound(getFilePath(ASSET_FOLDER, "pet-medicine-take.ogg"));

  cleanSound = loadSound(getFilePath(ASSET_FOLDER, "pet-clean.mp3"));

  punchSound = loadSound(getFilePath(ASSET_FOLDER, "pet-punch.mp3"));

  livingroomBackground = loadImage(getFilePath(ASSET_FOLDER, "livingroom.jpg"));
  kitchenBackground = loadImage(getFilePath(ASSET_FOLDER, "kitchen.webp"));
  bathroomBackground = loadImage(getFilePath(ASSET_FOLDER, "bathroom.jpg"));
  bedroomBackground = loadImage(getFilePath(ASSET_FOLDER, "bedroom.jpg"));

  itemClaimSound = loadSound(getFilePath(ASSET_FOLDER, "item-claim.mp3"));
  itemClaimSound.setVolume(1.5);

  foodPacketImage = loadImage(getFilePath(ESSENTIALS_IMAGE_FOLDER, "food-pack.webp"));
  medicineImage = loadImage(getFilePath(ESSENTIALS_IMAGE_FOLDER, "medicine.png"));
  spongeImage = loadImage(getFilePath(ESSENTIALS_IMAGE_FOLDER, "sponge.webp"));

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
  dirtiness = gameStats.dirtiness;
  foodPackets = gameStats.foodPackets;
  medicine = gameStats.medicine;
  sponges = gameStats.sponges;
  currentScene = gameStats.currentScene;
  isSleeping = gameStats.isSleeping;
  isDead = gameStats.isDead;
  inScene = gameStats.inScene;

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
  dirtinessBarMinColor = color(0, 0, 255);
  dirtinessBarMaxColor = color(130, 100, 60);

  // The color that appears in the dark

  lightsOffTintColor = color(100, 100, 100);

  // The color of the save indicator that pops up when saving the game

  saveTextColor = color(0, 200, 255);

  // The color of the no food text

  noFoodTextColor = color(255, 255, 0);
  noMedicineTextColor = color(255, 0, 255);
  noSpongesTextColor = color(75, 150, 75);

  // The color of the food packet indicator

  foodPacketTextColor = color(255, 155, 0);
  medicineTextColor = color(0, 155, 255);
  spongesTextColor = color(150, 75, 150);

  // The color of the game title

  gameTitleColor = color(0, 200, 255);

  // The color of the menu's background

  menuBackgroundColor = color(75, 175, 75);

  // Mini game background color

  miniGameBackgroundColor = color(0, 225, 255);

  // Setting up an interval that spawns falling items every interval

  currentItemSpawnDuration = getNewItemSpawnInterval();

  // The functions tied to adding points to the system

  itemData = [
    {
      weight: 60,
      image: foodPacketImage,
      add: () => foodPackets++
    },
    {
      weight: 35,
      image: spongeImage,
      add: () => sponges++
    },
    {
      weight: 5,
      image: medicineImage,
      add: () => medicine++
    }
  ];

  // Creating the room selector, which makes you able to change scenes

  roomSelector = createSelect();

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

  // Making it add fullness when feeding, if enough food packets

  feedButton.mouseClicked(() => {
    if (foodPackets > 0) {
      foodPackets--;
      addFullness(FEED_BUTTON_FULLNESS_ADDITION);
      petAnimator.play("eatAnim");
      eatSound.play();
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

    if (isSleeping) {
      inScene = BEDROOM_SCENE;
      punchButton.hide();
    } else {
      inScene = null;
      punchButton.show();
    }

    buttonPressSound.play();
  });

  sleepButton.hide();

  styleElement(sleepButton, SLEEP_BUTTON_TEXT_SIZE);

  // Creating medicine button

  medicineButton = createButton(MEDICINE_BUTTON_STRING);

  // Placement

  medicineButton.position(MEDICINE_BUTTON_POS_X, MEDICINE_BUTTON_POS_Y);
  medicineButton.size(MEDICINE_BUTTON_WIDTH, MEDICINE_BUTTON_HEIGHT);

  // Adding health when clicked, if enough medicine

  medicineButton.mouseClicked(() => {
    if (medicine > 0) {
      medicine--;
      addHealth(MEDICINE_BUTTON_HEALTH_ADDITION);
      petAnimator.play("eatAnim");
      medicineTakeSound.play();
    } else if (!showNoMedicineText) {
      showNoMedicineText = true;
      setTimeout(() => (showNoMedicineText = false), NO_MEDICINE_TEXT_DURATION);
      insufficientPointsSound.play();
    }
  });

  medicineButton.hide();

  styleElement(medicineButton, MEDICINE_BUTTON_TEXT_SIZE);

  // Clean button

  cleanButton = createButton(CLEAN_BUTTON_STRING);

  // Placement

  cleanButton.position(CLEAN_BUTTON_POS_X, CLEAN_BUTTON_POS_Y);
  cleanButton.size(CLEAN_BUTTON_WIDTH, CLEAN_BUTTON_HEIGHT);

  cleanButton.mouseClicked(() => {
    if (sponges > 0) {
      sponges--;
      addDirtiness(-CLEAN_BUTTON_DIRTINESS_DRAIN);
      cleanSound.play();
    } else if (!showNoSpongesText) {
      showNoSpongesText = true;
      setTimeout(() => (showNoSpongesText = false), NO_SPONGES_TEXT_DURATION);
      insufficientPointsSound.play();
    }
  });

  cleanButton.hide();

  styleElement(cleanButton, CLEAN_BUTTON_TEXT_SIZE);

  // Play button

  miniGameButton = createButton(MINI_GAME_BUTTON_STRING);

  // Placement

  miniGameButton.position(MINI_GAME_BUTTON_POS_X, MINI_GAME_BUTTON_POS_Y);
  miniGameButton.size(MINI_GAME_BUTTON_WIDTH, MINI_GAME_BUTTON_HEIGHT);

  // Making it switch to the mini game when clicking

  miniGameButton.mouseClicked(() => {
    toggleMiniGame();
    buttonPressSound.play();
  });

  miniGameButton.hide();

  styleElement(miniGameButton, MINI_GAME_BUTTON_TEXT_SIZE);

  // Making the restart button

  restartButton = createButton(RESTART_BUTTON_STRING);

  // Placement

  restartButton.position(RESTART_BUTTON_POS_X, RESTART_BUTTON_POS_Y);
  restartButton.size(RESTART_BUTTON_WIDTH, RESTART_BUTTON_HEIGHT);

  // Restarting the game

  restartButton.mouseClicked(() => {
    setTimeout(() => {
      removeItem(STATS_STORE_KEY);
      window.location.reload();
    }, RESTART_DELAY);
    buttonPressSound.play();
  });

  restartButton.hide();

  styleElement(restartButton, RESTART_BUTTON_TEXT_SIZE);

  // Creating a new button for manual stat saving

  saveButton = createButton(SAVE_BUTTON_STRING);

  // Also positioning this correctly

  saveButton.position(SAVE_BUTTON_POS_X, SAVE_BUTTON_POS_Y);
  saveButton.size(SAVE_BUTTON_WIDTH, SAVE_BUTTON_HEIGHT);

  // Saving the stats when you click on the button

  saveButton.mouseClicked(() => {
    if (!saveStats()) buttonPressSound.play();
  });

  saveButton.hide();

  styleElement(saveButton, SAVE_BUTTON_TEXT_SIZE);

  // Creating the punch button

  punchButton = createButton(PUNCH_BUTTON_STRING);

  // Placement

  punchButton.position(PUNCH_BUTTON_POS_X, PUNCH_BUTTON_POS_Y);
  punchButton.size(PUNCH_BUTTON_WIDTH, PUNCH_BUTTON_HEIGHT);

  // Making the pet punched when clicking

  punchButton.mouseClicked(() => {
    addHealth(-PUNCH_BUTTON_HEALTH_DRAIN);
    addHappiness(-PUNCH_BUTTON_HAPPINESS_DRAIN);
    petAnimator.play("punchAnim");
    punchSound.play();
  });

  punchButton.hide();

  styleElement(punchButton, PUNCH_BUTTON_TEXT_SIZE);

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

    if (isDead) restartButton.show();
    else {
      saveButton.show();
      punchButton.show();
    }

    buttonPressSound.play();
  });

  styleElement(startButton, START_BUTTON_TEXT_SIZE);

  // Resizing the backgrounds to make them fit within the canvas

  livingroomBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);
  kitchenBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);
  bathroomBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);
  bedroomBackground.resize(WINDOW_WIDTH, WINDOW_HEIGHT);

  // Resizing the items

  foodPacketImage.resize(0, ITEM_SIZE);
  medicineImage.resize(0, ITEM_SIZE);
  spongeImage.resize(0, ITEM_SIZE);

  // Making the game save every interval

  setInterval(() => {
    if (!onMenu) saveStats();
  }, STATS_SAVE_INTERVAL);
}

function draw() {
  // Rendering the game or the menu screen based on game state

  if (onMenu) {
    background(menuBackgroundColor);

    push();
    translate(CENTER_POS_X, GAME_TITLE_POS_Y);

    stroke(0);
    strokeWeight(GAME_TITLE_STROKE_WEIGHT);
    fill(gameTitleColor);
    textSize(GAME_TITLE_SIZE);
    text(GAME_TITLE_STRING, 0, 0);

    pop();
  } else {
    // Rendering the core background

    background(miniGameBackgroundColor);

    if (inMiniGame) {
      for (const fallingItem of ITEM_LIST) {
        fallingItem.display();
      }

      if (millis() - lastItemSpawn >= currentItemSpawnDuration) {
        lastItemSpawn = millis();
        currentItemSpawnDuration = getNewItemSpawnInterval();
        let addNewItem = true;

        // If there are any inactive falling items, it will reassign it's position in the array with a new one

        for (let i = 0; i < ITEM_LIST.length; i++) {
          if (!ITEM_LIST[i].active) {
            addNewItem = false;
            ITEM_LIST[i] = getNewFallingItem();
            break;
          }
        }

        // If there weren't any inactive ones, it will add a new item to the array

        if (addNewItem) ITEM_LIST.push(getNewFallingItem());
      }
    } else {
      push();

      // Adding a tint if the pet is sleeping

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
      }

      // Rendering the pet if it should be visible in that scene

      if (!inScene || currentScene === inScene) {
        petAnimator.render(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
      }

      pop();
    }

    // Rendering the stat bars

    drawStatBar(FULLNESS_STING, fullness, fullnessBarMinColor, fullnessBarMaxColor);
    drawStatBar(ENERGY_STRING, energy, energyBarMinColor, energyBarMaxColor, 1);
    drawStatBar(HAPPINESS_STRING, happiness, happinessBarMinColor, happinessBarMaxColor, 2);
    drawStatBar(HEALTH_STRING, health, healthBarMinColor, healthBarMaxColor, 3);
    drawStatBar(DIRTINESS_STRING, dirtiness, dirtinessBarMinColor, dirtinessBarMaxColor, 4);

    // Displaying the point indicators

    drawPointIndicator(FOOD_PACKET_TEXT_STRING, foodPackets, foodPacketTextColor);
    drawPointIndicator(MEDICINE_TEXT_STRING, medicine, medicineTextColor, 1);
    drawPointIndicator(SPONGES_TEXT_STRING, sponges, spongesTextColor, 2);

    // Displaying an indicator that tells you that the game has been saved

    if (!statsSaveDebounce)
      drawInfoText(SAVE_TEXT_STRING, SAVE_TEXT_POS_Y, saveTextColor, SAVE_TEXT_SIZE, SAVE_TEXT_STROKE_WEIGHT);

    // Same as the game save indictor, but if there isn't any food

    if (showNoFoodText)
      drawInfoText(
        NO_FOOD_TEXT_STRING,
        NO_FOOD_TEXT_POS_Y,
        noFoodTextColor,
        NO_FOOD_TEXT_SIZE,
        NO_FOOD_TEXT_STROKE_WEIGHT
      );

    // Also the same thing as the other one

    if (showNoMedicineText)
      drawInfoText(
        NO_MEDICINE_TEXT_STRING,
        NO_MEDICINE_TEXT_POS_Y,
        noMedicineTextColor,
        NO_MEDICINE_TEXT_SIZE,
        NO_MEDICINE_TEXT_STROKE_WEIGHT
      );

    if (showNoSpongesText)
      drawInfoText(
        NO_SPONGES_TEXT_STRING,
        NO_SPONGES_TEXT_POS_Y,
        noSpongesTextColor,
        NO_SPONGES_TEXT_SIZE,
        NO_SPONGES_TEXT_STROKE_WEIGHT
      );

    // The starting drain speeds that will change based on some key factors

    let fullnessDrainSpeed = FULLNESS_DRAIN_SPEED;
    let energyDrainSpeed = (isSleeping && -SLEEP_ENERGY_GAIN_SPEED) || ENERGY_DRAIN_SPEED;
    let happinessDrainSpeed = (inMiniGame && -PLAY_HAPPINESS_GAIN_SPEED) || HAPPINESS_DRAIN_SPEED;
    let healthDrainSpeed =
      ((isSleeping && -SLEEP_HEALTH_GAIN_SPEED) || HEALTH_DRAIN_SPEED) +
      (MAX_DIRTINESS_HEALTH_DRAIN_SPEED_ADDITION * dirtiness) / STATS_MAX_VALUE;

    // Modifying the stat drain speeds based on other stats

    if (health <= STATS_LOW_PERCENTAGE) happinessDrainSpeed += LOW_HEALTH_HAPPINESS_DRAIN_SPEED_ADDITION;
    if (energy === 0) healthDrainSpeed += ZERO_ENERGY_HEALTH_DRAIN_SPEED_ADDITION;
    if (happiness === 0) healthDrainSpeed += ZERO_HAPPINESS_HEALTH_DRAIN_SPEED_ADDITION;

    if (inMiniGame) {
      energyDrainSpeed += PLAY_ENERGY_DRAIN_ADDITION;
      fullnessDrainSpeed += PLAY_FULLNESS_DRAIN_ADDITION;
    }

    if (fullness === 0) {
      energyDrainSpeed += ZERO_FULLNESS_ENERGY_DRAIN_SPEED_ADDITION;
      happinessDrainSpeed += ZERO_FULLNESS_HAPPINESS_DRAIN_SPEED_ADDITION;
      healthDrainSpeed += ZERO_FULLNESS_HEALTH_DRAIN_SPEED_ADDITION;
    }

    // Draining the stats over time and based on some other factors

    if (!isDead) {
      addFullness(-fullnessDrainSpeed * deltaTime);
      addEnergy(-energyDrainSpeed * deltaTime);
      addHealth(-healthDrainSpeed * deltaTime);
      addDirtiness(DIRTINESS_GAIN_SPEED * deltaTime);
      if (!isSleeping) addHappiness(-happinessDrainSpeed * deltaTime);
    }

    // Making the character die if the health is zero

    if (!isDead && health === 0) {
      isDead = true;
      inScene = currentScene;

      saveButton.hide();
      punchButton.hide();
      restartButton.show();

      setupRoom();
      if (inMiniGame) toggleMiniGame();
      saveStats();

      petAnimator.play("dieAnim");
      dieSound.play();
    }

    // Toggling the idle animations based on stats

    if (isDead) {
      petAnimator.play("deathIdle");
    } else if (isSleeping || energy <= STATS_LOW_PERCENTAGE) {
      petAnimator.play("sleepyIdle");
    } else if (happiness <= STATS_LOW_PERCENTAGE || health <= STATS_LOW_PERCENTAGE) {
      petAnimator.play("sadIdle");
    } else if (fullness <= STATS_LOW_PERCENTAGE) {
      petAnimator.play("hungryIdle");
    } else {
      petAnimator.play("mainIdle");
    }
  }
}

function mouseClicked() {
  if (inMiniGame) {
    for (const fallingItem of ITEM_LIST) {
      fallingItem.checkClick();
    }
  }
}

function getNewItemSpawnInterval() {
  return random(ITEM_SPAWN_INTERVAL[0], ITEM_SPAWN_INTERVAL[1]);
}

function getNewFallingItem() {
  let totalWeight = 0;

  for (const itemInfo of itemData) {
    totalWeight += itemInfo.weight;
  }

  let randomWeight = random(0, totalWeight);
  let currentWeight = 0;

  for (const itemInfo of itemData) {
    currentWeight += itemInfo.weight;

    if (randomWeight <= currentWeight) {
      return new FallingItem(itemInfo.image, itemInfo.add);
    }
  }
}

function toggleMiniGame() {
  inMiniGame = !inMiniGame;

  if (inMiniGame) {
    // Hiding the roomSelector so you can't switch rooms during mini game

    roomSelector.hide();
    punchButton.hide();
  } else {
    // Showing the selector again

    roomSelector.show();

    // Clearing the item list after the game ends

    ITEM_LIST.length = 0;

    // Playing happy anim when done playing

    if (!isDead) {
      punchButton.show();
      petAnimator.play("happyAnim");
    }
  }
}

function setupRoom() {
  feedButton.hide();
  sleepButton.hide();
  medicineButton.hide();
  cleanButton.hide();
  miniGameButton.hide();

  let showButtons = !isSleeping && !isDead;

  switch (currentScene) {
    case LIVINGROOM_SCENE:
      if (showButtons) miniGameButton.show();
      break;
    case KITCHEN_SCENE:
      if (showButtons) feedButton.show();
      break;
    case BATHROOM_SCENE:
      if (showButtons) {
        medicineButton.show();
        cleanButton.show();
      }
      break;
    case BEDROOM_SCENE:
      if (!isDead) sleepButton.show();
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

function drawInfoText(str, y, c, size, strokeWgt) {
  push();

  stroke(0);
  strokeWeight(strokeWgt);
  fill(c);
  textSize(size);
  text(str, CENTER_POS_X, y);

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

function addDirtiness(amount) {
  dirtiness = clampStat(dirtiness + amount);
}

function saveStats() {
  if (statsSaveDebounce) {
    statsSaveDebounce = false;

    storeItem(STATS_STORE_KEY, {
      fullness,
      energy,
      happiness,
      health,
      dirtiness,
      foodPackets,
      medicine,
      sponges,
      currentScene,
      isSleeping,
      isDead,
      inScene
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

class FallingItem {
  constructor(img, addPoints) {
    this.img = img;
    this.fallSpeed = random(ITEM_FALL_SPEED[0], ITEM_FALL_SPEED[1]);
    this.addPoints = addPoints;

    this.x = random(0, WINDOW_WIDTH);
    this.y = ITEM_SPAWN_Y;

    this.active = true;
  }

  checkClick() {
    if (this.active && dist(this.x, this.y, mouseX, mouseY) <= ITEM_DETECTION_RADIUS) {
      this.active = false;
      this.addPoints();
      itemClaimSound.play();
    }
  }

  display() {
    if (this.active) {
      let y = this.y + this.fallSpeed * deltaTime;

      push();

      imageMode(CENTER);
      image(this.img, this.x, y);

      pop();

      if (y >= ITEM_DESPAWN_Y) {
        this.active = false;
      } else {
        this.y = y;
      }
    }
  }
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
