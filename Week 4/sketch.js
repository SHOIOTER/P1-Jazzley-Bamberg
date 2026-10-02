const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

const ASPECT_RATIO = WINDOW_WIDTH / WINDOW_HEIGHT;
const NEAR = 0.1;
const FAR = 100000
let fieldOfView;

// Controls how the wave grid behaves (including slider behaviour)

let minWaveAmplitude = 100;
let maxWaveAmplitude = 1000;
let stepWaveAmplitude = 50;
let waveAmplitude = minWaveAmplitude;

let minWaveFrequency = 0.1;
let maxWaveFrequency = 1;
let stepWaveFrequency = 0.05;
let waveFrequency = minWaveFrequency;

let minWaveSpeed = 0.001;
let maxWaveSpeed = 0.01;
let stepWaveSpeed = 0.001;
let waveSpeed = minWaveSpeed;

let sliderOriginX = 50;
let sliderOriginY = WINDOW_HEIGHT;
let sliderOffset = 75;
let sliderTextOffset = 100;
let sliderTextSize = 100;
let sliderTextFont;

let amplitudeSlider;
let amplitudeSliderY = sliderOriginY - sliderOffset;
let amplitudeSliderTextY = amplitudeSliderY - sliderTextOffset - 1250;

let frequencySlider;
let frequencySliderY = sliderOriginY - sliderOffset * 2;
let frequencySliderTextY = frequencySliderY - sliderTextOffset * 2 - 1250;

let speedSlider;
let speedSliderY = sliderOriginY - sliderOffset * 3;
let speedSliderTextY = speedSliderY - sliderTextOffset * 3 - 1250;

// Controls how the wave grid is built

const WAVE_PART_SIZE = 100;
const WAVE_GRID_ORIGIN_Y = 0;
const WAVE_GRID_WIDTH = 25;
const WAVE_GRID_HEIGHT = 25;

// These are for the triangle drawing, that loop has to stop earlier

const WAVE_GRID_WIDTH_STOP = WAVE_GRID_WIDTH - 1;
const WAVE_GRID_HEIGHT_STOP = WAVE_GRID_HEIGHT - 1;

const WAVE_GRID_WIDTH_OFFSET = WAVE_GRID_WIDTH * WAVE_PART_SIZE / 2;
const WAVE_GRID_HEIGHT_OFFSET = WAVE_GRID_HEIGHT * WAVE_PART_SIZE / 2;

// These variable are used to check if you double click

let waveColorLastChanged = 0;
let waveColorChangeThreshold = 200;

// This controls what color the waves have

let wavePartLowColor;
let wavePartHighColor;

let shapeMinSize = 175;
let shapeMaxSize = 225;

let shapeMinDuration = 600;
let shapeMaxDuration = 1200;

/*
  lastShapeGeneration holds when it was the last time a shape has been generated
  shapeGenerationInterval is the interval the shapes keep generating if the user holds their Backspace key
  shapesPerGeneration just controls how many shapes are generated per interval
*/

let lastShapeGeneration = 0;
let shapeGenerationInterval = 100;
let shapesPerGeneration = 3;

// The wave grid holds a 2 dimensional array, contains arrays that are filled with information

let waveGrid = [];

/*
  These hold the active (and sometimes inactive) shapes, so I can display then in the draw
  Shapes get added when holding Backspace, as stated before
*/

let shapeList = [];

// These are the functions that actually create the desired shape, all of them receive a size parameter that controls the size

let shapeCreators = [
  function (size) {
    box(size);
  },
  function (size) {
    sphere(size / 2);
  },
  function (size) {
    rotateX(PI);
    cone(size / 2, size);
  },
  function (size) {
    cylinder(size / 2, size);
  },
  function (size) {
    box(size);
  }
];
let shapeAmount = shapeCreators.length;
let shapeGenerationSound;

// Some variables that control the behavior of the solar system

const STAR_AXIS_SPEED = 0.0005;
const STAR_ORIGIN_X = 0;
const STAR_ORIGIN_Y = 0;
const STAR_ORIGIN_Z = 0;
const STAR_BODY_SIZE = 150;

const PLANET_ORBIT_RADIUS = 400;
const PLANET_ORBIT_SPEED = 0.0005;
const PLANET_BODY_RADIUS = 50;
const PLANET_HOVER_AMPLITUDE = 50;
const PLANET_HOVER_SPEED = 0.001;
const PLANET_AXIS_SPEED = 0.001;
const PLANET_AXIS_ANGLE = 0.35;

const MOON_ORBIT_RADIUS = 100;
const MOON_ORBIT_SPEED = 0.003;
const MOON_BODY_RADIUS = 25;
const MOON_HOVER_AMPLITUDE = 50;
const MOON_HOVER_SPEED = 0.001;

const MOON_MAN_SCALE = 20;
const MOON_MAN_ORIGIN_Y = -MOON_BODY_RADIUS;
const MOON_MAN_JUMP_DURATION = 600;
const MOON_MAN_JUMP_HEIGHT = 100;
const MOON_MAN_ROTATION_SPEED = 0.025;

// The textures of the sun, earth and moon

let starTexture;
let planetTexture;
let moonTexture;

// Controls some behaviour of the moon man

let moonManJumpElapsed = MOON_MAN_JUMP_DURATION;
let moonManCurrentRotation = 0;
let moonManTexture;
let moonManModel;
let moonManJumpSound;

const PLANET_MIN_SIZE = 25;
const PLANET_MAX_SIZE = 100;
const PLANET_MIN_ORBIT_SPEED = 0.0001;
const PLANET_MAX_ORBIT_SPEED = 0.001;
const PLANET_MIN_ROTATION_SPEED = 0.001;
const PLANET_MAX_ROTATION_SPEED = 0.003;
const PLANET_MIN_SPACING = 150;
const PLANET_MAX_SPACING = 300;
const PLANET_MIN_AMOUNT = 4;
const PLANET_MAX_AMOUNT = 12;
const PLANET_MIN_HOVER_SPEED = 0.001;
const PLANET_MAX_HOVER_SPEED = 0.003;
const PLANET_MIN_HOVER_AMPLITUDE = 30;
const PLANET_MAX_HOVER_AMPLITUDE = 60;
const PLANET_STARTING_ORBIT_RADIUS = 600;
let generatedPlanetList = [];

let currentScene = 0;
let possibleScenes = [
  function () {
    let now = millis();
    let waveAlpha = now * waveSpeed;

    for (let columnValues of waveGrid) {
      for (let waveInfo of columnValues) {
        let sineValue = sin(waveAlpha + waveInfo.posX * waveFrequency) * sin(waveAlpha + waveInfo.posZ * waveFrequency);
        waveInfo.currentColor = lerpColor(wavePartLowColor, wavePartHighColor, (sineValue + 1) / 2);
        waveInfo.currentY = WAVE_GRID_ORIGIN_Y - sineValue * waveAmplitude;
      }
    }

    noStroke();
    beginShape(TRIANGLES);
    for (let x = 0; x < WAVE_GRID_WIDTH_STOP; x++) {
      let currentColumnValues = waveGrid[x];
      let nextColumnValues = waveGrid[x + 1];

      for (let z = 0; z < WAVE_GRID_HEIGHT_STOP; z++) {
        let leftUpperCornerWaveInfo = currentColumnValues[z];
        let rightUpperCornerWaveInfo = nextColumnValues[z];
        let rightLowerCornerWaveInfo = nextColumnValues[z + 1];
        let leftLowerCornerWaveInfo = currentColumnValues[z + 1];

        let leftUpperCornerX = leftUpperCornerWaveInfo.originX;
        let leftUpperCornerY = leftUpperCornerWaveInfo.currentY;
        let leftUpperCornerZ = leftUpperCornerWaveInfo.originZ;

        let rightLowerCornerX = rightLowerCornerWaveInfo.originX;
        let rightLowerCornerY = rightLowerCornerWaveInfo.currentY;
        let rightLowerCornerZ = rightLowerCornerWaveInfo.originZ;

        fill(leftUpperCornerWaveInfo.currentColor);
        vertex(leftUpperCornerX, leftUpperCornerY, leftUpperCornerZ);
        vertex(rightLowerCornerX, rightLowerCornerY, rightLowerCornerZ);
        vertex(
          leftLowerCornerWaveInfo.originX,
          leftLowerCornerWaveInfo.currentY,
          leftLowerCornerWaveInfo.originZ
        );
        vertex(leftUpperCornerX, leftUpperCornerY, leftUpperCornerZ);
        vertex(
          rightUpperCornerWaveInfo.originX,
          rightUpperCornerWaveInfo.currentY,
          rightUpperCornerWaveInfo.originZ
        );
        vertex(rightLowerCornerX, rightLowerCornerY, rightLowerCornerZ);
      }
    }
    endShape();

    if (keyIsDown(BACKSPACE) && now - lastShapeGeneration >= shapeGenerationInterval) {
      lastShapeGeneration = now;
      generateShapes(shapesPerGeneration);
    }

    for (let shape of shapeList) {
      shape.display();
    }

    push();

    fill(220);
    textFont(sliderTextFont);
    textSize(sliderTextSize);
    text("Amplitude: " + waveAmplitude, sliderOriginX, amplitudeSliderTextY);
    text("Frequency: " + waveFrequency, sliderOriginX, frequencySliderTextY);
    text("Speed: " + waveSpeed, sliderOriginX, speedSliderTextY);

    pop();
  },
  function () {
    let now = millis();

    noStroke();
    push();

    translate(STAR_ORIGIN_X, STAR_ORIGIN_Y, STAR_ORIGIN_Z);
    rotateY(now * STAR_AXIS_SPEED);

    texture(starTexture);
    sphere(STAR_BODY_SIZE);

    pop();

    let planetOrbitAngle = now * PLANET_ORBIT_SPEED;
    let moonOrbitAngle = now * MOON_ORBIT_SPEED;

    let sinPlanetOrbit = sin(planetOrbitAngle);
    let planetPosX = STAR_ORIGIN_X + cos(planetOrbitAngle) * PLANET_ORBIT_RADIUS;
    let planetPosY = STAR_ORIGIN_Y + sin(now * PLANET_HOVER_SPEED) * PLANET_HOVER_AMPLITUDE;
    let planetPosZ = STAR_ORIGIN_Z + sinPlanetOrbit * PLANET_ORBIT_RADIUS;

    push();

    translate(planetPosX, planetPosY, planetPosZ);
    rotateX(sinPlanetOrbit * PLANET_AXIS_ANGLE);
    rotateY(now * PLANET_AXIS_SPEED);

    texture(planetTexture);
    sphere(PLANET_BODY_RADIUS);

    pop();

    if (moonManJumpElapsed < MOON_MAN_JUMP_DURATION) {
      moonManJumpElapsed = min(moonManJumpElapsed + deltaTime, MOON_MAN_JUMP_DURATION);
      moonManCurrentRotation += MOON_MAN_ROTATION_SPEED * deltaTime;
    }

    let moonManAlpha = moonManJumpElapsed / MOON_MAN_JUMP_DURATION;

    push();

    translate(
      planetPosX + cos(-moonOrbitAngle) * MOON_ORBIT_RADIUS,
      planetPosY + cos(now * MOON_HOVER_SPEED) * MOON_HOVER_AMPLITUDE,
      planetPosZ + sin(-moonOrbitAngle) * MOON_ORBIT_RADIUS
    );

    texture(moonTexture);
    sphere(MOON_BODY_RADIUS);

    translate(
      0,
      MOON_MAN_ORIGIN_Y - lerp(
        0,
        MOON_MAN_JUMP_HEIGHT,
        getQuadAlpha(moonManAlpha)
      ),
      0
    );
    rotateX(PI);
    rotateY(moonManCurrentRotation);

    scale(MOON_MAN_SCALE);
    texture(moonManTexture);
    model(moonManModel);

    pop();

    for (let planet of generatedPlanetList) {
      planet.display();
    }
  }
];

// Input based interactions that can happen during each scene

let sceneInteractionList = [
  {
    mouseClicked: function () {
      /*
         Randomizes the color of the wave when clicking quickly again after last click
         Usually when double clicking
      */

      let now = millis();
      if (now - waveColorLastChanged <= waveColorChangeThreshold) {
        randomizeWaveColor();
      }
      waveColorLastChanged = now;
    }
  },
  {
    keyPressed: function () {
      // Resets the moonManJumpElapsed, which allows him to jumo again

      if (key === " " && moonManJumpElapsed >= MOON_MAN_JUMP_DURATION) {
        moonManJumpElapsed = 0;
        moonManJumpSound.play();
      } else if (key === "Backspace") {
        // The planets will be regenerated here

        generatePlanets();
      }
    }
  }
];

// Stuff that happens when switching to that specific scene

let sceneToggles = [
  function () {
    amplitudeSlider.show();
    frequencySlider.show();
    speedSlider.show();
  },
  function () {
    amplitudeSlider.hide();
    frequencySlider.hide();
    speedSlider.hide();
  }
];
let sceneAmount = possibleScenes.length;

// This is a class that represents the shape itself

class Shape {
  constructor() {
    assignShapeProperties(this);
  }

  display() {
    if (this.active) {
      let alphaValue = min((millis() - this.startTime) / this.duration, 1);
      let quadAlphaValue = getQuadAlpha(alphaValue);
      let shapeColor = this.shapeColor;
      let currentSize = lerp(0, this.targetSize, quadAlphaValue);

      push();
      translate(this.originX, this.waveInfo.currentY - currentSize / 2, this.originZ);

      shapeColor.setAlpha(lerp(0, 255, quadAlphaValue));
      fill(shapeColor);
      this.shapeCreator(currentSize);

      pop();

      if (alphaValue === 1) {
        this.active = false;
        let noActiveShapes = true;

        for (let shape of shapeList) {
          if (shape.active) {
            noActiveShapes = false;
            break;
          }
        }

        // If no active shapes anymore, it will clear the array

        if (noActiveShapes) {
          shapeList.length = 0;
        }
      }
    }
  }

  reactivate() {
    if (!this.active) {
      assignShapeProperties(this);
      this.active = true;
      return true;
    }
    return false;
  }
}

class Planet {
  constructor(orbitRadius) {
    this.orbitSpeed = random(PLANET_MIN_ORBIT_SPEED, PLANET_MAX_ORBIT_SPEED);
    this.orbitRadius = orbitRadius;
    this.rotationSpeed = random(PLANET_MIN_ROTATION_SPEED, PLANET_MAX_ROTATION_SPEED);
    this.planetColor = getRandomColor();
    this.planetSize = random(PLANET_MIN_SIZE, PLANET_MAX_SIZE);
    this.hoverSpeed = random(PLANET_MIN_HOVER_SPEED, PLANET_MAX_HOVER_SPEED);
    this.hoverAmplitude = random(PLANET_MIN_HOVER_AMPLITUDE, PLANET_MAX_HOVER_AMPLITUDE);
  }

  display() {
    let now = millis();
    let currentOrbitAngle = now * this.orbitSpeed;
    let orbitRadius = this.orbitRadius;

    push();

    translate(
      STAR_ORIGIN_X + cos(currentOrbitAngle) * orbitRadius,
      STAR_ORIGIN_Y + sin(now * this.hoverSpeed) * this.hoverAmplitude,
      STAR_ORIGIN_Z + sin(currentOrbitAngle) * orbitRadius
    );
    rotateY(now * this.rotationSpeed);

    fill(this.planetColor);
    sphere(this.planetSize);

    pop();
  }
}

function generatePlanets() {
  let planetAmount = round(random(PLANET_MIN_AMOUNT, PLANET_MAX_AMOUNT))
  let currentOrbitRadius = PLANET_STARTING_ORBIT_RADIUS;

  generatedPlanetList.length = 0;

  for (let i = 0; i < planetAmount; i++) {
    generatedPlanetList.push(new Planet(currentOrbitRadius));
    currentOrbitRadius += random(PLANET_MIN_SPACING, PLANET_MAX_SPACING);
  }
}

function assignShapeProperties(shape) {
  // Selecting the right waveInfo based on generated position

  let waveInfo = waveGrid[floor(random(
    0,
    WAVE_GRID_WIDTH
  ))][floor(random(
    0,
    WAVE_GRID_HEIGHT
  ))];

  // Assigns the properties to the shape, some are random

  shape.active = true;
  shape.targetSize = random(shapeMinSize, shapeMaxSize);
  shape.duration = random(shapeMinDuration, shapeMaxDuration);
  shape.shapeCreator = getRandomShapeCreator();
  shape.shapeColor = getRandomColor();
  shape.startTime = millis();
  shape.originX = waveInfo.originX;
  shape.originZ = waveInfo.originZ;
  shape.waveInfo = waveInfo;
}

// Generates a quadratic alpha number, to make the moon man jump

function getQuadAlpha(t) {
  return -((t * 2 - 1) ** 2) + 1;
}

// Picks a random shape creator function from the array

function getRandomShapeCreator() {
  return shapeCreators[floor(random(0, shapeAmount))];
}

// Returns a random color

function getRandomColor() {
  return color(
    random(0, 255),
    random(0, 255),
    random(0, 255)
  );
}

// Randomizes the color of the waves

function randomizeWaveColor() {
  wavePartLowColor = getRandomColor();
  wavePartHighColor = getRandomColor();
}

function generateShapes(amount) {
  /*
    The system reuses already existing shapes if there are any inactive left
    If there aren't any inactive shapes it can reuse, it will add a new one to the array
  */

  shapeGenerationSound.play();

  for (let i = 0; i < amount; i++) {
    let noInactiveShapes = true;

    for (let shape of shapeList) {
      if (shape.reactivate()) {
        noInactiveShapes = false;
        break;
      }
    }

    if (noInactiveShapes) {
      shapeList.push(new Shape());
    }
  }
}

// Loads the file assets, so I can use them

function preload() {
  shapeGenerationSound = loadSound("./Assets/Shape_Generation.mp3");

  starTexture = loadImage("./Assets/Star_Texture.jpg");
  planetTexture = loadImage("./Assets/Planet_Texture.jpg");
  moonTexture = loadImage("./Assets/Moon_Texture.png");

  moonManTexture = loadImage("./Assets/Junkbot_Texture.png");
  moonManModel = loadModel("./Assets/Junkbot_Model.obj");
  moonManJumpSound = loadSound("./Assets/Moon_Man_Jump.mp3");
}

// Initializing some variables and arrays

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT, WEBGL);

  fieldOfView = 2 * atan((WINDOW_HEIGHT / 2) / 800);

  sliderTextFont = loadFont("./Assets/LilitaOne-Regular.ttf")

  amplitudeSlider = createSlider(
    minWaveAmplitude,
    maxWaveAmplitude,
    waveAmplitude,
    stepWaveAmplitude
  );
  amplitudeSlider.position(sliderOriginX, amplitudeSliderY);
  amplitudeSlider.input(function () {
    waveAmplitude = amplitudeSlider.value();
  });

  frequencySlider = createSlider(
    minWaveFrequency,
    maxWaveFrequency,
    waveFrequency,
    stepWaveFrequency
  );
  frequencySlider.position(sliderOriginX, frequencySliderY);
  frequencySlider.input(function () {
    waveFrequency = frequencySlider.value();
  });

  speedSlider = createSlider(
    minWaveSpeed,
    maxWaveSpeed,
    waveSpeed,
    stepWaveSpeed
  );
  speedSlider.position(sliderOriginX, speedSliderY);
  speedSlider.input(function () {
    waveSpeed = speedSlider.value();
  });

  randomizeWaveColor();

  for (let x = 0; x < WAVE_GRID_WIDTH; x++) {
    let columnValues = [];
    for (let z = 0; z < WAVE_GRID_HEIGHT; z++) {
      columnValues[z] = {
        originX: x * WAVE_PART_SIZE - WAVE_GRID_WIDTH_OFFSET,
        originZ: z * WAVE_PART_SIZE - WAVE_GRID_HEIGHT_OFFSET,
        posX: x,
        posZ: z
      };
    }
    waveGrid[x] = columnValues;
  }

  generatePlanets();
}

function draw() {
  background(0);

  // This enables the ability to move the camera around

  orbitControl();

  // This just makes sure it renders the right scene into the window

  perspective(fieldOfView, ASPECT_RATIO, NEAR, FAR)
  possibleScenes[currentScene]();
}

function keyPressed() {
  // Runs some interaction based code based on current scene

  let sceneInteractions = sceneInteractionList[currentScene];

  if (sceneInteractions) {
    let keyPressedInteraction = sceneInteractions.keyPressed;

    if (keyPressedInteraction) {
      keyPressedInteraction();
    }
  }

  // Switches to the next scene, resetting it to 0 if it reached the last scene

  if (key === "Enter") {
    currentScene = (currentScene + 1) % sceneAmount;
    let sceneToggle = sceneToggles[currentScene];

    if (sceneToggle) {
      sceneToggle();
    }
  }
}

function mouseClicked() {
  // This does pretty much the same as the ones made for the keys, but for mouseClicked

  let sceneInteractions = sceneInteractionList[currentScene];

  if (sceneInteractions) {
    let mouseClickedInteraction = sceneInteractions.mouseClicked;

    if (mouseClickedInteraction) {
      mouseClickedInteraction();
    }
  }
}