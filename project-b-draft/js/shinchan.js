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
  
  let characterSpacing = 50; 
  let characterSize = 200; 
  let totalWidth = (characterSize + characterSpacing) * 3 - characterSpacing; // Calculate total width of all characters
  
  let startX = (width - totalWidth) / 2;
  let bottomY = windowHeight + 190; // Adjusted bottom position
  
  let boInstance = new shinChara(bo, startX, bottomY - characterSize, characterSize);
  let kazInstance = new shinChara(kaz, startX + characterSize + characterSpacing, bottomY - characterSize, characterSize);
  let zhenInstance = new shinChara(zhen, startX + (characterSize + characterSpacing) * 2, bottomY - characterSize, characterSize);
  
  shinCharas.push(boInstance, kazInstance, zhenInstance);
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
  constructor(img, x, y, size) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    image(this.img, this.x, this.y, this.size, this.size);
  }
}
