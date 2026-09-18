let roadHeight = 150;
let roadStrokeLength = 100;
let roadStrokeSpacing = 150;
let roadStrokeOffset = -25;
let roadLayerHeight = 10;
let roadOrigin = null;
let backgroundFloorHeight = null;

let cycleDayColor = null;
let cycleNightColor = null;
let cycleMidPointColor = null;

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
let sunDuration = 1200;

let starMinSize = 4;
let starMaxSize = 8;
let starAmount = 100;
let starList = [];

let moonSize = 90;

let moonRadius = moonSize / 2;
let moonStartX = -moonRadius - 1;
let moonTargetX = null;
let moonElapsed = 0;
let moonDuration = 1200;

let currentBackgroundColor = null;
let isDayTime = true;

let towerHeight = 600;
let towerTop = null;
let towerSide = 700;
let towerTextColorDay = null;
let towerTestColorNight = null;
let windowSize = 40;
let windowColorDay = null;
let windowColorNight = null;

let cloudSize = 75;
let cloudStartX = null;
let cloudTargetX = -200;
let cloudMinHeight = 50;
let cloudMaxHeight = 250;

/*
This contains the settings of every cloud
Such as lerp time and scale
*/

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
  },
  {
    Duration: 2000,
    Scale: 1.3
  }
];

let treeTrunkWidth = 30;
let treeTrunkHeight = 180;
let treeLeavesSize = 100;
let treeLeavesAmplitude = 15;
let treeLeavesSpeed = 0.04;

/*
Currently contains all x positions of the trees that I want to place
The y positions get added dynamically in the setup system, based on the height of the canvas
*/

let treePositionsBack = [
  [100],
  [250],
  [450],
  [750]
];
let treePositionsFront = [
  [300],
  [550]
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

// Will use this to dynamically display the current state as text on your screen

let trafficLightStateNames = {
  [1]: "Green",
  [0.5]: "Orange",
  [0]: "Red"
};

// This is also going to be asigned in the setup function, to make sure it's tied to the canvas height

let lane1PosY = null;
let lane2PosY = null;

let carMinBaseDuration = 90;
let carMaxBaseDuration = 180;
let carStartX = -300;
let carTargetX = null;
let carLightOnColorBack = null;
let carLightOnColorFront = null;
let carLightOffColor = null;
let carFloatSpeed = 0.04;

/*
Every obbject represents a car, it also contains optional properties
Such as UpperLane and SpeedMultiplier, UpperLane tells if the car is actually on the left
SpeedMultiplier adds a percentage onto the random speed, making those cars either slower or faster than avarage
*/

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
  {},
  {}
];

/*
These are objects inside an array that contain a weight and create value
The weight indicates the chance/propability that the car will be chosen
The create function is the function that is responsible for the creation and appearance of the car
It also switches the color of the lights depending on if it's night or not (they will turn on at night time)
*/

let carModels = [
  // The default car 

  {
    Weight: 300,
    Create: function (baseColor) {
      fill(baseColor);
      rect(15, -40, 100, 40);
      rect(0, 0, 150, 50);

      fill(0, 155, 255);
      rect(20, -35, 40, 30, 5);
      rect(70, -35, 40, 30, 5);

      fill(isDayTime && carLightOffColor || carLightOnColorBack);
      rect(0, 0, 20, 30);
      fill(isDayTime && carLightOffColor || carLightOnColorFront);
      rect(130, 0, 20, 30);

      fill(50);
      circle(35, 50, 50);
      circle(110, 50, 50);
    }
  },

  // The rounded car

  {
    Weight: 50,
    Create: function (baseColor) {
      fill(baseColor);
      rect(15, -40, 100, 40, 20);
      rect(0, 0, 150, 50, 20);

      fill(0, 155, 255);
      rect(25, -35, 30, 30, 20);
      rect(70, -35, 30, 30, 20);

      fill(isDayTime && carLightOffColor || carLightOnColorBack);
      rect(0, 0, 20, 30, 10);
      fill(isDayTime && carLightOffColor || carLightOnColorFront);
      rect(130, 0, 20, 30, 10);

      fill(50);
      circle(35, 50, 50);
      circle(110, 50, 50);
    }
  },

  // The giant car

  {
    Weight: 10,
    Create: function (baseColor) {
      scale(2);
      translate(0, -40);
      carModels[0].Create(baseColor);
    }
  },

  // The alien car

  {
    Weight: 0,
    Create: function (baseColor) {
      push()

      // This just makes the alien car appear to be floating

      translate(0, sin(frameCount * carFloatSpeed) * 15);

      fill(baseColor);
      rect(25, -40, 100, 40);
      rect(0, 0, 150, 50);

      fill(0, 155, 255);
      rect(30, -35, 40, 30, 5);
      rect(80, -35, 40, 30, 5);

      fill(isDayTime && carLightOffColor || carLightOnColorBack);
      rect(0, 0, 20, 30);
      fill(isDayTime && carLightOffColor || carLightOnColorFront);
      rect(130, 0, 20, 30);

      fill(255);
      rect(25, 50, 100, 8);

      pop();
    }
  }
];

let vehicleTransitionDuration = 60;
let vehicleTransitionElapsed = vehicleTransitionDuration;
let currentVehicleSpeed = 1;
let currentSpeedStart = currentVehicleSpeed;
let currentSpeedTarget = currentVehicleSpeed;

// Generates a random color

function getRandomColor() {
  return color(random(0, 255), random(0, 255), random(0, 255));
}

// Generates a random speed, later used to give cars their randomized speed

function getRandomDuration(speedMultiplier) {
  return random(carMinBaseDuration, carMaxBaseDuration) / (speedMultiplier || 1);
}

/*
This is the entire logic between picking random cars
First it will count up the total weight of all cars combined
Then it will generate a random number between 0 and that weight
It will loop through every carModel again, adding the weight onto the currentCarWeight (which is a counter)
Everytime after doing so, it will check if the random weight is already under the currentCarWeight
If so, it will return that create function
*/

function getRandomCarModel() {
  let totalCarWeight = 0;

  for (let carModel of carModels) {
    totalCarWeight += carModel.Weight;
  }

  let randomCarWeight = random(0, totalCarWeight);
  let currentCarWeight = 0;

  for (let carModel of carModels) {
    currentCarWeight += carModel.Weight;
    if (randomCarWeight <= currentCarWeight) {
      return carModel.Create;
    }
  }

  /*
  Failsafe, in case it fails to pick a car somehow
  Then it will just return the first car's create function
  Although, that usually doesn't happen
  */

  return carModels[0].Create;
}

// Gives a number that maps a numberrange from 0 to 1, to 1 to 0 back to 1

function getLoopedT(t) {
  return abs(t * 2 - 1);
}

/*
Gives a quadratic value, it maps a number from 0 to 1 into a number that goes from 0 to 1 and back to 0
In a negative parabowl (used for the sun and moon's height later)
*/

function getQuadT(t) {
  return -pow(t * 2 - 1, 2) + 1;
}

/*
Takes that same array with treePositions and will place a tree on every stated position in the array
I made the position equal to an array with 2 values, index 0 is the x value, and index 1 is the y value
I am aware that it's also possible to use objects, but arrays were quick and simple, no need to assign a key to a value
*/

function generateTrees(treePositions) {
  for (let treePosition of treePositions) {
    push();

    // Putting the right values into the translate

    translate(treePosition[0], treePosition[1]);

    fill(0, 50, 0);
    rect(0, -treeTrunkHeight, treeTrunkWidth, treeTrunkHeight);

    for (let x = 0; x < 4; x++) {

      // The back leaves are lighter than the front ones, so every step it will take 10 green from the total colour value

      fill(0, 110 - 10 * (x + 1), 0);

      // Using sine to animate the leaves, also calculating an offset so that the leaves aren't all on the same position

      circle(treeTrunkWidth / 2 + treeLeavesAmplitude * sin(frameCount * treeLeavesSpeed + x * PI / 2), -treeTrunkHeight, treeLeavesSize);
    }

    pop();
  }
}

function setup() {
  // Some variable initializing

  cycleDayColor = color(0, 235, 255);
  cycleNightColor = color(50, 50, 100);
  cycleMidPointColor = lerpColor(cycleDayColor, cycleNightColor, 0.5);
  currentBackgroundColor = cycleMidPointColor;

  createCanvas(1000, 800);

  // backgroundFloorHeight is the height where the background stuff's bottom is placed on

  roadOrigin = height - roadHeight;
  backgroundFloorHeight = roadOrigin - roadLayerHeight * 3;

  towerTop = backgroundFloorHeight - towerHeight;
  towerTextColorDay = color(255);
  towerTestColorNight = color(255, 155, 0);
  windowColorDay = color(0, 155, 255);
  windowColorNight = color(255);

  sunTargetX = width + sunCircleMaxRadius + 1;

  // Generating a bunch of stars, but make sure they stay within the visible boundries

  for (let i = 0; i < starAmount; i++) {
    starList[i] = [random(0, width), random(0, backgroundFloorHeight), random(starMinSize, starMaxSize)];
  }

  moonTargetX = width + moonRadius + 1;

  cloudStartX = width + 200;

  /*
  Giving every cloud a repetitive value, I always use for loops to do so
  Because it's the exact same piece of code, I only assign the properties manually if they usually differ from eachother
  Code wise, not value wise. Since the values will be different, because it uses the random function
  */

  for (let cloudSettings of cloudList) {
    cloudSettings.PosY = random(cloudMinHeight, cloudMaxHeight);
    cloudSettings.Elapsed = random(0, cloudSettings.Duration);
  }

  /*
  Finally adding all the yPositions, I could have make one variable for all these positions
  But I made the system so you can also customize the yPositions freely per tree, even though that isn't really used here
  I use 2 treePosition arrays because I want to render one set of trees behind the cars, and 2 in front of the cars
  */

  for (let treePosition of treePositionsBack) {
    treePosition[1] = backgroundFloorHeight + roadLayerHeight * 1.5;
  }

  for (let treePosition of treePositionsFront) {
    treePosition[1] = height + 50;
  }

  /*
  The entire reason why I initialize some variables in the setup function is because functions aren't available before the setup
  And also because the width and height values are only updated after calling createCanvas
  */

  trafficLightOffColor = color(70);
  trafficLightColor = color(100);
  lane1PosY = height - 150;
  lane2PosY = height - 85;

  // Also adding custom repetitive values to each object car, because repeatingly adding them to every new object is annoying

  for (let carSettings of carList) {
    carSettings.Elapsed = 0;
    carSettings.BaseColor = getRandomColor();
    carSettings.Duration = getRandomDuration(carSettings.SpeedMultiplier);
    carSettings.PosY = (carSettings.UpperLane && lane1PosY || lane2PosY);
    carSettings.Create = getRandomCarModel();
  }

  carTargetX = width + 300;
  carLightOnColorBack = color(255, 55, 0);
  carLightOnColorFront = color(255);
  carLightOffColor = color(155);
}

// Switches the speed settings

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

  // Celestial body cycle (sun & moon) + some other stuff for car chances

  push();

  /*
  If it's dayTime it will render the sun and if it's not, it will render the moon and stars
  The height is calculated quadratically, while the horizontal distance is linear
  Which makes it look like a negative parabowl/arc
  */

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

    // Resetting the elapsed to 0, and when day cycle is done it will also switch dayTime to nightTime

    if (sunCircleElapsed >= sunCircleDuration) {
      sunCircleElapsed = 0;
    }
    if (sunElapsed >= sunDuration) {
      sunElapsed = 0;
      isDayTime = false;
    }

    // The aliens are not present at daytime, they prefer to stay hidden

    carModels[3].Weight = 0;
  } else {
    moonElapsed++;

    let moonAlpha = moonElapsed / moonDuration;
    let loopedMoonAlpha = abs(getLoopedT(moonAlpha) - 1);
    currentBackgroundColor = lerpColor(cycleMidPointColor, cycleNightColor, loopedMoonAlpha);

    // Making the stars fade in and out during night cycle

    fill(255, 255 * loopedMoonAlpha);
    for (let starSettings of starList) {
      circle(starSettings[0], starSettings[1], starSettings[2]);
    }

    translate(lerp(moonStartX, moonTargetX, moonAlpha), lerp(celestialBodyStartY, celestialBodyTargetY, getQuadT(moonAlpha)));

    noStroke();
    fill(255);
    circle(0, 0, moonSize);

    fill(225);
    circle(20, 5, 20);
    circle(-25, 15, 25);
    circle(-5, -20, 15);
    circle(0, 20, 15);

    // Switching back to daytime when the night cycle is done, also resetting the elapsed for next night

    if (moonElapsed >= moonDuration) {
      moonElapsed = 0;
      isDayTime = true;
    }

    /*
    When it becomes night time, the aliens will start having a chance to appear
    My reason behind this is the fact that the aliens don't like being seen by humans
    And during the night it would be less obvious they're aliens since everyone is so tired (the humans aren't so bright here)
    */

    carModels[3].Weight = 100;
  }

  pop();

  // Road

  push();

  noStroke();
  fill(100);
  rect(0, roadOrigin, width, roadHeight);

  // Using a for loop to generate a line pattern

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

  // My custom tower

  push();

  noStroke();
  fill(255, 100, 100);
  rect(towerSide, towerTop, 150, towerHeight);

  /*
  I made it that both the windows and text of the tower changes when it turns day or night
  The lights go on, and the text turns red-orange like
  */

  stroke(0);
  strokeWeight(1);
  textSize(15);
  fill(isDayTime && towerTextColorDay || towerTestColorNight);
  text("SHOIOTER's Tower", towerSide + 8, towerTop + 35);

  fill(isDayTime && windowColorDay || windowColorNight);
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
    circle(0, -8 * cloudScale, scaledCloudSize);
    circle(40 * cloudScale, 0, smallCloudPieceSize);

    fill(255);
    circle(-40 * cloudScale, 8 * cloudScale, smallCloudPieceSize);
    circle(0, 0, scaledCloudSize);
    circle(40 * cloudScale, 8 * cloudScale, smallCloudPieceSize);

    pop();

    // Just resets the value if the elapsedTime matches the duration of the lerp

    cloudSettings.Elapsed = (cloudElapsed < cloudDuration && cloudElapsed || 0)
  }

  // The back trees

  generateTrees(treePositionsBack);

  // The traffic light

  push();
  translate(trafficLightPosX, backgroundFloorHeight - trafficLightFrameHeight - trafficLightStandHeight);

  /*
  This makes sure it just switches the traffic light if the automatic light switcher is on and the interval has passed
  Haven't used an elapsed value here, since it doesn't really matter to me if it's in the middle of a countdown here
  */

  if (autoLightSwitch && frameCount % autoLightSwitchInterval == 0) {
    switchTrafficLight();
  }

  noStroke();
  fill(trafficLightColor);
  rect(0, 0, trafficLightFrameWidth, trafficLightFrameHeight);
  rect(trafficLightOffset - trafficLightStandWidth / 2, trafficLightFrameHeight, trafficLightStandWidth, trafficLightStandHeight);

  /*
  Colors the lights to their color, just checks if the currentSpeedTarget is equals to their color, and then makes it their color
  Otherwise it will make itself black, indicating the light is off
  */

  fill(currentSpeedTarget <= 0 && color(255, 0, 0) || trafficLightOffColor);
  circle(trafficLightOffset, trafficLightRadius + 10, trafficLightDiameter);

  fill(currentSpeedTarget == 0.5 && color(255, 155, 0) || trafficLightOffColor);
  circle(trafficLightOffset, trafficLightFrameHeight / 2, trafficLightDiameter);

  fill(currentSpeedTarget == 1 && color(0, 255, 0) || trafficLightOffColor);
  circle(trafficLightOffset, trafficLightFrameHeight - trafficLightRadius - 10, trafficLightDiameter);

  pop();

  // The moving cars

  // This just handles the acceleration and deceleration, it isn't quadratic, but linear. Since that was the simplest I could make it

  if (vehicleTransitionElapsed < vehicleTransitionDuration) {
    vehicleTransitionElapsed++;
    currentVehicleSpeed = lerp(currentSpeedStart, currentSpeedTarget, vehicleTransitionElapsed / vehicleTransitionDuration);
  }

  /*
  This just animates every car in the carList, keeping track of the elapsed, kinda like with the clouds
  But it will also rewrite some values to other values when the car has reached it's destination
  Basically recycling them into a new car, which will also have a randomized new model, speed, and color
  */

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

  // The trees front

  generateTrees(treePositionsFront);

  // Displaying stuff for the user

  /*
  This will make it more clear to the user which inputs they can use
  But also showing them what the current state of that setting is
  Like if the auto light is on/off
  */

  push();
  translate(10, 30);

  textSize(20);
  stroke(0);

  fill(0, 155, 255);
  text("Toggle Traffic Light State (Enter): " + trafficLightStateNames[currentSpeedTarget], 0, 0)

  fill(255, 0, 255);
  text("Toggle Auto Traffic Light (Space): " + (autoLightSwitch && "On" || "Off"), 0, 30);

  pop();
}

// This handles the auto light toggle, and the light color based on input

function keyPressed() {
  if (key === "Enter") {
    switchTrafficLight();
  }
  if (key === " ") {
    autoLightSwitch = !autoLightSwitch;
  }
}