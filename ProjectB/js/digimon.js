let imgDys;
let gifTire;
let tirePositions = [];
let imgDigivise;
let coverPage = true;
let counter = 0;
let groan;
let digiTheme;
let digiWorld;
let frigi;
let seal;
let tai;
let tamer;
let digiCharas = [];

function preload() {
  soundFormats('mp3', 'ogg');
  groan = loadSound('./assets/tiredGroan.mp3');
  digiTheme = loadSound('./assets/butterfly.mp3');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight + 180);
  canvas.parent("container");
  background(220);
  imgDys = loadImage("./assets/dystopian-world.jpeg");
  gifTire = loadImage("./assets/tired.gif");
  for (let j = 100; j < width; j += 200) {
    tirePositions.push({ x: width - j, y: -10 });
  }
  imgDigivise = loadImage("./assets/digivise.png");
  digiWorld = loadImage("./assets/digimon-world.jpeg");

  frigi = loadImage("./assets/digi-chara/frigimon.gif");
  seal = loadImage("./assets/digi-chara/sealdigi.gif");
  tai = loadImage("./assets/digi-chara/tai.gif");
  tamer = loadImage("./assets/digi-chara/tamer.gif");

  let characterSpacing = 30;
  let characterSize = 150;
  let totalWidth = (characterSize + characterSpacing) * 4 - characterSpacing;

  let startX = (width - totalWidth) / 2;
  let bottomY = windowHeight + 180;

  let frigiInstance = new digiChara(frigi, startX, bottomY - characterSize, characterSize, "I’ll go down swinging!");
  let sealInstance = new digiChara(seal, startX + characterSize + characterSpacing, bottomY - characterSize, characterSize, "Don't forget about me, okay?");
  let taiInstance = new digiChara(tai, startX + (characterSize + characterSpacing) * 2, bottomY - characterSize + 50, characterSize - 30, "Courage and friendship will conquer all!");
  let tamerInstance = new digiChara(tamer, startX + (characterSize + characterSpacing) * 3, bottomY - characterSize - 10, characterSize, "The bond with my Digimon is unbreakable!");

  digiCharas.push(frigiInstance, sealInstance, taiInstance, tamerInstance);
}

function draw() {
  let opa = random(0, 200);
  background(0);

  image(imgDys, 0, 0, width, 400);
  image(imgDigivise, 70, 230, 25, 20);
  tiredMan();
  if (coverPage) {
    fill(0);
    rect(0, 400, width, height);
  }
  if (!coverPage && counter <= 500) {
    background(143, 244, 255, opa);
    counter += 1;
  }

  if (!coverPage && counter > 500) {
    image(digiWorld, 0, 400, width, 600);
    for (let chara of digiCharas) {
      chara.display();
    }
  }
}

function mouseClicked() {
  if (coverPage) {
    if (mouseX < 95 && mouseX > 70 && mouseY < 250 && mouseY > 230) {
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

  for (let chara of digiCharas) {
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

class digiChara {
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
