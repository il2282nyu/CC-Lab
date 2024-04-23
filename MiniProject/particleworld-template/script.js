// CCLab Mini Project - 9.R Particle World Template
let NUM_OF_PARTICLES = 1200; // Decide the initial number of particles.

let particles = [];
let isMouseClicked = false;
function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(0);
  // update and display
  if (isMouseClicked) {
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.update();
      p.display();
    }
  }

  fill('green');
  noStroke();
  rect(0, height-30, width, 30);
  for (let i=0; i<width+10; i+=50){
    triangle(i,481, i-25, 600, i+25, 600);
  }
  for (let i=25; i<width+10; i+=50){
    triangle(i,490,i-25, 600, i+25, 600);
  }
}

function mouseClicked() {
  if (mouseY > 490) {
    particles = [];
    for (let i = 0; i < NUM_OF_PARTICLES; i++) {
      particles.push(new Particle(random(width), height - 30)); 
    }
    isMouseClicked = true;
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(3,10);
    this.xSpd = random(-1,1)
    this.ySpd = random(-3,-1)
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    this.x += this.xSpd;
    this.y += this.ySpd
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    fill(255,215,0,random(100));
    circle(0,0,this.dia+10);
    fill('gold');
    circle(0, 0, this.dia);

    pop();
  }
}
