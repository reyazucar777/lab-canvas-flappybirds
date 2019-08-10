var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pipes = [];
var gravity = 3;
var interval;
var frames = 0;
var score = 0;

class Flappy{
  constructor(){
    this.x = 100;
    this.y = 40;
    this.width = 30;
    this.height = 30;
    this.image = new Image ();
    this.image.src = "./images/flappy.png";
  }
  collision(item){
    return (this.x < item.x + item.width)&&
    (this.x + this.width > item.x) &&
    (this.y < item.y + item.height) &&
    (this.y + this.height > item.y);
  }
  rise(){
    this.y -= 60;
  }
  draw(){
    if (this.y < canvas.height - 30) this.y += gravity;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Pipe{
  constructor(pos, y, height){
    this.x = canvas.width;
    this.y = y;
    this.width = 30;
    this. height = height;
    this.image = new Image ();
    this.image.src = pos === "top" ? "./images/obstacle_top.png" : "./images/obstacle_bottom.png";
  }
  draw(){
    this.x -= 4;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Background{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image ();
    this.image.src = "./images/bg.png"
  }
  gameOver(){
    ctx.font = "30px Avenir";
    ctx.fillText("Game Over", 300, 190);
    ctx. font = "20px Avnir";
    ctx.fillText("Press 'esc' to play again", 300, 230);
    clearInterval(interval);
    interval = undefined;
  }
  draw(){
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + canvas.width, this.y, this.width, this.height);
  }
}

var flappy = new Flappy();
var background = new Background();

function generatePipe(){
  if (!(frames % 60 === 0)) return;
  let height = Math.floor((Math.random() * canvas. height * 0.6) + 30);
  let pipe1 = new Pipe ("top", 0, height);
  let pipe2 = new Pipe (null, height + 120, canvas.height - 120 - height)
  pipes.push(pipe1);
  pipes.push(pipe2);
}

function drawPipe(){
  pipes.forEach((pipe, index) => {
    if (pipe.x < -30) {
      score ++;
      return pipes.splice(index, 1)
    }
    pipe.draw();
    if (flappy.collision(pipe)){
      background.gameOver();
    }
  })
}

function update(){
    frames ++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    flappy.draw();
    ctx.font = "20px Avenir";
    ctx.fillText(score/2, 10, 30);
    generatePipe();
    drawPipe();
  }

function start(){
  interval = setInterval(update, 1000/60);
}

function restart(){
  if (interval !== undefined) return;
  score = 0;
  frames = 0;
  interval = undefined;
  pipes = [];  
  start();
}

addEventListener("keydown", function(e){
  if(e.keyCode === 32){
    flappy.rise();
  }
  if(e.keyCode === 27){
    restart();
  }
})

start();

/*window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    start();
  };
}*/