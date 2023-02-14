let player;
let enemies;
let bullets;
let score;
let timer = 60;
let interval;
function setup() {
  createCanvas(800, 800);
  player = new Player();
  enemies = [];
  bullets = [];
  score = 0;

//add a timer
//let timer = 60;
//let interval;
let interval = setInterval(timeIt, 1000);

function timeIt(){
if (timer > 0){
  timer --;
 } else {
      clearInterval(interval);
      text("Game Over",400,400);
    }
  }
  setInterval(function() {
    enemies.push(new Enemy());
  }, 1000); // add a new enemy every 1000 milliseconds (1 second)
}

function draw() {
  background(0);

  player.update();
  player.show();

  // display score
  textSize(30)
  fill(255);
  text(`Score: ${score}`, 10, 30);
 // text(timer, width-50, 30);
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].show();
  }

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
    bullets[i].show();
  }

  checkCollisions();
  handleInput();
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) {
    player.move(-1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.move(1);
  }

  if (keyIsDown(32)) { // space bar
    let bullet = new Bullet(player.x, player.y);
    bullets.push(bullet);
  }
}

function checkCollisions() {  
  for (let i = 0; i < enemies.length; i++) {
    for (let j = 0; j < bullets.length; j++) {
      if (enemies[i].hits(bullets[j])) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        score++;
        print(score)
      }
    }
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 20;
    this.width = 20;
    this.height = 20;
  }

  update() {
    // handle player movement
  }

  show() {
    fill(255);
    rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  move(dir) {
    this.x += dir * 5;
  }
}

class Enemy {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.speed = random(2, 5);
    this.width = 20;
    this.height = 20;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  hits(bullet) {
    let d = dist(this.x, this.y, bullet.x, bullet.y);
    return d < this.width / 2 + bullet.width / 2;
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = -10;
    this.width = 5;
    this.height = 5;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255);
    rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
}

  