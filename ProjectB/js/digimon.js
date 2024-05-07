let imgDys;
let gifTire;
let tirePositions = [];
let imgDigivice;
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
let digivice;
let digiX, digiY;
let digiSize = 30;
let digiBeingDragged = false;
let heaven;

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
  imgDigivice = loadImage("./assets/digivise.png");
  digiWorld = loadImage("./assets/digimon-world.jpeg");
  frigi = loadImage("./assets/digi-chara/frigimon.gif");
  seal = loadImage("./assets/digi-chara/sealdigi.gif");
  tai = loadImage("./assets/digi-chara/tai.gif");
  tamer = loadImage("./assets/digi-chara/tamer.gif");
  digivice = loadImage("./assets/light-digi.png");
  heaven = loadImage("./assets/heaven.jpeg");

  let characterSpacing = 50;
  let characterSize = 150;
  let totalWidth = (characterSize + characterSpacing) * 4 - characterSpacing;

  let startX = (width - totalWidth) / 2;
  let bottomY = windowHeight + 180;

  let frigiInstance = new digiChara(frigi, startX - 60, bottomY - characterSize - 130, characterSize + 150, "He who fights a monster\nshould take care that\nhe does not become\na monster himself.", false);
  let sealInstance = new digiChara(seal, startX + characterSize + characterSpacing, bottomY - characterSize + 20, characterSize, "If we all work together,\n there’s nothing\nwe can’t do.", false);
  let taiInstance = new digiChara(tai, startX + (characterSize + characterSpacing) * 2, bottomY - characterSize - 30, characterSize + 50, "Being a great human hasn’t\n got anything to\ndo with being envied.\nIt’s only measured by how\nmuch you can contribute\n to others", false);
  let tamerInstance = new digiChara(tamer, startX + (characterSize + characterSpacing) * 3, bottomY - characterSize + 30, characterSize, "Being Troubled, suffering\nthat’s what it\nmeans to live.\n Even if you feel miserable\nand don’t want anyone\n to see you,\n you have to go on", false);

  digiCharas.push(frigiInstance, sealInstance, taiInstance, tamerInstance);


  digiX = random(width - digiSize);
  digiY = height - 50;
}

function draw() {
  let opa = random(0, 200);
  background(0);

  if (!allLasersActivated()) {
    image(imgDys, 0, 0, width, 400);
    image(imgDigivice, 70, 230, 25, 20);
    tiredMan();
    if (coverPage) {
      fill(0);
      rect(0, 400, width, height);
    }


    if (!coverPage && counter <= 300) {
      background(143, 244, 255, opa);
      counter += 1;
    }

    if (!coverPage && counter > 300) {
      image(digiWorld, 0, 400, width, 600);
      for (let chara of digiCharas) {
        chara.display();
      }

      if (!digiBeingDragged) {
        image(digivice, digiX, digiY, digiSize, digiSize);
      } else {
        digiX = digiX - digiSize / 2;
        digiY = digiY - digiSize / 2;
        image(digivice, digiX, digiY, digiSize, digiSize);
      }

      for (let chara of digiCharas) {
        if (
          digiX + digiSize > chara.x &&
          digiX < chara.x + chara.size &&
          digiY + digiSize > chara.y &&
          digiY < chara.y + chara.size
        ) {
          chara.digied = true;
        } else {
          chara.digied = false;
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
    text('If only there is a way out, if only I can find the hidden digivice...', 30, 370);
  } else {
    digiTheme.stop();
    groan.stop();
    image(heaven, 0, 0, width, height);
    fill("Black")
    textSize(30)
    textFont("Courier New");
    text("Anime has the power to erase all the misery", width / 2 - 300, height / 2)
  }
}

function allLasersActivated() {
  for (let chara of digiCharas) {
    if (!chara.laserActive) {
      return false;
    }
  }
  return true;
}

function mousePressed() {
  if (
    mouseX > digiX &&
    mouseX < digiX + digiSize &&
    mouseY > digiY &&
    mouseY < digiY + digiSize
  ) {
    digiBeingDragged = true;
  }
}

function mouseDragged() {
  if (digiBeingDragged) {
    digiX = mouseX - digiSize / 2;
    digiY = mouseY - digiSize / 2;
  }
}

function mouseReleased() {
  digiBeingDragged = false;
  for (let chara of digiCharas) {
    if (
      digiX + digiSize > chara.x &&
      digiX < chara.x + chara.size &&
      digiY + digiSize > chara.y &&
      digiY < chara.y + chara.size
    ) {
      chara.laserActive = true;
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

  for (let chara of digiCharas) {
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

class digiChara {
  constructor(img, x, y, size, text, digied) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.size = size;
    this.clicked = false;
    this.text = text;
    this.digied = digied;
    this.laserActive = false;
  }

  display() {
    if (this.digied || this.laserActive) {
      this.laser(); 
    }
    image(this.img, this.x, this.y, this.size, this.size);
    if (this.clicked) {
      fill(255);
      rect(this.x, this.y - 80, this.size, 80);
      noStroke();
      fill(0);
      textFont("Verdana", 9);
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

  laser() {
    fill(255, 255, 0);
    rect(this.x, 0, this.size, 1000);
  }
}
