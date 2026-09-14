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

let towerHeight = 500;
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

let carMinBaseDuration = 90;
let carMaxBaseDuration = 180;
let carStartX = -200;
let carTargetX = null;
let carList = null;
let carFunctions = {
  Default: function(baseColor) {
    fill(baseColor);
    rect(0, -40, 100, 40);
    rect(0, 0, 150, 50);
    fill(0, 155, 255);
    rect(5, -30, 40, 30);
    rect(55, -30, 40, 30);
    fill(50);
    circle(35, 50, 50);
    circle(110, 50, 50);
  },
  Floating: function(baseColor) {
    fill(baseColor);
    circle(0, 0, 50);
  }
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

  carList = [
    {
      Name: "Default",
      PosY: height - 150,
      SpeedMultiplier: 1.5
    },
    {
      Name: "Floating",
      PosY: height - 50
    }
  ];

  for (carSettings of carList) {
    carSettings.Elapsed = 0;
    carSettings.BaseColor = getRandomColor();
    carSettings.Duration = getRandomDuration(carSettings.SpeedMultiplier);
  }

  carTargetX = width + 200;
}

function getLoopedT(t) {
  return abs(t * 2 - 1);
}

function getQuadT(t) {
  return -pow(t * 2 - 1, 2) + 1;
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

  stroke(1);
  textSize(15);
  fill(isDayTime && 225 || color(255, 0, 0));
  text("SHOIOTER's Tower", towerSide + 8, towerTop + 35);

  fill(isDayTime && color(0, 155, 255) || 255);
  for (let y = 0; y < 7; y++) {
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
    circle(-40 * cloudScale, 0, smallCloudPieceSize)
    circle(0, -10 * cloudScale, scaledCloudSize);
    circle(40 * cloudScale, 0, smallCloudPieceSize)

    fill(255);
    circle(-40 * cloudScale, 10 * cloudScale, smallCloudPieceSize);
    circle(0, 0, scaledCloudSize);
    circle(40 * cloudScale, 10 * cloudScale, smallCloudPieceSize)

    pop();

    cloudSettings.Elapsed = (cloudElapsed < cloudDuration && cloudElapsed || 0)
  }

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
    let carName = carSettings.Name;

    push();
    translate(lerp(carStartX, carTargetX, carElapsed / carDuration), carY);

    carFunctions[carName](carBaseColor);

    pop()

    if (carElapsed < carDuration) {
      carSettings.Elapsed = carElapsed;
    } else {
      carSettings.Elapsed = 0;
      carSettings.BaseColor = getRandomColor();
      carSettings.Duration = getRandomDuration(carSettings.SpeedMultiplier);
    }
  }
}

function keyPressed() {
  if (key === "Enter") {
    vehicleTransitionElapsed = 0;
    currentSpeedStart = currentVehicleSpeed;
    currentSpeedTarget = (currentSpeedTarget <= 0 && 1 || currentSpeedTarget - 0.5);
  }
}