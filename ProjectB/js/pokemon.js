let imgDys;
let gifTire;
let tirePositions = [];
let imgPokeball;
let coverPage = true;
let counter = 0;
let groan;
let pokeTheme;
let pokeWorld;
let pachi;
let pika;
let pip;
let spheal;
let squirtle;
let togepi;
let pokeCharas = [];

function preload() {
  soundFormats('mp3', 'ogg');
  groan = loadSound('./assets/tiredGroan.mp3');
  pokeTheme = loadSound('./assets/Pokemonjp.mp3');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("container");
  background(220);
  imgDys = loadImage("./assets/dystopian-world.jpeg");
  gifTire = loadImage("./assets/tired.gif");
  for (let j = 100; j < width; j += 200) {
    tirePositions.push({ x: width - j, y: -10 });
  }
  imgPokeball = loadImage("./assets/pokeball.png");
  pokeWorld = loadImage("./assets/pokemon-world.jpeg");

  pachi = loadImage("./assets/poke-chara/pachirusu.gif");
  pika = loadImage("./assets/poke-chara/pikachu.gif");
  pip = loadImage("./assets/poke-chara/piplup.gif");
  spheal = loadImage("./assets/poke-chara/spheal.gif");
  squirtle = loadImage("./assets/poke-chara/squirtle.gif");
  togepi = loadImage("./assets/poke-chara/togepi.gif");

  let characterSpacing = 30;
  let characterSize = 150;
  let totalWidth = (characterSize + characterSpacing) * 6 - characterSpacing;

  let startX = (width - totalWidth) / 2;
  let bottomY = windowHeight;

  let pachiInstance = new pokeChara(pachi, startX, bottomY - characterSize, characterSize, "Positive energy charges me up!");
  let pikaInstance = new pokeChara(pika, startX + characterSize + characterSpacing, bottomY - characterSize, characterSize, "Pika pika!");
  let pipInstance = new pokeChara(pip, startX + (characterSize + characterSpacing) * 2, bottomY - characterSize + 50, characterSize - 30, "Let's dive into adventure!");
  let sphealInstance = new pokeChara(spheal, startX + (characterSize + characterSpacing) * 3, bottomY - characterSize - 10, characterSize, "I'm rolling with joy!");
  let squirtleInstance = new pokeChara(squirtle, startX + (characterSize + characterSpacing) * 4, bottomY - characterSize, characterSize, "Squirtle squirt!");
  let togepiInstance = new pokeChara(togepi, startX + (characterSize + characterSpacing) * 5, bottomY - characterSize - 10, characterSize, "Togepi!");

  pokeCharas.push(pachiInstance, pikaInstance, pipInstance, sphealInstance, squirtleInstance, togepiInstance);
}

function draw() {
  let opa = random(0, 200);
  background(0);
  image(imgDys, 0, 0, width, 400);
  image(imgPokeball, 80, 230, 20, 20);
  tiredMan();
  if (coverPage) {
    fill(0);
    rect(0, 400, width, height);
  }
  if (!coverPage && counter <= 120) {
    background(143, 244, 255, opa);
    counter += 1;
  }
  if (!coverPage && counter > 120) {
    image(pokeWorld, 0, 400, width, 450);
    for (let chara of pokeCharas) {
      chara.display();
    }
  }
}

function mouseClicked() {
  if (coverPage) {
    if (mouseX < 100 && mouseX > 80 && mouseY < 250 && mouseY > 230) {
      coverPage = false;
      pokeTheme.play();
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

  for (let chara of pokeCharas) {
    chara.checkClicked();
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

class pokeChara {
  constructor(img, x, y, size, text) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.size = size;
    this.clicked = false;
    this.text = text;
  }

  display() {
    image(this.img, this.x, this.y, this.size, this.size);
    if (this.clicked) {
      fill(255);
      rect(this.x, this.y - 80, this.size, 80);
      noStroke();
      fill(0);
      textSize(12);
      textAlign(CENTER, CENTER);
      text(this.text, this.x + this.size / 2, this.y - 40);
      fill(255);
      textAlign(LEFT, TOP);
    }
  }

  checkClicked() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.size &&
      mouseY > this.y &&
      mouseY < this.y + this.size
    ) {
      this.clicked = !this.clicked;
    } else {
      this.clicked = false;
    }
  }
}
