const PAGE_TO_CANVAS_DIST = 8;

const WINDOW_WIDTH = 1280;
const WINDOW_HEIGHT = 720;

const CENTER_POS_X = WINDOW_WIDTH / 2;
const CENTER_POS_Y = WINDOW_HEIGHT / 2;

const ASSET_FOLDER = "./assets";

let buttonPressSound;

let mainTextFont;

const ELEMENT_BORDER_RADIUS = "15px";
const ELEMENT_BORDER_WIDTH = "5px";
const ELEMENT_FONT_WEIGHT = "Bold";
const ELEMENT_TEXT_STROKE = "1px rgb(0, 0, 0)";
const ELEMENT_FONT_FAMILY = "sans-serif";

let elementBackgroundColor;
let elementBorderColor;
let elementTextColor;

const PAPER_POS_X = CENTER_POS_X - 280;
const PAPER_HEIGHT_PERCENTAGE = 1.05;

let paperImage;

const INFO_TEXT_BOUND_WIDTH = 460;
const INFO_TEXT_POS_X = PAPER_POS_X - 230;
const INFO_HEAD_POS_Y = 125;
const INFO_TEXT_OFFSET = 115;
const INFO_HEAD_SIZE = 25;
const INFO_TEXT_SIZE = 20;
const INFO_DATA = [
  {
    label: "Beroepsbeeld 1",
    header: "Wat is de top 3 meest gebruikte software / techniek binnen mijn vakgebied (hardskills)?",
    text: "De 3 meest gebruikte game engines zijn Unity, Unreal Engine en Godot.",
    image: "unity-logo.png"
  },
  {
    label: "Beroepsbeeld 2",
    header: "Welke andere software / technieken zijn ook relevant?",
    text: "Ook wordt er software zoals Blender, Visual Studio Code, GitHub en Adobe Photoshop gebruikt voor game development.",
    image: "blender-logo.webp"
  },
  {
    label: "Beroepsbeeld 3",
    header: "Welke houdingsaspecten zijn van belang binnen mijn beroep (softskills)?",
    text: "Het samenwerken met anderen is belangrijk. Het communiceren met je teamgenoten zodat jij en je team goed kunnen samen werken. Netjes bijhouden wat je allemaal hebt gedaan.",
    image: "talking-people.png"
  },
  {
    label: "Beroepsbeeld 4",
    header: "Welke werkprocessen moet ik beheersen voor mijn vak?",
    text: "Ik moet werkzaamheden kunnen plannen en de voortgang bijhouden. Het bedenken en ontwerpen van software. De software maken, en het ook gaan uittesten. En het verbeteren van de software als dat mogelijk is. Maar ook moet ik gesprekken kunnen voeren en overleggen, het presenteren van het werk dat ik opgeleverd heb, en ten slotte reflecteren op het gemaakte werk.",
    image: "csharp-logo.png"
  },
  {
    label: "Beroepsbeeld 5",
    header: "Welke werkprocessen ontwikkel ik nu al tijdens mijn opleiding?",
    text: "Het ontwerpen van projecten, de projecten aanmaken, en het uittesten. Ook probeer ik mijn projecten te verbeteren als het beter kan. En ik reflecteer op mijn gemaakte werk.",
    image: "virtual-pet-code.png"
  },
  {
    label: "Beroepsbeeld 6",
    header: "Welke werkprocessen beheers ik al heel goed?",
    text: "Ik ben goed in het bedenken en maken van projecten, en ik vind het ook leuk om dingen te verbeteren als het beter kan. Ook test ik mijn projecten vaak om te kijken of alles wel werkt.",
    video: "tic-tac-toe.mp4"
  },
  {
    label: "Beroepsbeeld 7",
    header: "Welke werkprocessen vind ik nog lastig? Wat ga ik doen om deze verder te ontwikkelen?",
    text: "Ik vind het nog lastig om dingen te presenteren omdat ik soms niet zo goed ben in dingen uitleggen. Gewoon door oefenen, en dan zou het wel beter moeten gaan.",
    video: "quiz.mp4"
  },
  {
    label: "Werkveld 1",
    header:
      "Bij welke bedrijven binnen mijn vakgebied zou ik wel willen werken? Waarom lijken deze bedrijven mij zo leuk?",
    text: "Dutch Game Garden, omdat het dichtbij is."
  },
  {
    label: "Werkveld 2",
    header: "Op wat voor functie zou ik zelf graag solliciteren?",
    text: "Game Developer (ik kon niet echt iets precies vinden wat ik wilde)."
  },
  {
    label: "Werkveld 3",
    header: "Wat zijn, binnen mijn vakgebied, interessante innovaties/ontwikkelingen om in de gaten te houden?",
    text: "NPCs die AI gestuurd zijn, en AI dat terrain kan genereren."
  },
  {
    label: "Werkveld 4",
    header: "Welke kennis/vaardigheden worden, naar verwachting, steeds relevanter binnen mijn vakgebied?",
    text: "Het goed optimalizeren van spellen, omdat die steeds zwaarder worden."
  },
  {
    label: "Werkveld 5",
    header:
      "Hoe verwacht ik dat mijn vakgebied er over 5 jaar uitziet? Wat is er anders ten opzichte van nu? En wat is hetzelfde gebleven?",
    text: "Ik denk dat er in de toekomst veel meer AI gebruikt gaat worden, maar dat er dan nog wel developers nodig zijn om te checken of alles wel klopt."
  }
];

let infoTextColor;
let infoHeader;
let infoString;
let infoImage;
let infoVideo;
let infoButtons = [];

const INFO_BUTTONS_PER_COLUMN = 3;
const INFO_BUTTONS_PER_ROW = 4;
const INFO_BUTTON_COLUMN_STOP = INFO_BUTTONS_PER_COLUMN - 1;
const INFO_BUTTON_ROW_STOP = INFO_BUTTONS_PER_ROW - 1;
const INFO_BUTTONS_ON_HORIZONTAL_SIDE = INFO_BUTTONS_PER_COLUMN / 2 - 0.5;
const INFO_BUTTONS_ON_VERTICAL_SIDE = INFO_BUTTONS_PER_ROW / 2 - 0.5;

const INFO_BUTTON_AREA_MARGIN = 0.7;
const INFO_BUTTON_AREA_OFFSET_Y = 75;
const INFO_BUTTON_HORIZONTAL_SPACING = (WINDOW_WIDTH * INFO_BUTTON_AREA_MARGIN) / INFO_BUTTONS_PER_COLUMN;
const INFO_BUTTON_VERTICAL_SPACING = (WINDOW_HEIGHT * INFO_BUTTON_AREA_MARGIN) / INFO_BUTTONS_PER_ROW;
const INFO_BUTTON_SIZE_MARGIN = 0.85;
const INFO_BUTTON_WIDTH = INFO_BUTTON_HORIZONTAL_SPACING * INFO_BUTTON_SIZE_MARGIN;
const INFO_BUTTON_HEIGHT = INFO_BUTTON_VERTICAL_SPACING * INFO_BUTTON_SIZE_MARGIN;
const INFO_BUTTON_ORIGIN_X = CENTER_POS_X - INFO_BUTTON_WIDTH / 2 + PAGE_TO_CANVAS_DIST;
const INFO_BUTTON_ORIGIN_Y = CENTER_POS_Y - INFO_BUTTON_HEIGHT / 2 + INFO_BUTTON_AREA_OFFSET_Y + PAGE_TO_CANVAS_DIST;
const INFO_BUTTON_TEXT_SIZE = "30px";

const INFO_MEDIA_WIDTH = 575;
const INFO_MEDIA_POS_X = 950 - INFO_MEDIA_WIDTH / 2 + PAGE_TO_CANVAS_DIST;

const MENU_BUTTON_WIDTH = 240;
const MENU_BUTTON_HEIGHT = 60;
const MENU_BUTTON_BOUND_DIST = 15;
const MENU_BUTTON_POS_X = WINDOW_WIDTH - MENU_BUTTON_WIDTH - MENU_BUTTON_BOUND_DIST + PAGE_TO_CANVAS_DIST;
const MENU_BUTTON_POS_Y = MENU_BUTTON_BOUND_DIST + PAGE_TO_CANVAS_DIST;
const MENU_BUTTON_TEXT_SIZE = "40px";

const TITLE_STRING = "L3 Werkexploratie Beroep";
const TITLE_SIZE = 80;
const TITLE_POS_Y = 80;
const TITLE_STROKE_WEIGHT = 5;

let titleColor;

let onMenu = true;
let menuButtonString = "MENU";
let menuPageColor;
let readPageColor;

function preload() {
  // Loading some stuff

  buttonPressSound = loadSound(getFilePath(ASSET_FOLDER, "button-press.mp3"));

  mainTextFont = loadFont(getFilePath(ASSET_FOLDER, "NewRocker-Regular.ttf"));

  paperImage = loadImage(getFilePath(ASSET_FOLDER, "old-paper.png"));

  for (let buttonInfo of INFO_DATA) {
    let mediaImage = buttonInfo.image;

    if (mediaImage) {
      mediaImage = createImg(getFilePath(ASSET_FOLDER, mediaImage), () => {
        mediaImage.size(INFO_MEDIA_WIDTH, AUTO);
        mediaImage.position(INFO_MEDIA_POS_X, CENTER_POS_Y - mediaImage.size().height / 2 + PAGE_TO_CANVAS_DIST);
        mediaImage.hide();
        buttonInfo.image = mediaImage;
      });
      continue;
    }

    let mediaVideo = buttonInfo.video;

    if (mediaVideo) {
      mediaVideo = createVideo(getFilePath(ASSET_FOLDER, mediaVideo), () => {
        mediaVideo.size(INFO_MEDIA_WIDTH, AUTO);
        mediaVideo.position(INFO_MEDIA_POS_X, CENTER_POS_Y - mediaVideo.size().height / 2 + PAGE_TO_CANVAS_DIST);
        mediaVideo.hide();
        buttonInfo.video = mediaVideo;
      });
    }
  }
}

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  // Making stuff align in a certain way

  textAlign(LEFT, TOP);
  imageMode(CENTER);

  elementBackgroundColor = color(175, 175, 175);
  elementBorderColor = color(200, 200, 200);
  elementTextColor = color(255);

  infoTextColor = color(0);

  titleColor = color(0, 200, 255);

  menuPageColor = color(255, 155, 0);
  readPageColor = color(55, 155, 55);

  // Generating the menu button that redirects you to the menu

  const menuButton = createButton(menuButtonString);

  menuButton.position(MENU_BUTTON_POS_X, MENU_BUTTON_POS_Y);
  menuButton.size(MENU_BUTTON_WIDTH, MENU_BUTTON_HEIGHT);

  // Hides the menu button and shows the info buttons while enabling the menu again

  menuButton.mouseClicked(() => {
    onMenu = true;
    menuButton.hide();

    for (let infoButton of infoButtons) {
      infoButton.show();
    }

    buttonPressSound.play();

    if (infoImage) {
      infoImage.hide();
      infoImage = null;
      return;
    }

    if (infoVideo) {
      infoVideo.stop();
      infoVideo.hide();
      infoVideo = null;
    }
  });

  menuButton.hide();

  styleElement(menuButton, MENU_BUTTON_TEXT_SIZE);

  // Generating all the buttons

  for (let i = 0; i < INFO_DATA.length; i++) {
    const buttonInfo = INFO_DATA[i];
    const headerText = buttonInfo.header;
    const displayText = buttonInfo.text;

    const column = i % INFO_BUTTONS_PER_COLUMN;
    const row = floor(i / INFO_BUTTONS_PER_COLUMN);

    const infoButton = createButton(buttonInfo.label);

    infoButton.position(
      INFO_BUTTON_ORIGIN_X +
        lerp(-INFO_BUTTONS_ON_HORIZONTAL_SIDE, INFO_BUTTONS_ON_HORIZONTAL_SIDE, column / INFO_BUTTON_COLUMN_STOP) *
          INFO_BUTTON_HORIZONTAL_SPACING,
      INFO_BUTTON_ORIGIN_Y +
        lerp(-INFO_BUTTONS_ON_VERTICAL_SIDE, INFO_BUTTONS_ON_VERTICAL_SIDE, row / INFO_BUTTON_ROW_STOP) *
          INFO_BUTTON_VERTICAL_SPACING
    );
    infoButton.size(INFO_BUTTON_WIDTH, INFO_BUTTON_HEIGHT);

    // Switching to text display mode

    infoButton.mouseClicked(() => {
      onMenu = false;
      infoString = displayText;
      infoHeader = headerText;
      menuButton.show();

      for (let infoButton of infoButtons) {
        infoButton.hide();
      }

      buttonPressSound.play();

      let mediaImage = buttonInfo.image;

      if (mediaImage) {
        mediaImage.show();
        infoImage = mediaImage;
        return;
      }

      let mediaVideo = buttonInfo.video;

      if (mediaVideo) {
        mediaVideo.show();
        mediaVideo.loop();
        infoVideo = mediaVideo;
      }
    });

    styleElement(infoButton, INFO_BUTTON_TEXT_SIZE);

    infoButtons.push(infoButton);
  }

  paperImage.resize(0, WINDOW_HEIGHT * PAPER_HEIGHT_PERCENTAGE);
}

function draw() {
  // Draws either the menu or the reading page

  if (onMenu) {
    background(menuPageColor);

    push();

    fill(titleColor);
    stroke(0);
    strokeWeight(TITLE_STROKE_WEIGHT);
    textSize(TITLE_SIZE);
    textFont(mainTextFont);
    textAlign(CENTER, CENTER);
    text(TITLE_STRING, CENTER_POS_X, TITLE_POS_Y);

    pop();
  } else {
    background(readPageColor);

    image(paperImage, PAPER_POS_X, CENTER_POS_Y);

    push();

    fill(infoTextColor);
    textSize(INFO_HEAD_SIZE);
    textFont(mainTextFont);
    text(infoHeader, INFO_TEXT_POS_X, INFO_HEAD_POS_Y, INFO_TEXT_BOUND_WIDTH);

    textSize(INFO_TEXT_SIZE);
    text(infoString, INFO_TEXT_POS_X, INFO_HEAD_POS_Y + INFO_TEXT_OFFSET, INFO_TEXT_BOUND_WIDTH);

    pop();
  }
}

// Easily computes the full file path

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

// Easy element styling

function styleElement(element, textSize) {
  element.style("background-color", elementBackgroundColor);
  element.style("border-radius", ELEMENT_BORDER_RADIUS);
  element.style("border-width", ELEMENT_BORDER_WIDTH);
  element.style("border-color", elementBorderColor);
  element.style("font-size", textSize);
  element.style("font-weight", ELEMENT_FONT_WEIGHT);
  element.style("font-family", ELEMENT_FONT_FAMILY);
  element.style("color", elementTextColor);
  element.style("-webkit-text-stroke", ELEMENT_TEXT_STROKE);
}
