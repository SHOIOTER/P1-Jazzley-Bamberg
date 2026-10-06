let assetsFolder = "./Assets/"

let quizList = {
  "The Battle Cats": {
    background: "",
    image: "Game_Icon.png",
    variations: {
      Easy: [
        {
          question: "What is the name of this unit?",
          answers: [
            {
              answer: "Cat",
              correct: true
            },
            { answer: "Ultraman" },
            { answer: "The Mighty Cat" },
            { answer: "Dog" }
          ],
          image: "Normal_Cat.png"
        },
        {
          question: "What is this powerup called?",
          answers: [
            {
              answer: "Speed Up",
              correct: true
            },
            { answer: "Speed Power" },
            { answer: "Fast Button" },
            { answer: "Ultra Speed" }
          ],
          image: "Speed_Up.png"
        },
        {
          question: "What are these called?",
          answers: [
            {
              answer: "Treasures",
              correct: true
            },
            { answer: "Coins" },
            { answer: "Points" },
            { answer: "Candy" }
          ],
          image: "Treasures.png"
        },
        {
          question: "What is the name of the second unit you get in the game?",
          answers: [
            {
              answer: "Tank Cat",
              correct: true
            },
            { answer: "Super Cat" },
            { answer: "Tall Cat" },
            { answer: "King George V" }
          ],
          image: "Tank_Cat.png"
        },
        {
          question: "Which of these YouTubers are known to play the game?",
          answers: [
            {
              answer: "MattShea",
              correct: true
            },
            {
              answer: "CaptainSauce",
              correct: true
            },
            { answer: "KreekCraft" },
            { answer: "Foltyn" }
          ],
          image: "Game_Logo.png"
        },
        {
          question: "What is the name of the first stage in the game?",
          answers: [
            {
              answer: "Korea",
              correct: true
            },
            { answer: "Moon" },
            { answer: "Singapore" },
            { answer: "Japan" }
          ]
        },
        {
          question: "The game has a 3DS version",
          answers: [
            {
              answer: "True",
              correct: true
            },
            { answer: "False" }
          ]
        },
        {
          question: "The game costs money",
          answers: [
            {
              answer: "False",
              correct: true
            },
            { answer: "True" }
          ]
        },
        {
          question: "The game is a mobile game",
          answers: [
            {
              answer: "True",
              correct: true
            },
            { answer: "False" }
          ]
        },
        {
          question: "The game has many spinoff games",
          answers: [
            {
              answer: "True",
              correct: true
            },
            { answer: "False" }
          ]
        }
      ],
      Normal: [
        {
          question: "What is the reason why MattShea started playing the game?",
          answers: [
            {
              answer: "He got sponsored by the creators",
              correct: true
            },
            { answer: "He got an ad of the game" },
            { answer: "He randomly found it on his phone" },
            { answer: "He got a dream of the game" }
          ],
          image: "MattShea.jpg"
        },
        {
          question: "In which year did the Japanese version of the game release?",
          answers: [
            {
              answer: "2012",
              correct: true
            },
            { answer: "2014 BCE" },
            { answer: "3057" },
            { answer: "1246" }
          ]
        },
        {
          question: "What is this unit called?",
          answers: [
            {
              answer: "Awakened Bahamut Cat",
              correct: true
            },
            { answer: "Mr. Beast" },
            { answer: "The Supreme Beast" },
            { answer: "Ultran the Great" }
          ],
          image: "Awakened_Bahamut.png"
        },
        {
          question: "What is this unit called?",
          answers: [
            {
              answer: "Dark Catman",
              correct: true
            },
            { answer: "Super Cat" },
            { answer: "Cat Lord" },
            { answer: "The Mysterious Cat" }
          ],
          image: "Dark_Cat_Man.png"
        },
        {
          question: "In older versions of the game you could get green catfruits on Tuesday",
          answers: [
            {
              answer: "False",
              correct: true
            },
            { answer: "True" }
          ],
          image: "Green_Catfruit.png"
        },
        {
          question: "Which catfruit could you get when playing Thursday's catfruit stage?",
          answers: [
            {
              answer: "Blue Catfruit",
              correct: true
            },
            {
              answer: "Epic Catfruit",
              correct: true
            },
            { answer: "Yellow Catfruit" },
            { answer: "Red Catfruit" }
          ],
          image: "Catfruit_Set.png"
        },
        {
          question: "Currently you can get any catfruit on any day of the week",
          answers: [
            {
              answer: "True",
              correct: true
            },
            { answer: "False" }
          ]
        },
        {
          question: "What is the Nintendo Switch version of the game called?",
          answers: [
            {
              answer: "The Battle Cats Unite!",
              correct: true
            },
            { answer: "The Battle Cats Switch Edition" },
            { answer: "The Battle Cats Pop!" },
            { answer: "The Battle Bears" }
          ]
        },
        {
          question: "What is this unit called?",
          answers: [
            {
              answer: "Manic Mohawk Cat",
              correct: true
            },
            { answer: "Punk Cat" },
            { answer: "Insane Cat" },
            { answer: "Weird Cat" }
          ],
          image: "Manic_Hohawk.png"
        },
        {
          question: "Crazed Cow is a rusher",
          answers: [
            {
              answer: "True",
              correct: true
            },
            { answer: "False" }
          ],
          image: "Crazed_Cow.png"
        }
      ],
      Hard: [
        {
          question: "In which version was Cat Machine's true form added?",
          answers: [
            {
              answer: "Version 5.6",
              correct: true
            },
            { answer: "Version 1.4" },
            { answer: "Version 10.8" },
            { answer: "Version 123.7" }
          ],
          image: "Cat_Machine_True_Form.png"
        },
        {
          question: "What is this enemy called?",
          answers: [
            {
              answer: "Sage of Mind Soractes",
              correct: true
            },
            { answer: "The Great Tinker" },
            { answer: "Mastermind" },
            { answer: "The Greek Guy" }
          ],
          image: "Socrates.png"
        },
        {
          question: "This enemy is based on Isaac Newton",
          answers: [
            {
              answer: "True",
              correct: true
            },
            { answer: "False" }
          ],
          image: "Newton.png"
        },
        {
          question: "What ability do sage enemies have?",
          answers: [
            {
              answer: "Resistance to debuffs",
              correct: true
            },
            { answer: "Only taking 1 damage per hit" },
            { answer: "The ability to teleport" },
            { answer: "Nothing, it's just a sub trait" }
          ],
          image: "Dogenstein.png"
        },
        {
          question: "What is the name of the so called mystery cat?",
          answers: [
            {
              answer: "Capsule Cat",
              correct: true
            },
            { answer: "Matt Cat" },
            { answer: "Super Red Guy" },
            { answer: "Mystical Cat" }
          ],
          image: "MattShea_Collab.jpg"
        },
        {
          question: "This unit has a 'Dodge Attack' talent",
          answers: [
            {
              answer: "True",
              correct: true
            },
            { answer: "False" }
          ],
          image: "Flying_Ninja_Cat.png"
        },
        {
          question: "This enemy has the floating trait",
          answers: [
            {
              answer: "False",
              correct: true
            },
            { answer: "True" }
          ],
          image: "Relic_Bun_Bun.png"
        },
        {
          question: "Relic enemies are known to have the curse ability",
          answers: [
            {
              answer: "True",
              correct: true
            },
            { answer: "False" }
          ],
          image: "Relic_Trait.png"
        },
        {
          question: "Barriers can genenerate",
          answers: [
            {
              answer: "False",
              correct: true
            },
            { answer: "True" }
          ]
        },
        {
          question: "Why is Cyberface not an enemy with the floating trait?",
          answers: [
            {
              answer: "It's stated that he has a dozen of invisible plasma legs",
              correct: true
            },
            { answer: "The creators forgot to add it" },
            { answer: "Metal enemies can't have the floating trait" },
            { answer: "This statement is a lie" }
          ],
          image: "Cyberface.png"
        }
      ]
    }
  }
};

let currentState = "Game";
let currentSubject = "The Battle Cats";
let currentVariation = "Normal";
let currentQuestion = 1;

function preload() {
  for (let quizName of Object.keys(quizList)) {
    let quiz = quizList[quizName];
    quiz.image = loadImage(getFilePath(quiz.image));
    let quizVariations = quiz.variations;

    for (let variationName of Object.keys(quizVariations)) {
      for (let question of quizVariations[variationName]) {
        let questionImage = question.image;

        if (questionImage) {
          question.image = loadImage(getFilePath(questionImage));
        }
      }
    }
  }
}

function setup() {
  createCanvas(800, 600);

  rectMode(CENTER);
  imageMode(CENTER);

  shuffle(quizList[currentSubject].variations[currentVariation], true);

  for (let question of quizList[currentSubject].variations[currentVariation]) {
    shuffle(question.answers, true);
  }
}

function draw() {
  background(220);

  translate(width / 2, 100);

  textAlign(CENTER, CENTER);
  textSize(50);
  if (currentState === "Start") {
    // Start menu logic
    text("Start", 0, 0);
  } else if (currentState === "Game") {
    // Game logic
    text("Game", 0, 0);
  } else {
    // End screen logic
    text("End", 0, 0);
  }

  textSize(20);
  translate(0, 60);

  image(
    quizList[currentSubject].variations[currentVariation][currentQuestion - 1].image || quizList[currentSubject].image, 0, 150, 200, 200
  );
  text(quizList[currentSubject].variations[currentVariation][currentQuestion - 1].question, 0, 0);

  push();
  let offset = 290;
  for (let answer of quizList[currentSubject].variations[currentVariation][currentQuestion - 1].answers) {
    fill(answer.correct && color(0, 155, 0) || color(255, 0, 0))
    text(answer.answer, 0, offset);
    offset += 35;
  }
  pop();
}

function mouseClicked() {
  currentQuestion = currentQuestion % quizList[currentSubject].variations[currentVariation].length + 1;
}

function getFilePath(fileName) {
  return assetsFolder + fileName;
}