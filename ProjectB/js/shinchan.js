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
let nene;
let shinCharas = [];
let mask;
let maskX, maskY; 
let maskSize = 50; 
let maskBeingDragged = false; 
let heaven;

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
  nene = loadImage("./assets/shinchan-chara/nene.gif");
  mask = loadImage("./assets/mask.png");
  heaven = loadImage("./assets/heaven.jpeg");

  let characterSpacing = 30; 
  let characterSize = 150; 
  let totalWidth = (characterSize + characterSpacing) * 3 - characterSpacing; 
  
  let startX = (width - totalWidth) / 2;
  let bottomY = windowHeight + 190; 

  let boInstance = new shinChara(bo, startX, bottomY - characterSize, characterSize, "There's always a new rock\nto discover everyday\nlife's a treasure hunt of fun!\nLet's collect every rock \nto make a hill of happiness!",  false);
  let kazInstance = new shinChara(kaz, startX + characterSize + characterSpacing, bottomY - characterSize, characterSize, "Don't make your goal\ntrying to become someone;\ninstead, make your goal to\n become the world's\n only one!", false);
  let zhenInstance = new shinChara(zhen, startX + (characterSize + characterSpacing) * 2, bottomY - characterSize + 50, characterSize - 30, "We've made it through\n an ordinary day.\n It's truly something to\nbe happy about!", false); 
  let shinInstance = new shinChara(shin, startX + (characterSize + characterSpacing) * 3 , bottomY - characterSize - 10, characterSize, "Life has many different\nchapter, never be afraid\nJust learn it\n and try something new!\n 'Woof! Woof!'", false);
  let neneInstance = new shinChara(nene, startX + (characterSize + characterSpacing) - 400, bottomY - characterSize, characterSize - 10, "If there is anything\nthat makes you upset,\n don't hold it in,\nrelease it all out.", false);

  
  shinCharas.push(boInstance, kazInstance, zhenInstance, shinInstance,neneInstance);


  maskX = random(width - maskSize); 
  maskY = height - 50; 
}

function draw() {
  let opa = random(0, 200);
  background(0);

  if (!allLasersActivated()) {
    image(imgDys, 0, 0, width, 400);
    image(imgChoco, 70, 230, 50, 60);
    tiredMan();
    if (coverPage) {
      fill(0);
      rect(0, 400, width, height);
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

      if (!maskBeingDragged) {
        image(mask, maskX, maskY, maskSize, maskSize);
      } else {
        maskX = mouseX - maskSize / 2;
        maskY = mouseY - maskSize / 2;
        image(mask, maskX, maskY, maskSize, maskSize);
      }

      for (let chara of shinCharas) {
        if (
          maskX + maskSize > chara.x &&
          maskX < chara.x + chara.size &&
          maskY + maskSize > chara.y &&
          maskY < chara.y + chara.size
        ) {
          chara.masked = true;
        } else {
          chara.masked = false;
        }
      }
    }

    fill('White');
    textFont('Courier New', 22);
    text('Earth 2024', width - 170, 370);
    fill('Black');
    rect(20, 340, 860, 50);
    textSize(20);
    fill('White');
    text('If only there is a way out, if only I can find the hidden chocobi...', 30, 370);
  } else {
    shinTheme.stop();
    groan.stop();

    image(heaven, 0, 0, width, height);
    fill("Black")
    textSize(30)
    textFont("Courier New");
    text("Anime has the power to erase all the misery", width/2 - 300, height/2)
  }
}


function allLasersActivated() {
  for (let chara of shinCharas) {
    if (!chara.laserActive) {
      return false;
    }
  }
  return true;
}


function mousePressed() {
  if (
    mouseX > maskX &&
    mouseX < maskX + maskSize &&
    mouseY > maskY &&
    mouseY < maskY + maskSize
  ) {
    maskBeingDragged = true;
  }
}

function mouseDragged() {
  if (maskBeingDragged) {
    maskX = mouseX - maskSize / 2;
    maskY = mouseY - maskSize / 2;
  }
}

function mouseReleased() {
  maskBeingDragged = false;
  for (let chara of shinCharas) {
    if (
      maskX + maskSize > chara.x &&
      maskX < chara.x + chara.size &&
      maskY + maskSize > chara.y &&
      maskY < chara.y + chara.size
    ) {
      chara.laserActive = true; 
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
  constructor(img, x, y, size, text, masked) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.size = size;
    this.clicked = false; 
    this.text = text; 
    this.masked = masked; 
    this.laserActive = false; 
  }

  display() {
    if (this.masked || this.laserActive) {
      this.laser(); 
    }
    image(this.img, this.x, this.y, this.size, this.size);

    if (this.clicked) {
      fill(255);
      rect(this.x, this.y - 80, this.size + 20, 80);
      noStroke();
      fill(0);
      textFont('Verdana', 12);
      textAlign(CENTER, CENTER);
      text(this.text, this.x + this.size / 2 + 10, this.y - 40); 
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

  laser() {
    fill(255, 255, 0);
    rect(this.x, 0, this.size, 1000); 
  }

}