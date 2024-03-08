function setup() {
    let cnv = createCanvas(800, 500);
    cnv.id("p5Canvas")
    cnv.parent("p5Container")
    oriX = 50
    //frameRate(2)
    angleMode(DEGREES)
    numCreature = 1
    lenCreature = 800
    creatures = [];
    radi = 50;
    outer = radi + 50
    flash = 80
    outerFlash = 100
    r = 255
    b = 255
    txtX = width/2;
    txtY = height/2;
    binary = false
    //opa = random(100,400)
    currentPage = 0;
  }
  
  function draw() {
    if (currentPage === 0) {
      //Background and Objective
      pageOne();
    } else if (currentPage === 1) {
      //Controls and Gameplay
      pageTwo();
    } else if (currentPage === 2) {
      //Challenge
      pageThree();
    } else if (currentPage === 3) {
      //Start the game
      playGame();
    }
  }
  
  function mouseClicked() {
    if (currentPage < 3) {
      currentPage++;
    } else if (currentPage === 3) {
      playGame();
    }
  }
  
  function playGame() {
    background(0);
    warning();
    moveCreature();
    creature();
    flashlight();
    message();
    battery();
  }
  
  function keyPressed() {
    if (key === 's') {
      resetGame();
    }
  }
  
  function resetGame() {
    numCreature = 1;
    lenCreature = 800;
    creatures = [];
    radi = 50;
    outer = radi + 50;
    flash = 80;
    outerFlash = 100;
    r = 255;
    b = 255;
    txtX = (width / 2);
    txtY = height / 2;
    currentPage = 0; 
    frameCount = 0;
  }
  
  function pageOne() {
    // background information
    background(0)
    fill(255);
    textStyle(NORMAL)
    textAlign(CENTER, CENTER);
    fill(2, 204, 29)
    textFont('Courier New', 20);
    text("Welcome to Cognitron Infestation!", width / 2, height / 2 - 40);
    textSize(14);
    text("In the futuristic society dominated by AI and robots,", width / 2, height / 2);
    text("an alien invasion has unleashed computer virus creatures known as Cognitrons.", width / 2, height / 2 + 20);
    text("Your goal is to eliminate the Cognitron infestation using a special blue flashlight.", width / 2, height / 2 + 40);
    text("Click to continue...", width / 2, height - 40);
  }
  
  function pageTwo() {
    //controls and gameplay information
    background(0);
    fill(255);
    textFont('Courier New', 20);
    fill(2, 204, 29)
    textAlign(CENTER, CENTER);
    text("Controls and Gameplay", width / 2, height / 2 - 40);
    textSize(16);
    text("Arrow Keys (Up and Down): Adjust the power of the blue flashlight", width / 2, height / 2);
    text("As you increase in power, battery bars will increase.",width/2, height/2 + 20)
    text("Mouse Movement: Control the position of the flashlight on the screen.", width / 2, height / 2 + 40);
    text("'R' Key: Reset the flashlight to its default state.", width / 2, height / 2 + 60);
    text("'S' Key: Restart the game.", width / 2, height / 2 + 80);
    text("Full battery (5 bars) is the only way to kill off all Cognitrons.", width/2, height/2+100)
    text("Click to continue...", width / 2, height - 40);
  }
  
  function pageThree() {
    //challenge information
    background(0);
    fill(255);
    textSize(20);
    fill(2, 204, 29)
    textAlign(CENTER, CENTER);
    text("Challenge", width / 2, height / 2 - 40);
    textSize(14);
    text("As the number of Cognitrons grows, strategic use of the flashlight becomes crucial.", width / 2, height / 2);
    text("Manage the power wisely, watch out for warning symbols", width / 2, height / 2 + 20);
    text("and eliminate the invaders to reclaim control of the AI-dominated world.", width/2, height/2 + 40)
    text("Click to start the game...", width / 2, height - 40);
  }
  
  function warning(){
    if (numCreature < 2048){
      binaryBackground()
    }else if((numCreature >= 2048) && (radi >= 800)){
      binaryBackground()
    }else{ 
        if (frameCount % 10 ==0){
          background(184, 7, 31) 
      }else{
        //red binaryBackground
        binaryBackground()
        noStroke()
        background(0)
        fill(184, 7, 31)
        textFont('Courier New', 20);
        let binary = [0,1];
        //frameRate(2)
        for (z=0; z<=height; z+= 20){
          for (i=0; i<width; i += 20){
            if (z<0){
              z = width
            }else if(z>width){
              x = 0
            }
            text(str(binary[floor(random(0,2))]), i, z)
          }
        }           
      }
    }
  }
  
  function binaryBackground(){
    noStroke()
    textStyle(NORMAL)
    background(0)
    fill(2, 204, 29)
    textFont('Courier New', 20);
    let binary = [0,1];
    //frameRate(2)
    for (z=0; z<=height; z+= 20){
      for (i=0; i<width; i += 20){
        if (z<0){
          z = width
        }else if(z>width){
          x = 0
        }
        text(str(binary[floor(random(0,2))]), i, z)
      }
    }
  }
  
  function moveCreature() {
    for (let i = 0; i < numCreature; i++) {
      if (!creatures[i]) {
        //If the creature doesn't exist, create it with a random position
        creatures[i] = {x: random(width), y: random(height),}
      }
  
      xSpeed = random(-10, 10)
      ySpeed = random(-10, 10)
      creatures[i].x = creatures[i].x + xSpeed
      creatures[i].y = creatures[i].y + ySpeed
  
      creatures[i].x = constrain(creatures[i].x, 5, width-20)
      creatures[i].y = constrain(creatures[i].y, 5, height-20)
    }
  }
  
  function creature() {
    stroke(r, 255, b);
    strokeWeight(5);
  
    for (let i = 0; i < numCreature; i++) {
      let distanceFlashlight = dist(
        creatures[i].x,creatures[i].y,
        mouseX,mouseY
      );
      let flashlightRadius = outer;
      if (distanceFlashlight > flashlightRadius) {
        push();
        translate(creatures[i].x, creatures[i].y);
  
        for (let j = 0; j <= lenCreature; j += 10) {
          let z = random(-20, 20);
          line(j, 20 - z, j, 30 + z);
        }
  
        pop();
      }
    }
  
    if (frameCount % 200 == 0 && lenCreature >= 0.2) {
      numCreature *= 2;
      lenCreature /= 2;
      r -= 30
      b -= 30
    }
    
    
    push()
    if (numCreature >= 2048 && (radi < 800)) {
    // warning symbol
    let warningAlpha = random(10, 400);
  
    fill(255, 188, 5, warningAlpha);
    stroke(255, 188, 5);
    strokeWeight(2);
    // outer tri
    triangle((width / 2), (height / 2) - 80,
      (width / 2) - 80, (height / 2) + 80,
      (width / 2) + 80, (height / 2) + 80);
    fill(255, 255, 255, warningAlpha);
    strokeWeight(0);
    // inner tri
    triangle((width / 2), (height / 2) - 50,
      (width / 2) - 50, (height / 2) + 60,
      (width / 2) + 50, (height / 2) + 60);
    fill(0, 0, 0, warningAlpha);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 10, 10, 40);
    rect(width / 2, height / 2 + 40, 10, 10);
    }
    pop()
    
    //console.log(frameCount, numCreature, lenCreature, radi, r, b);
  }
  
  function flashlight(){
    opa = random(100,400)
    noStroke()
    fill(0,0,flash)
    circle(mouseX, mouseY, radi);
    fill(0,0,outerFlash,opa)
    circle(mouseX, mouseY, outer)
    fill(255)
    rect(0,0, 50,30,5,5,5,5)
    //HELP
    if (keyIsPressed && key == 'ArrowUp'){
      //console.log('UP_ARROW pressed');
      radi += 0.8
      flash += 0.5
      //opa -= 0.1
      outer += 1.2
      outerFlash += 0.5
    }
    if (keyIsPressed && key == 'ArrowDown'){
      //console.log('UP_ARROW pressed');
      radi -= 0.8
      flash -= 0.5
      //opa -= 0.1
      outer -= 1.2
      outerFlash -= 0.5
    }
    if (radi > 1000){
      radi = 50
      flash = 10
      outer = radi + 50
      outerFlash = 100
    }
    if (radi >= 800 && numCreature == 4096){
      numCreature = 0
    }
    if (keyIsPressed && (key == "r" || key == 'R')){
      flash = 10
      radi = 50
      outer = radi + 50
      outerFlash = 100
    }
  }
  
  function message(){
    if (numCreature == 0){
      background(255)
      fill(0, 0, 255);
      textStyle(BOLD);
      textFont('Courier New', 50);
      text("Congratulation!", txtX, txtY - 50);
      textSize(30)
      text("The creatures are all extinguished", txtX, txtY)
      radi = -1
      textFont('Courier New', 30);
      text("To restart game press 's'", txtX, txtY + 50)
    }
    if (numCreature == 4096 && radi < 800){
      background(0)
      fill(255, 0, 0);
      textStyle(BOLD);
      textFont('Courier New', 50);
      text("IT'S MINE NOW!", txtX, txtY);
      radi = -1
      textFont('Courier New', 30);
      text("To restart game press 's'", txtX, txtY + 50)
    }
  }
  
  function battery(){
    noStroke()
    translate(2,-2)
    if (radi >= 0 && radi <= 200){
      fill(245, 164, 2)
      rect(5, 25, 5, 5)
    }
    if (radi > 200 && radi <= 400){
      fill(5, 209, 2)
      rect(5, 25, 5, 5)
      rect(12, 20, 5, 10)
    }
    if (radi > 400 && radi <= 600){
      fill(200, 222, 0)
      rect(5, 25, 5, 5)
      rect(12, 20, 5, 10)
      rect(19, 15, 5, 15)
    }
    if (radi > 600 && radi <= 800){
      fill(107, 130, 4)
      rect(5, 25, 5, 5)
      rect(12, 20, 5, 10)
      rect(19, 15, 5, 15)
      rect(26, 10, 5, 20)
    }
    if (radi > 800 && radi <= 950){
      fill(4, 130, 10)
      rect(5, 25, 5, 5)
      rect(12, 20, 5, 10)
      rect(19, 15, 5, 15)
      rect(26, 10, 5, 20)
      rect(33, 5, 5, 25)
    }
    if (radi > 950 && radi <= 1000){
      if (frameCount % 10 == 0) {
        fill(0);
        rect(5, 25, 5, 5)
        rect(12, 20, 5, 10)
        rect(19, 15, 5, 15)
        rect(26, 10, 5, 20)
        rect(33, 5, 5, 25)
      } else {
        fill(230, 0, 0);
        rect(5, 25, 5, 5)
        rect(12, 20, 5, 10)
        rect(19, 15, 5, 15)
        rect(26, 10, 5, 20)
        rect(33, 5, 5, 25)
      }
    }
  }
  