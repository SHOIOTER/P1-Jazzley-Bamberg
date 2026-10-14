let WINDOW_WIDTH = 960;
let WINDOW_HEIGHT = 720;

let ASSET_FOLDER = "./Assets/";

let defaultStats = {
  hunger: 0,
  energy: 100,
  happiness: 100,
  health: 100
};

let hunger;
let energy;
let happiness;
let health;

let petAnimData = {
  default: {
    anim: "Quiz_Showcase.mp4"
  }
};

let petAnimator;

let gameScenes = {
  Livingroom: function () {
    background(255, 0, 155);

    fill(255, 0, 0);
    square(100, 100, 100);
  },
  Kitchen: function () {
    background(255, 155, 0);

    fill(0, 255, 0);
    square(100, 100, 100);

    fill(255, 0, 0);
    circle(300, 300, 100);
  },
  Bedroom: function () {
    background(0, 200, 255);

    fill(0, 0, 255);
    square(100, 100, 100);
  },
  Bathroom: function () {
    background(155, 0, 255);

    fill(255, 155, 0);
    square(100, 100, 100);
  }
};
let currentScene = gameScenes.Livingroom;

function preload() {
  petAnimator = new AnimationPlayer(petAnimData);
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  imageMode(CENTER);

  let gameStats = getItem("Stats") || defaultStats;
  hunger = gameStats.hunger;
  energy = gameStats.energy;
  happiness = gameStats.happiness;
  health = gameStats.health;

  let switchSceneRadio = createRadio();
  switchSceneRadio.position(30, 200);
  switchSceneRadio.size(50);
  switchSceneRadio.style("color: white");
  switchSceneRadio.style("font-size: 30px");
  switchSceneRadio.style("webkit-text-stroke: 0.65px #000000");
  switchSceneRadio.style("font-family: Segoe Print");
  switchSceneRadio.style("font-weight: Bold");

  let sceneNames = Object.keys(gameScenes);

  for (let sceneName of sceneNames) {
    switchSceneRadio.option(sceneName, sceneName);
  }

  switchSceneRadio.selected(sceneNames[0]);

  switchSceneRadio.changed(function () {
    currentScene = gameScenes[switchSceneRadio.value()];
  });
}

function draw() {
  currentScene();
  petAnimator.render(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, 800, 600);
}

function keyPressed() {
  if (key == "s") {
    storeItem("Stats", {
      hunger: hunger,
      energy: energy,
      happiness: happiness,
      health: health
    });
  } else if (key == "c") {
    petAnimator.play("default");
  }
}

function getFilePath(container, name) {
  return container + name;
}

class AnimationPlayer {
  constructor(animData) {
    let animationPlayer = this;

    for (let animInfo of Object.values(animData)) {
      let anim = createVideo(getFilePath(ASSET_FOLDER, animInfo.anim), function () {
        anim.hide();

        if (animInfo.idle) {
          anim.attribute("loop", "true");
        } else {
          anim.onended(function () {
            let currentIdle = this.currentIdle;

            if (currentIdle) {
              animationPlayer.play(currentIdle);
            } else {
              animationPlayer.hide();
            }
          });
        }
      });

      animInfo.anim = anim;
    }

    animationPlayer.animData = animData;
  }

  play(animName) {
    let animInfo = this.animData[animName];
    let oldAnim = this.currentAnim;
    let newAnim = animInfo.anim;

    if (animInfo.idle) {
      this.currentIdle = animName;
    }

    if (oldAnim) {
      oldAnim.stop();
    }

    this.currentAnim = newAnim;
    newAnim.play();
  }

  hide() {
    this.currentAnim = null;
    this.currentIdle = null;
  }

  render(x, y, width, height) {
    let currentAnim = this.currentAnim;
    
    if (frameCount % 60 == 0) {
      console.log(currentAnim);
    }

    if (currentAnim) {
      image(currentAnim, x, y, width, height);
    }
  }
}