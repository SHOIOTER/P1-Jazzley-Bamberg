const WAVE_AMPLITUDE = 50;
const WAVE_FREQUENCY = 0.15;
const WAVE_SPEED = 0.0015;

const WAVE_PART_SIZE = 10;
const WAVE_GRID_ORIGIN_Y = 0;
const WAVE_GRID_WIDTH = 40;
const WAVE_GRID_HEIGHT = 40;

const WAVE_GRID_WIDTH_OFFSET = WAVE_GRID_WIDTH * WAVE_PART_SIZE / 2;
const WAVE_GRID_HEIGHT_OFFSET = WAVE_GRID_HEIGHT * WAVE_PART_SIZE / 2;

let waveColorLastChanged;
let waveColorChangeThreshold = 200;
let wavePartLowColor;
let wavePartHighColor;

let shapeMinSize = 50;
let shapeMaxSize = 100;

let shapeMinDuration = 600;
let shapeMaxDuration = 1200;

let shapeMinPosX = -WAVE_GRID_WIDTH_OFFSET;
let shapeMaxPosX = WAVE_GRID_WIDTH_OFFSET;
let shapeMinPosZ = -WAVE_GRID_HEIGHT_OFFSET;
let shapeMaxPosZ = WAVE_GRID_HEIGHT_OFFSET;

let waveGrid = [];
let shapeList = [];

// These are the functions that actually create the desired shape

let shapeCreators = [
  function (size) {
    box(size, size, size);
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
  }
];
let shapeAmount = shapeCreators.length;

const STAR_AXIS_SPEED = 0.0005;
const STAR_ORIGIN_Y = -500;
const STAR_BODY_SIZE = 150;

const PLANET_ORBIT_RADIUS = 400;
const PLANET_ORBIT_SPEED = 0.0005;
const PLANET_BODY_RADIUS = 50;
const PLANET_HOVER_AMPLITUDE = 50;
const PLANET_HOVER_SPEED = 0.001;
const PLANET_AXIS_SPEED = 0.001;

const MOON_ORBIT_RADIUS = 100;
const MOON_ORBIT_SPEED = 0.003;
const MOON_BODY_RADIUS = 25;
const MOON_HOVER_AMPLITUDE = 50;
const MOON_HOVER_SPEED = 0.001;

const MOON_MAN_ORIGIN_Y = -MOON_BODY_RADIUS * 2;
const MOON_MAN_JUMP_DURATION = 500;
const MOON_MAN_JUMP_HEIGHT = 100;

let planetOrbitAngle = 0;
let planetAxisAngle;
let moonOrbitAngle = 0;

let starTexture;
let planetTexture;
let moonTexture;

let moonManJumpElapsed = MOON_MAN_JUMP_DURATION;
let moonManModel;
let moonManTexture;

// This is a class that represents the shape itself

class Shape {
  constructor() {
    setShapeProperties(this);
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
      }
    }
  }

  reactivate() {
    if (!this.active) {
      setShapeProperties(this);
      return true;
    } else {
      return false;
    }
  }
}



function getQuadAlpha(t) {
  return -pow(t * 2 - 1, 2) + 1;
}

function getRandomShapeCreator() {
  return shapeCreators[floor(random(0, shapeAmount))];
}

function getRandomColor() {
  return color(
    random(0, 255),
    random(0, 255),
    random(0, 255)
  );
}

function randomizeWaveColor() {
  wavePartLowColor = getRandomColor();
  wavePartHighColor = getRandomColor();
}

function setShapeProperties(shape) {
  let originX = random(shapeMinPosX, shapeMaxPosX);
  let originZ = random(shapeMinPosZ, shapeMaxPosZ);

  shape.active = true;
  shape.targetSize = random(shapeMinSize, shapeMaxSize);
  shape.duration = random(shapeMinDuration, shapeMaxDuration);
  shape.shapeCreator = getRandomShapeCreator();
  shape.shapeColor = getRandomColor();
  shape.startTime = millis();
  shape.originX = originX;
  shape.originZ = originZ;

  /*
     Selecting the right waveInfo based on generated position
     First I map the position into the right range
     Then I can use it to access the values from the waveGrid

  */

  shape.waveInfo = waveGrid[round(map(
    originX,
    shapeMinPosX,
    shapeMaxPosX,
    1,
    WAVE_GRID_WIDTH
  )) - 1][round(map(
    originZ,
    shapeMinPosZ,
    shapeMaxPosZ,
    1,
    WAVE_GRID_HEIGHT
  )) - 1];
}

function preload() {
  starTexture = loadImage("./Assets/Star.jpg");
  planetTexture = loadImage("./Assets/Planet.jpg");
  moonTexture = loadImage("./Assets/Moon.png");

  moonManModel = loadModel("./Assets/moon-man.obj");
  moonManTexture = loadImage("./Assets/moon-man_color.jpg");
}

function setup() {
  createCanvas(800, 600, WEBGL);

  waveColorLastChanged = millis();
  randomizeWaveColor();

  for (let x = 0; x < WAVE_GRID_WIDTH; x++) {
    let columnValues = [];
    for (let z = 0; z < WAVE_GRID_HEIGHT; z++) {
      columnValues[z] = {
        originX: x * WAVE_PART_SIZE - WAVE_GRID_WIDTH_OFFSET,
        currentY: null,
        originZ: z * WAVE_PART_SIZE - WAVE_GRID_HEIGHT_OFFSET,
        seedX: x * WAVE_FREQUENCY,
        seedZ: z * WAVE_FREQUENCY
      };
    }
    waveGrid[x] = columnValues;
  }

  planetAxisAngle = radians(20);
}

function draw() {
  background(0);

  orbitControl();
  noStroke();

  let now = millis();
  let sineAlpha = now * WAVE_SPEED;

  for (let columnValues of waveGrid) {
    for (let waveInfo of columnValues) {
      let sineValue = sin(sineAlpha + waveInfo.seedX) * sin(sineAlpha + waveInfo.seedZ);
      let currentY = WAVE_GRID_ORIGIN_Y - sineValue * WAVE_AMPLITUDE;
      waveInfo.currentY = currentY;

      push();

      translate(
        waveInfo.originX,
        currentY,
        waveInfo.originZ
      );

      fill(lerpColor(wavePartLowColor, wavePartHighColor, (sineValue + 1) / 2));
      box(WAVE_PART_SIZE);

      pop();
    }
  }

  for (let shape of shapeList) {
    shape.display();
  }

  push();

  translate(0, STAR_ORIGIN_Y, 0);
  rotateY(now * STAR_AXIS_SPEED);

  texture(starTexture);
  sphere(STAR_BODY_SIZE);

  pop();

  planetOrbitAngle = planetOrbitAngle % TAU + PLANET_ORBIT_SPEED * deltaTime;
  moonOrbitAngle = moonOrbitAngle % TAU + MOON_ORBIT_SPEED * deltaTime;

  let sinPlanetOrbit = sin(planetOrbitAngle);
  let planetPosX = cos(planetOrbitAngle) * PLANET_ORBIT_RADIUS;
  let planetPosY = STAR_ORIGIN_Y + sin(now * PLANET_HOVER_SPEED) * PLANET_HOVER_AMPLITUDE;
  let planetPosZ = sinPlanetOrbit * PLANET_ORBIT_RADIUS;

  push();

  translate(planetPosX, planetPosY, planetPosZ);
  rotateX(sinPlanetOrbit * planetAxisAngle);
  rotateY(now * PLANET_AXIS_SPEED);

  texture(planetTexture);
  sphere(PLANET_BODY_RADIUS);

  pop();

  if (moonManJumpElapsed < MOON_MAN_JUMP_DURATION) {
    moonManJumpElapsed += deltaTime;
  }

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
      getQuadAlpha(moonManJumpElapsed / MOON_MAN_JUMP_DURATION)
    ),
    0
  );
  rotateX(PI);

  texture(moonManTexture);
  model(moonManModel);

  pop();
}

/*
   The system reuses already existing shapes if there are any inactive left
   If there aren't any inactive shapes it can reuse, it will add a new one to the array
*/

function keyPressed() {
  if (key == "Backspace") {
    let noInctiveShapes = true

    for (let shape of shapeList) {
      if (shape.reactivate()) {
        noInctiveShapes = false;
        break;
      }
    }

    if (noInctiveShapes) {
      shapeList.push(new Shape());
    }
  }
}

/*
   Randomizes the color of the wave when clicking quickly again after last click
   Usually when double clicking
*/

function mouseClicked() {
  let now = millis();
  if (now - waveColorLastChanged <= waveColorChangeThreshold) {
    randomizeWaveColor();
  }
  waveColorLastChanged = now;

  if (moonManJumpElapsed >= MOON_MAN_JUMP_DURATION) {
    moonManJumpElapsed = 0;
  }
};