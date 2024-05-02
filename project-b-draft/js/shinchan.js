let imgDys;
let gifTire;
let tirePositions = [];
let imgChoco; 
let coverPage = true;
let counter = 0;
let groan;
let shinTheme;
let shinWorld;
let bo;
let kaz;
let zhen;
let shin;
let shinCharas = [];

function preload() {
  soundFormats('mp3', 'ogg');
  groan = loadSound('./assets/tiredGroan.mp3');
  shinTheme = loadSound('./assets/crayonShinchan.mp3');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight + 180);
  canvas.parent("container"); 
  background(220);
  imgDys = loadImage("./assets/dystopian-world.jpeg");
  gifTire = loadImage("./assets/tired.gif");
  for (let j = 100; j < width; j += 200) {
    tirePositions.push({x: width - j, y: -10}); 
  }
  imgChoco = loadImage("./assets/chocobi.png");
  shinWorld = loadImage("./assets/shinchan-world.jpeg");
  bo = loadImage("./assets/shinchan-chara/bo.gif");
  kaz = loadImage("./assets/shinchan-chara/kaz.gif");
  zhen = loadImage("./assets/shinchan-chara/zhen.gif");
  shin = loadImage("./assets/shinchan-chara/shin.gif");
  
  let characterSpacing = 30; 
  let characterSize = 150; 
  let totalWidth = (characterSize + characterSpacing) * 3 - characterSpacing; 
  
  let startX = (width - totalWidth) / 2;
  let bottomY = windowHeight + 190; 

  let boInstance = new shinChara(bo, startX, bottomY - characterSize, characterSize, "There's always a new rock\nto discover everyday\nlife's a treasure hunt of fun!\nLet's collect every rock \nto make a hill of happiness!");
  let kazInstance = new shinChara(kaz, startX + characterSize + characterSpacing, bottomY - characterSize, characterSize, "Don't make your goal\ntrying to become someone;\ninstead, make your goal to\n become the world's\n only one!");
  let zhenInstance = new shinChara(zhen, startX + (characterSize + characterSpacing) * 2, bottomY - characterSize + 50, characterSize - 30, "We've made it through\n an ordinary day.\n It's truly something to\nbe happy about!"); 
  let shinInstance = new shinChara(shin, startX + (characterSize + characterSpacing) * 3 , bottomY - characterSize - 10, characterSize, "Life has many different\nchapter, never be afraid\nJust learn it\n and try something new!\n 'Woof! Woof!'");

  
  shinCharas.push(boInstance, kazInstance, zhenInstance, shinInstance);
}

function draw() {
  let opa = random(0, 200);
  background(0);

  image(imgDys, 0, 0, width, 400);
  image(imgChoco, 70, 230, 50, 60);
  tiredMan();
  if (coverPage) {
    fill(0);
    rect(0, 350, width, height);
  }

  if (!coverPage && counter <= 260) {
    background(143, 244, 255, opa);
    counter += 1;
  }

  if (!coverPage && counter > 260) {
    image(shinWorld, 0, 400, width, 600);
    for (let chara of shinCharas) {
      chara.display();
    }
  }

}

function mouseClicked() {
  if (coverPage) {
    if (mouseX < 120 && mouseX > 70 && mouseY < 290 && mouseY > 230) {
      coverPage = false;
      shinTheme.play();
    }
  } 

  for (let chara of shinCharas) {
    chara.checkClicked(); 
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

class shinChara {
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



