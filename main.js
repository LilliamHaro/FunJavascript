// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Shape(x,y,velX,velY,exists) {
	this.x=x;
	this.y=y;
	this.velX=velX;
	this.velY=velY;
	this.exists=exists;
}

function Ball(x,y,velX,velY,exists,color,size)
	Shape.call(this,x,y,velX,velY,exists)
{
	this.color=color;
	this.size=size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

function EvilCircle(x,y,exists,color,size,velX,velY)
Shape.call(this,x,y,exists)
{
	this.color =color;
	this.size =size;
	this.velX =velX;
	this.velY =velY;
}
EvilCircle.prototype=Object.create(Shape.prototype);
EvilCircle.constructor=EvilCircle;


EvilCircle.prototype.draw = function () {
	ctx.beginPath();
		ctx.strokeStyle=this.color;
		ctx.lineWidth=3;
		ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
		ctx.strock();
}

Ball.prototype.draw = function () {
		ctx.beginPath();
		ctx.fillStyle=this.color;
		ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
		ctx.fill();
}
EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x = -(this.size);
  }

  if ((this.x - this.size) <= 0) {
    this.x = -(this.size);
  }

  if ((this.y + this.size) >= height) {
    this.y = -(this.size);
  }

  if ((this.y - this.size) <= 0) {
    this.y = -(this.size);
  }
}

EvilCircle.prototype.setControls(){
var _this = this;
window.onkeydown = function(e) {
    if (e.keyCode === 65) {
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }
  }
}

EvilCircle.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (ball[i].exists) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = this.exists = false;
      }
    }
  }
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}


var balls=[];

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  var evilCircle = new EvilCircle(
  20,
  20,
  true,
  'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
  20,
  random(-7,7),
  random(-7,7)
  );
  
  while (balls.length < 25) {
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
	  true;
    );
    balls.push(ball);
  }

  for (var i = 0; i < balls.length; i++) {
	  if(ball[i].exists){
      balls[i].draw();
	  balls[i].update();
	  balls[i].collisionDetect();
	  }
  }

  requestAnimationFrame(loop);
}
loop();





