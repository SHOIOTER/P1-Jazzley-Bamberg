let roadHeight = 150;
let roadStrokeLength = 100;
let roadStrokeSpacing = 150;
let roadStrokeOffset = -25;
let roadLayerHeight = 10;
let roadOrigin = null;
let backgroundFloorHeight = null;

let cycleDayColor = null;
let cycleMidPointColor = null;
let cycleNightColor = null;

let celestialBodyStartY = 600;
let celestialBodyTargetY = 75;

let sunCircleMin = 70;
let sunCircleMax = 140;
let sunCircleElapsed = 0;
let sunCircleDuration = 150;

let sunCircleMaxRadius = sunCircleMax / 2;
let sunStartX = -sunCircleMaxRadius - 1;
let sunTargetX = null;
let sunElapsed = 0;
let sunDuration = 2000;

let moonSize = 90;

let moonRadius = moonSize / 2;
let moonStartX = -moonRadius - 1;
let moonTargetX = null;
let moonElapsed = 0;
let moonDuration = 2000;

let currentBackgroundColor = null;
let isDayTime = true;

let towerHeight = 600;
let towerTop = null;
let towerSide = 700;
let windowSize = 40;

let cloudSize = 75;
let cloudStartX = null;
let cloudTargetX = -200;
let cloudMinHeight = 50;
let cloudMaxHeight = 250;
let cloudList = [
  {
    Duration: 1000,
    Scale: 0.9
  },
  {
    Duration: 2000,
    Scale: 1
  },
  {
    Duration: 3000,
    Scale: 1.1
  },
  {
    Duration: 1500,
    Scale: 1.2
  }
];

let trafficLightFrameWidth = 40;
let trafficLightFrameHeight = 140;
let trafficLightDiameter = 30;
let trafficLightRadius = trafficLightDiameter / 2;
let trafficLightOffset = trafficLightFrameWidth / 2;
let trafficLightOffColor = null;
let trafficLightStandWidth = 15;
let trafficLightStandHeight = 80;
let trafficLightPosX = 900;
let trafficLightColor = null;
let autoLightSwitch = false;
let autoLightSwitchInterval = 180;

let lane1PosY = 650;
let lane2PosY = 715;

let carMinBaseDuration = 90;
let carMaxBaseDuration = 180;
let carStartX = -300;
let carTargetX = null;
let carList = [
  {
    UpperLane: true,
    SpeedMultiplier: 1.5
  },
  {
    UpperLane: true,
    SpeedMultiplier: 1.5
  },
  {},
  {}
];
let carModels = [
  {
    Weight: 300,
    Create: function (baseColor) {
      fill(baseColor);
      rect(15, -40, 100, 40);
      rect(0, 0, 150, 50);
      fill(0, 155, 255);
      rect(20, -30, 40, 30, 5);
      rect(70, -30, 40, 30, 5);
      fill(50);
      circle(35, 50, 50);
      circle(110, 50, 50);
    }
  },
  {
    Weight: 50,
    Create: function (baseColor) {
      fill(baseColor);
      rect(15, -40, 100, 40, 20);
      rect(0, 0, 150, 50, 20);
      fill(0, 155, 255);
      rect(25, -35, 30, 30, 20);
      rect(70, -35, 30, 30, 20);
      fill(50);
      circle(35, 50, 50);
      circle(110, 50, 50);
    }
  },
  {
    Weight: 10,
    Create: function(baseColor) {
      scale(2);
      translate(0, -40);
      carModels[0].Create(baseColor);
    }
  }
];
let totalCarWeight = 0;
for (let carModel of carModels) {
  totalCarWeight += carModel.Weight;
}

let vehicleTransitionDuration = 60;
let vehicleTransitionElapsed = vehicleTransitionDuration;
let currentVehicleSpeed = 1;
let currentSpeedStart = currentVehicleSpeed;
let currentSpeedTarget = currentVehicleSpeed;

function getRandomColor() {
  return color(random(0, 255), random(0, 255), random(0, 255));
}

function getRandomDuration(speedMultiplier) {
  return random(carMinBaseDuration, carMaxBaseDuration) / (speedMultiplier || 1);
}

function getRandomCarModel() {
  let randomCarWeight = random(0, totalCarWeight);
  let currentCarWeight = 0;

  for (let carModel of carModels) {
    currentCarWeight += carModel.Weight;
    if (randomCarWeight <= currentCarWeight) {
      return carModel.Create;
    }
  }
}

function getLoopedT(t) {
  return abs(t * 2 - 1);
}

function getQuadT(t) {
  return -pow(t * 2 - 1, 2) + 1;
}

function setup() {
  // Some variable initializing

  cycleDayColor = color(0, 235, 255);
  cycleMidPointColor = color(255, 200, 100);
  cycleNightColor = color(50, 50, 100);
  currentBackgroundColor = color(0, 235, 255);

  createCanvas(1000, 800);

  roadOrigin = height - roadHeight;
  backgroundFloorHeight = roadOrigin - roadLayerHeight * 3;
  towerTop = backgroundFloorHeight - towerHeight;
  sunTargetX = width + sunCircleMaxRadius + 1;
  moonTargetX = width + moonRadius + 1;
  cloudStartX = width + 200;

  for (let cloudSettings of cloudList) {
    cloudSettings.PosY = random(cloudMinHeight, cloudMaxHeight);
    cloudSettings.Elapsed = random(0, cloudSettings.Duration);
  }

  trafficLightOffColor = color(70);
  trafficLightColor = color(100);

  for (carSettings of carList) {
    carSettings.Elapsed = 0;
    carSettings.BaseColor = getRandomColor();
    carSettings.Duration = getRandomDuration(carSettings.SpeedMultiplier);
    carSettings.PosY = (carSettings.UpperLane && lane1PosY || lane2PosY);
    carSettings.Create = getRandomCarModel();
  }

  carTargetX = width + 300;
}

function switchTrafficLight() {
  vehicleTransitionElapsed = 0;
  currentSpeedStart = currentVehicleSpeed;
  currentSpeedTarget = (currentSpeedTarget <= 0 && 1 || currentSpeedTarget - 0.5);
}

function draw() {
  /*
   Background color is based on currentBackgroundColor
   Which will change depending on the current point in the day/night cycle
  */

  background(currentBackgroundColor);

  // Road

  push();

  noStroke();
  fill(100);
  rect(0, roadOrigin, width, roadHeight);

  fill(200);
  for (let x = 0; x < 7; x++) {
    rect(x * roadStrokeSpacing + roadStrokeOffset, height - 70, roadStrokeLength, 15, 7.5);
  }

  fill(85, 85, 100);
  rect(0, roadOrigin - roadLayerHeight, width, roadLayerHeight);

  fill(0, 115, 0);
  rect(0, roadOrigin - roadLayerHeight * 2, width, roadLayerHeight);

  fill(0, 85, 0);
  rect(0, backgroundFloorHeight, width, roadLayerHeight);

  pop();

  // Celestial body cycle (sun & moon)

  push();

  if (isDayTime) {
    sunCircleElapsed++;
    sunElapsed++;

    let sunAlpha = sunElapsed / sunDuration;
    currentBackgroundColor = lerpColor(cycleMidPointColor, cycleDayColor, abs(getLoopedT(sunAlpha) - 1));

    translate(lerp(sunStartX, sunTargetX, sunAlpha), lerp(celestialBodyStartY, celestialBodyTargetY, getQuadT(sunAlpha)));

    noStroke();
    fill(255, 155, 0, 255 / 2);
    for (let i = 0; i < 2; i++) {
      circle(0, 0, lerp(sunCircleMin, sunCircleMax, abs(getLoopedT(sunCircleElapsed / sunCircleDuration) - i)));
    }

    fill(255, 255, 0);
    circle(0, 0, sunCircleMin);

    if (sunCircleElapsed >= sunCircleDuration) {
      sunCircleElapsed = 0;
    }
    if (sunElapsed >= sunDuration) {
      sunElapsed = 0;
      isDayTime = false;
    }
  } else {
    moonElapsed++;

    let moonAlpha = moonElapsed / moonDuration;
    currentBackgroundColor = lerpColor(cycleMidPointColor, cycleNightColor, abs(getLoopedT(moonAlpha) - 1));

    translate(lerp(moonStartX, moonTargetX, moonAlpha), lerp(celestialBodyStartY, celestialBodyTargetY, getQuadT(moonAlpha)));

    noStroke();
    fill(255);
    circle(0, 0, moonSize);

    fill(225);
    circle(20, 5, 20);
    circle(-25, 15, 25);
    circle(-5, -20, 15);
    circle(0, 20, 15);

    if (moonElapsed >= moonDuration) {
      moonElapsed = 0;
      isDayTime = true;
    }
  }

  pop();

  // My custom tower

  push();

  noStroke();
  fill(255, 100, 100);
  rect(towerSide, towerTop, 150, towerHeight);

  stroke(0);
  strokeWeight(1);
  textSize(15);
  fill(isDayTime && 255 || color(255, 155, 0));
  text("SHOIOTER's Tower", towerSide + 8, towerTop + 35);

  fill(isDayTime && color(0, 155, 255) || 255);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 2; x++) {
      stroke(150);
      strokeWeight(5);
      square(x * 70 + towerSide + 20, y * 60 + towerTop + 60, windowSize);
    }
  }

  pop();

  // The moutains

  push();

  noStroke();
  fill(70, 70, 80);
  triangle(200, backgroundFloorHeight, 400, backgroundFloorHeight - 400, 600, backgroundFloorHeight);

  fill(100, 100, 110);
  triangle(80, backgroundFloorHeight, 190, backgroundFloorHeight - 200, 300, backgroundFloorHeight);

  fill(100, 100, 110);
  triangle(400, backgroundFloorHeight, 650, backgroundFloorHeight - 250, 900, backgroundFloorHeight);

  pop();

  // The moving clouds

  noStroke();
  for (let cloudSettings of cloudList) {
    let cloudY = cloudSettings.PosY;
    let cloudElapsed = cloudSettings.Elapsed + 1;
    let cloudDuration = cloudSettings.Duration;

    let cloudScale = cloudSettings.Scale;
    let scaledCloudSize = cloudSize * cloudScale;
    let smallCloudPieceSize = scaledCloudSize * 0.8;

    push();
    translate(lerp(cloudStartX, cloudTargetX, cloudElapsed / cloudDuration), cloudY);

    fill(225);
    circle(-40 * cloudScale, 0, smallCloudPieceSize);
    circle(0, -10 * cloudScale, scaledCloudSize);
    circle(40 * cloudScale, 0, smallCloudPieceSize);

    fill(255);
    circle(-40 * cloudScale, 10 * cloudScale, smallCloudPieceSize);
    circle(0, 0, scaledCloudSize);
    circle(40 * cloudScale, 10 * cloudScale, smallCloudPieceSize);

    pop();

    cloudSettings.Elapsed = (cloudElapsed < cloudDuration && cloudElapsed || 0)
  }

  // The back trees

  fill(0, 255, 0);
  circle(500, lerp(100, 400, noise(frameCount / 60 / 2)), 50);

  // Some background stuff for auto light switching

  push();

  textSize(20);
  fill(255, 155, 255);
  stroke(0);
  text("AutoLightSwitch (Space): " + (autoLightSwitch && "On" || "Off"), 15, 30);

  if (autoLightSwitch && frameCount % autoLightSwitchInterval == 0) {
    switchTrafficLight();
  }

  pop();

  // The traffic light

  push();
  translate(trafficLightPosX, backgroundFloorHeight - trafficLightFrameHeight - trafficLightStandHeight);

  noStroke();
  fill(trafficLightColor);
  rect(0, 0, trafficLightFrameWidth, trafficLightFrameHeight);
  rect(trafficLightOffset - trafficLightStandWidth / 2, trafficLightFrameHeight, trafficLightStandWidth, trafficLightStandHeight);

  fill(currentSpeedTarget <= 0 && color(255, 0, 0) || trafficLightOffColor);
  circle(trafficLightOffset, trafficLightRadius + 10, trafficLightDiameter);

  fill(currentSpeedTarget == 0.5 && color(255, 155, 0) || trafficLightOffColor);
  circle(trafficLightOffset, trafficLightFrameHeight / 2, trafficLightDiameter);

  fill(currentSpeedTarget == 1 && color(0, 255, 0) || trafficLightOffColor);
  circle(trafficLightOffset, trafficLightFrameHeight - trafficLightRadius - 10, trafficLightDiameter);

  pop();

  // The moving cars

  if (vehicleTransitionElapsed < vehicleTransitionDuration) {
    vehicleTransitionElapsed++;
    currentVehicleSpeed = lerp(currentSpeedStart, currentSpeedTarget, vehicleTransitionElapsed / vehicleTransitionDuration);
  }

  for (let carSettings of carList) {
    let carY = carSettings.PosY;
    let carElapsed = carSettings.Elapsed + currentVehicleSpeed;
    let carDuration = carSettings.Duration;
    let carBaseColor = carSettings.BaseColor;

    push();
    translate(lerp(carStartX, carTargetX, carElapsed / carDuration), carY);

    carSettings.Create(carBaseColor);

    pop()

    if (carElapsed < carDuration) {
      carSettings.Elapsed = carElapsed;
    } else {
      carSettings.Elapsed = 0;
      carSettings.BaseColor = getRandomColor();
      carSettings.Duration = getRandomDuration(carSettings.SpeedMultiplier);
      carSettings.Create = getRandomCarModel();
    }
  }
}

function keyPressed() {
  if (key === "Enter") {
    switchTrafficLight();
  }
  if (key === " ") {
    autoLightSwitch = !autoLightSwitch;
  }
}