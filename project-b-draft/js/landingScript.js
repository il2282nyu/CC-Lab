function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("canvasContainer");
  background(220);
}

function draw() {
  background(220);
  
  //face
  fill(240, 203, 170)
  ellipse(140,70,70,45)
  fill(0)
  ellipse(120,70,60,60)
  
  beginShape()
  curveVertex(175, 76)
  curveVertex(165, 79)
  curveVertex(155, 76)
  curveVertex(162, 82)
  curveVertex(168, 84)
  curveVertex(175, 76)
  endShape()
  
  //arm
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
  ellipse(85,100,50,44)
  ellipse(125,100,50,44)
  quad(63,110, 106,110, 99, 122, 70,122)
  quad(105,110, 147,110, 142,122, 110,122)
  console.log(mouseX, mouseY)
  
  //leg
  fill(240, 203, 170)
  leftLeg = quad(75,122, 90,122, 87,130, 72,130) 
  rightRight = quad(120,122, 135,122, 138,130, 123,130);
  
  
  //socks
  fill(255)
  leftAnk = quad(87,130, 72,130, 76,142, 85,142)
  rightAnk = quad(138,130, 123,130, 124,142, 133,142)
  
  //shoe
  fill(255, 217, 0)
  leftShoe = quad(76,142, 85,142, 87,148, 65,148)
  rightShoe = quad(124,142, 133,142, 144,148, 122,148)
  

}