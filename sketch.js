const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 1000;
const lineColor = [0, 0, 0];
const activeLineColor = [230, 246, 250];
const lineWidth = 2;
const activelineWidth = 2;
const sounds = Array.from({ length: 2 });


const leftEdge = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 1000,
  color: lineColor,
  width: lineWidth,
}

const rightEdge = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 1000,
  color: lineColor,
  width: lineWidth,
}

let droplet;
let dropletAnim;
let rain;
let rainAnim;
let chihuahua;
let chihuahuaAnim;
let cat;
let poop;
let poopAnim;

function preload() {
  const dropletSpritesheet = loadSpriteSheet("img/droplet copy 2.png", 60, 68, 12);
  dropletAnim = loadAnimation(dropletSpritesheet);
  droplet = createSprite(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 60, 68);
  droplet.moveSpeed = 5;
  const rainSpritesheet = loadSpriteSheet("img/rain.png", 1000, 2000, 24);
  rainAnim = loadAnimation(rainSpritesheet);
  rain = createSprite(500, 1000, 0, 0);
  rain.moveSpeed = 1;
  const chihuahuaSpritesheet = loadSpriteSheet("img/chihuahua.png", 36, 36, 4);
  chihuahuaAnim = loadAnimation(chihuahuaSpritesheet);
  chihuahua = createSprite(100, 100, 36, 36);
  chihuahua.moveSpeed = 1;
  const poopSpritesheet = loadSpriteSheet("img/poop.png", 36, 36, 5);
  poopAnim = loadAnimation(poopSpritesheet);
  poop = createSprite(200, 100, 36, 36);
  poop.moveSpeed = 1;
  cat = loadImage("img/cat.png");

  sounds.forEach((sound, i) => {
    sounds[i] = loadSound(`sounds/${i}.mp3`)
  })

console.log(sounds);

rain.rightSound = sounds[0];
rain.leftSound = sounds[1];


}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  rain.addAnimation(rainAnim);
  droplet.addAnimation("move", dropletAnim);
  chihuahua.addAnimation(chihuahuaAnim);
  poop.addAnimation(poopAnim);
  rain.setDefaultCollider();
  droplet.setDefaultCollider();
  chihuahua.setDefaultCollider();
  poop.setDefaultCollider();


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
  drawSprite(chihuahua);
  drawSprite(poop);
}

function draw() {
  

  animation(rainAnim, 0, 0);

  update(droplet);

  update(chihuahua);

  update(poop);

  image(cat, 200, 200);

  drawLine(leftEdge);
  drawLine(rightEdge);
}



function drawLine({x1, y1, x2, y2, color, width}){
  stroke(color);
  strokeWeight(width);
  line(x1, y1, x2, y2);
}



function activateLine(line){

  line.color = activeLineColor;
  line.width = activelineWidth;

  setTimeout(() => resetLines(line), 500);
}


function resetLines(line){
  line.color = lineColor;
  line.width = lineWidth;
}