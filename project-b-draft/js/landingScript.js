let imgShinchan;
let gifPichu;
let gifKoro;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("canvasContainer");
  background(220);
  imgShinchan = loadImage("./assets/shinchan.gif");
  gifPichu = loadImage("./assets/pichu.gif");
  gifKoro = loadImage("./assets/Koromon.gif");
  x = 0;

}

function draw() {
  background(220);
  image(imgShinchan, 300, 220, 120, 180);

  if(gifPichu.getCurrentFrame() === 22){
    gifPichu.setFrame(0);
  }

  if (gifKoro.getCurrentFrame() === 22){
    gifKoro.setFrame(0);
  }

  image(gifKoro, 0, 245, 180, 170);

  image(gifPichu,x, 305, 180,100);
  if (x > 600){
    x = 0;
  }else{
    x += 1;
  }
}