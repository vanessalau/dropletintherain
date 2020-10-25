const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 800;



let droplet;
let dropletAnim;
let rain;
let chihuahua;
let chihuahuaAnim;
let cat;
let poop;
let poopAnim;

function preload() {
  const dropletSpritesheet = loadSpriteSheet('img/droplet copy 2.png', 60, 68, 12);
  dropletAnim = loadAnimation(dropletSpritesheet);
  droplet = createSprite(CANVAS_WIDTH / 2, 650, 60, 68);
  droplet.moveSpeed = 2;

  rain = loadAnimation('img/rain/sprite_00.png','img/rain/sprite_23.png');

  chihuahua = loadAnimation('img/chihuahua/chichi0.png','img/chihuahua/chichi3.png');

  poop = loadAnimation('img/poop/poop0.png','img/poop/poop4.png');

  cat = loadImage("img/cat.png");

}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  droplet.addAnimation("move", dropletAnim);
  droplet.setDefaultCollider();




}

function update(droplet) {
  if (keyDown("up") || keyDown("down") || keyDown("left") || keyDown("right")) {
    if (keyDown("up")) {
      droplet.addSpeed(2, 270);
    }
    if (keyDown("down")) {
      droplet.addSpeed(2, 90);
    }
    if (keyDown("left")) {
      droplet.addSpeed(2, 180);
      droplet.mirrorX(-1);
    }
    if (keyDown("right")) {
      droplet.addSpeed(2, 0);
      droplet.mirrorX(1);
    }
  } else {
    droplet.setSpeed(0);
  }
  drawObject(droplet);
}


function drawObject(object) {

  droplet.limitSpeed(droplet.moveSpeed);
  drawSprite(droplet);
}

function draw() {

  animation(rain, 0, 0);

  update(droplet);

  animation(chihuahua, 100, 100);
//  for (var i = 0; i < this.chihuahua.length; i++)
//  this.chihuahua[i].start(Math.random() * 5);

  animation(poop, 400, 100);

  image(cat, 200, 100);

//everything stops when i do this
//  droplet.collide(cat)
   

}










