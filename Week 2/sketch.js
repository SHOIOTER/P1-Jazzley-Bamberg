let roadHeight = 150;
let roadStrokeLength = 100;
let roadStrokeSpacing = 150;
let roadStrokeOffset = -25;
let roadLayerHeight = 10;

let celestialBodyStartY = 600;
let celestialBodyTargetY = 75;

let sunCircleMin = 70;
let sunCircleMax = 140;
let sunCircleElapsed = 0;
let sunCircleDuration = 150;

let sunCircleMaxRadius = sunCircleMax / 2;
let sunStartX = -sunCircleMaxRadius - 1;
let sunElapsed = 0;
let sunDuration = 2000;

let moonSize = 90;

let moonRadius = moonSize / 2;
let moonStartX = -moonRadius - 1;
let moonElapsed = 0;
let moonDuration = 2000;

let currentBackgroundColor = null;
let isDayTime = true;

let towerHeight = 500;
let towerSide = 700;
let windowSize = 40;

let cloudSize = 75;
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

function setup() {
  createCanvas(1000, 800);
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
   Which will change depending on the current point in the day cycle
  */

  if (!currentBackgroundColor) {
    currentBackgroundColor = color(0, 235, 255);
  }

  background(currentBackgroundColor);

  // Road

  push();

  let roadOrigin = height - roadHeight;
  let backgroundFloorHeight = roadOrigin - roadLayerHeight * 3;

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

  let cycleDayColor = color(0, 235, 255);
  let cycleMidPointColor = color(255, 200, 100);
  let cycleNightColor = color(50, 50, 100);

  if (isDayTime) {
    sunCircleElapsed++;
    sunElapsed++;

    let sunTargetX = width + sunCircleMaxRadius + 1;
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

    if (sunCircleElapsed == sunCircleDuration) {
      sunCircleElapsed = 0;
    }
    if (sunElapsed == sunDuration) {
      sunElapsed = 0;
      isDayTime = false;
    }
  } else {
    moonElapsed++;

    let moonTargetX = width + moonRadius + 1;
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

    if (moonElapsed == moonDuration) {
      moonElapsed = 0;
      isDayTime = true;
    }
  }

  pop();

  // My custom tower

  push();

  let towerTop = backgroundFloorHeight - towerHeight

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

  let cloudStartX = width + 200;

  noStroke();
  for (let i = 0; i < cloudList.length; i++) {
    let cloudSettings = cloudList[i];
    let cloudY = cloudSettings.PosY;
    let cloudElapsed = cloudSettings.Elapsed;
    let cloudDuration = cloudSettings.Duration;

    let cloudScale = cloudSettings.Scale;
    let scaledCloudSize = cloudSize * cloudScale;
    let smallCloudPieceSize = scaledCloudSize * 0.8;

    if (!cloudY) {
      cloudY = random(cloudMinHeight, cloudMaxHeight + 1);
      cloudSettings.PosY = cloudY;
    }

    if (cloudElapsed == undefined) {
      cloudElapsed = round(random(0, cloudDuration));
      cloudSettings.Elapsed = cloudElapsed;
    } else {
      cloudElapsed++;
      cloudSettings.Elapsed = cloudElapsed;
    }

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

    console.log(cloudElapsed)

    if (cloudElapsed == cloudDuration) {
      cloudSettings.Elapsed = 0;
    }
  }
}

function keyPressed() {
  if (key == "Enter") {
    // Traffic light logic here, will make that later
    console.log("Enter pressed!");
  }
}