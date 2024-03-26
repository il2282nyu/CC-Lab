/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new ShinChan(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class ShinChan {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    //..
    //..
    //..
    this.leftassHeight = 44
    this.rightassHeight = 44
    this.leftLegX = 75;
    this.rightLegX = 120;

  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.leftassHeight = 50 + sin(frameCount * 0.5) * 20;
    this.rightassHeight = 50 + sin((frameCount + 30) * 0.5) * 20;
    this.x = 300 + cos(frameCount * 0.2) * 50;
    this.y = 300 + sin(frameCount * 0.2) * 50;

    this.leftLegX = 75 + cos(frameCount * 0.5) * 5;
    this.rightLegX = 120 + sin(frameCount * 0.5) * 5;
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    noStroke()
    //face
    fill(240, 203, 170)
    rect(120,55,55,35,50)
    fill(0)
    ellipse(120,70,60,60)
    
    fill(150, 6, 6)
    beginShape()
    vertex(175,76)
    vertex(165,79)
    vertex(155,76)
    vertex(162,82)
    vertex(170,84)
    endShape()

    //arm
    noStroke()
    fill(199, 8, 8)
    quad(65,95, 43,98, 45,106, 61,108)
    quad(145,95, 167,98, 165,106, 149,108);
    
    //hand
    fill(240, 203, 170)
    ellipse(40,101,10, 15)
    ellipse(170,101,10, 15)
    
    //ass
    noStroke()
    fill(255, 217, 0)
    arc(85,100,50,this.leftassHeight, PI, 0, CHORD)
    arc(125,100,50,this.rightassHeight, PI, 0, CHORD)
    ellipse(85,100,50,44)
    ellipse(125,100,50,44)
    quad(63,110, 106,110, 99, 122, 70,122)
    quad(105,110, 147,110, 142,122, 110,122)
    console.log(mouseX, mouseY)
    
    //leg
    fill(240, 203, 170)
    quad(this.leftLegX, 122, this.leftLegX + 15, 122, this.leftLegX + 12, 130, this.leftLegX - 3, 130);
    quad(this.rightLegX, 122, this.rightLegX + 15, 122, this.rightLegX + 18, 130, this.rightLegX + 3, 130);
    
    //socks
    fill(255)
    quad(this.leftLegX + 12, 130, this.leftLegX - 3, 130, this.leftLegX + 1, 142, this.leftLegX + 10, 142);
    quad(this.rightLegX + 18, 130, this.rightLegX + 3, 130, this.rightLegX + 4, 142, this.rightLegX + 13, 142);

    
    //shoe
    fill(255, 217, 0)
    quad(this.leftLegX + 1, 142, this.leftLegX + 10, 142, this.leftLegX + 12, 148, this.leftLegX - 10, 148);
    quad(this.rightLegX + 4, 142, this.rightLegX + 13, 142, this.rightLegX + 24, 148, this.rightLegX + 2, 148);


    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/