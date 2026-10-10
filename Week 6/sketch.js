let gameData = {
  health: 100,
  happiness: 100,
  
};

let health;
let happiness;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function keyPressed() {
  if (key == "c") {
    console.log("Game data saved");
  }
}