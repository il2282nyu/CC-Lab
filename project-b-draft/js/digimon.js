let imgDys;
let gifTire;
let tirePositions = [];
let imgDigivise; 
let coverPage = true;
let counter = 0;
let groan;
let digiTheme;

function preload() {
  soundFormats('mp3', 'ogg');
  groan = loadSound('./assets/tiredGroan.mp3');
  digiTheme = loadSound('./assets/butterfly.mp3');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("container"); 
  background(220);
  imgDys = loadImage("./assets/dystopian-world.jpeg");
  gifTire = loadImage("./assets/tired.gif");
  for (let j = 100; j < width; j += 200) {
    tirePositions.push({x: width - j, y: -10}); 
  }
  imgDigivise = loadImage("./assets/digivise.png");
}

function draw() {
  let opa = random(0, 200);
  background(255);
  image(imgDys, 0, 0, width, 350);
  image(imgDigivise, 80, 200, 25, 20);
  tiredMan();
  if (coverPage) {
    fill(0);
    rect(0, 350, width, height);
  }
  if (!coverPage && counter < 500) {
    background(143, 244, 255, opa);
    counter += 1;
  }
  console.log(counter)
}

function mouseClicked() {
  if (coverPage) {
    if (mouseX < 105 && mouseX > 80 && mouseY < 220 && mouseY > 200) {
      coverPage = false;
      digiTheme.play();
    }
  } 

  for (let i = 0; i < tirePositions.length; i++) {
    if (
      mouseX > tirePositions[i].x &&
      mouseX < tirePositions[i].x + 180 &&
      mouseY > tirePositions[i].y &&
      mouseY < tirePositions[i].y + 150
    ) {
      groan.play();
      console.log("Groan sound played!");
      break; 
    }
  }
}



function tiredMan() {
  for (let i = 0; i < tirePositions.length; i++) {
    image(gifTire, tirePositions[i].x, tirePositions[i].y, 180, 150);
    tirePositions[i].x -= 0.5; 
    if (tirePositions[i].x < -180) {
      tirePositions[i].x = width - 100; 
    }
  }
}
  
  