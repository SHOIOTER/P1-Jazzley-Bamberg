const PAGE_TO_CANVAS_DIST = 8;

const WINDOW_WIDTH = 960;
const WINDOW_HEIGHT = 720;

const CENTER_X = WINDOW_WIDTH / 2;
const CENTER_Y = WINDOW_HEIGHT / 2;

const ASSET_FOLDER = "./assets";

let petAnimations = {
  default: {
    track: "ultraman.mp4",
    looped: true
  }
};

let petAnimator;

let currentScene;

function preload() {
  petAnimator = new AnimationPlayer(petAnimations);
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  imageMode(CENTER);

  setTimeout(() => petAnimator.play("default"), 1000);
}

function draw() {
  // Rendering the current scene

  switch(currentScene) {
    case "livingroom": {
      break;
    }

    case "kitchen": {
      break;
    }

    case "bathroom": {
      break;
    }

    case "bedroom": {
      break;
    }

    default: {
      background(220);
    }
  }

  // Rendering the pet

  petAnimator.render(CENTER_X, CENTER_Y, WINDOW_WIDTH, WINDOW_HEIGHT);
}

function getFilePath(path, name) {
  if (Array.isArray(name)) {
    for (let i = 0; i < name.length; i++) {
      name[i] = `${path}/${name[i]}`;
    }
  }

  return `${path}/${name}`;
}

function toPixels(value) {
  return value + "px";
}

function styleElement(element, textSize) {
  element.style("background-color", elementBackgroundColor);
  element.style("border-radius", toPixels(ELEMENT_BORDER_RADIUS));
  element.style("border-width", toPixels(ELEMENT_BORDER_WIDTH));
  element.style("border-color", elementBorderColor);
  element.style("font-size", toPixels(textSize));
  element.style("font-weight", ELEMENT_FONT_WEIGHT);
  element.style("color", elementTextColor);
  element.style("webkit-text-stroke", `${toPixels(ELEMENT_TEXT_STROKE_WIDTH)} ${ELEMENT_TEXT_STROKE_COLOR}`);
}

class AnimationPlayer {
  constructor(animations) {
    let animationPlayer = this;

    for (let animation of Object.values(animations)) {
      let track = createVideo(getFilePath(ASSET_FOLDER, animation.track), function () {
        track.attribute("muted", "true");

        if (animation.looped) {
          track.attribute("loop", "true");
        } else {
          track.onended(function () {
            let loopingTrack = animationPlayer.loopingTrack;

            if (loopingTrack) {
              animationPlayer.play(loopingTrack, true);
            } else {
              animationPlayer.stop();
            }
          });
        }

        track.hide();
      });

      animation.track = track;
    }

    animationPlayer.animations = animations;
  }

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

      if (
        force ||
        !isLooped ||
        !currentAnimation ||
        currentAnimation.looped &&
        isLooped
      ) {
        this.playingTrack = name;

        if (currentAnimation) {
          currentAnimation.track.stop();
        }

        newAnimation.track.play();
      }
    }
  }

  stop() {
    this.playingTrack = null;
    this.loopingTrack = null;
  }

  render(x, y, width, height) {
    let playingAnimation = this.animations[this.playingTrack];

    if (playingAnimation) {
      image(playingAnimation.track, x, y, width, height);
    }
  }
}