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

function preload() {
  const dropletSpritesheet = loadSpriteSheet("img/droplet copy 2.png", 60, 68, 12);
  dropletAnim = loadAnimation(dropletSpritesheet);
  droplet = createSprite(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 60, 68);
  droplet.moveSpeed = 5;
  const rainSpritesheet = loadSpriteSheet("img/rain.png", 1000, 2000, 24);
  rainAnim = loadAnimation(rainSpritesheet);
  rain = createSprite(1000, 2000, 0, 0);
  rain.moveSpeed = 1;

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
  rain.setDefaultCollider();
  droplet.setDefaultCollider();


}

function update(object) {
  if (keyDown("up") || keyDown("down") || keyDown("left") || keyDown("right")) {
    if (keyDown("up")) {
      object.addSpeed(2, 270);
    }
    if (keyDown("down")) {
      object.addSpeed(2, 90);
    }
    if (keyDown("left")) {
      object.addSpeed(2, 180);
      object.mirrorX(-1);
    }
    if (keyDown("right")) {
      object.addSpeed(2, 0);
      object.mirrorX(1);
    }
  } else {
    object.setSpeed(0);
  }
  drawObject(object);
}


function drawObject(object) {
  if (object.getSpeed() > 0.0001) {
    object.changeAnimation("move");
  } else {
    object.changeImage("still");
  }
  droplet.limitSpeed(droplet.moveSpeed);
  drawSprite(object);
}

function draw() {

  animation(rainAnim, 0, 0);

  update(droplet);

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