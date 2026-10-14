function setup() {
  createCanvas(400, 400);

  for (let key in {Laser: "Skibidi"}) {
    console.log(key);
  }

  console.log(Object.values({key: "value"}));

  let testObj = {key: {value: 1}};

  for (let [key, value] of Object.entries(testObj)) {
    value.value = 2;
  }

  console.log(testObj.key);
}

function draw() {
  background(220);
}
