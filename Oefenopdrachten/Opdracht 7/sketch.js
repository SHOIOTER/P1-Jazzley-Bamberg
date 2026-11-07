function setup() {
  createCanvas(960, 540).parent("sketch-container");
  flex();

  let button = createButton();
  button.parent("sketch-container");
  button.style("position: absolute; top: 0px; left: 0px");
}

function draw() {
  background(220);
}
