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
let pokeball;
let pokeX, pokeY;
let pokeSize = 20;
let pokeBeingDragged = false;
let heaven;

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
  pokeball = loadImage("./assets/poke.png");
  heaven = loadImage("./assets/heaven.jpeg");

  let characterSpacing = 50;
  let characterSize = 100;
  let totalWidth = (characterSize + characterSpacing) * 6 - characterSpacing;

  let startX = (width - totalWidth) / 2;
  let bottomY = windowHeight;

  let pachiInstance = new pokeChara(pachi, startX, bottomY - characterSize + 5, characterSize, "Together you and your\nPokemon overcame all the\nchallenges you faced,\nhowever difficult.", false);
  let pikaInstance = new pokeChara(pika, startX + characterSize + characterSpacing, bottomY - characterSize - 20, characterSize + 50, "There's No Sense In Going\nOut Of Your Way\nTo Get Somebody To Like You.", false);
  let pipInstance = new pokeChara(pip, startX + (characterSize + characterSpacing) * 2, bottomY - characterSize - 30, characterSize + 50, "All The Things That \nHappen Each Day...\nEvery One Of Them Matters", false);
  let sphealInstance = new pokeChara(spheal, startX + (characterSize + characterSpacing) * 3, bottomY - characterSize + 15, characterSize, "Everybody Makes A\nWrong Turn\nOnce In A While", false);
  let squirtleInstance = new pokeChara(squirtle, startX + (characterSize + characterSpacing) * 4, bottomY - characterSize, characterSize, "You See, Sometimes\nFriends Have To Go Away,\nBut A Part Of Them\nStays Behind With You.", false);
  let togepiInstance = new pokeChara(togepi, startX + (characterSize + characterSpacing) * 5, bottomY - characterSize + 5, characterSize, "You Can't Expect To\nWin Every Single Battle.", false);

  pokeCharas.push(pachiInstance, pikaInstance, pipInstance, sphealInstance, squirtleInstance, togepiInstance);

  pokeX = random(width - pokeSize);
  pokeY = height - 50;
}

function draw() {
  let opa = random(0, 200);
  background(0);

  if (!allLasersActivated()) {
    image(imgDys, 0, 0, width, 400);
    image(imgPokeball, 80, 230, 20, 20);
    tiredMan();
    if (coverPage) {
      fill(0);
      rect(0, 400, width, height);
    }
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

      if (!pokeBeingDragged) {
        image(pokeball, pokeX, pokeY, pokeSize, pokeSize);
      } else {
        pokeX = mouseX - pokeSize / 2;
        pokeY = mouseY - pokeSize / 2;
        image(pokeball, pokeX, pokeY, pokeSize, pokeSize);
      }

      for (let chara of pokeCharas) {
        if (
          pokeX + pokeSize > chara.x &&
          pokeX < chara.x + chara.size &&
          pokeY + pokeSize > chara.y &&
          pokeY < chara.y + chara.size
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
    text('If only there is a way out, if only I can find the hidden pokeball...', 30, 370);
  } else {
    pokeTheme.stop();
    groan.stop();
    
    image(heaven, 0, 0, width, height);
    fill("Black")
    textSize(30)
    textFont("Courier New");
    text("Anime has the power to erase all the misery", width/2 - 300, height/2)
  }
}

function allLasersActivated() {
  for (let chara of pokeCharas) {
    if (!chara.laserActive) {
      return false;
    }
  }
  return true;
}

function mousePressed() {
  if (
    mouseX > pokeX &&
    mouseX < pokeX + pokeSize &&
    mouseY > pokeY &&
    mouseY < pokeY + pokeSize
  ) {
    pokeBeingDragged = true;
  }
}

function mouseDragged() {
  if (pokeBeingDragged) {
    pokeX = mouseX - pokeSize / 2;
    pokeY = mouseY - pokeSize / 2;
  }
}

function mouseReleased() {
  pokeBeingDragged = false;
  for (let chara of pokeCharas) {
    if (
      pokeX + pokeSize > chara.x &&
      pokeX < chara.x + chara.size &&
      pokeY + pokeSize > chara.y &&
      pokeY < chara.y + chara.size
    ) {
      chara.laserActive = true;
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

  for (let chara of pokeCharas) {
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

class pokeChara {
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
      rect(this.x + 5, this.y - 80, this.size + 40, 80);
      noStroke();
      fill(0);
      textFont("Verdana", 10);
      textAlign(CENTER, CENTER);
      text(this.text, this.x + this.size / 2 + 20, this.y - 40);
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
    fill('yellow');
    rect(this.x, 0, this.size, 1000);
  }
}
