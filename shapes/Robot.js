// Simple class example

function Robot(posX, posY, ball, groundY, groundW) {
		this.x = posX;
		this.y = posY;
		this.groundY = groundY;
		this.groundW = groundW;
		this.velX = 0;
		this.velY = 0;
		this.accelX = 0;
		this.accelY = 0.5;
		this.color = "#999900";
		this.width = 200;
		this.height = 3;
		this.speed = 0;
		this.ball = ball
}

Robot.prototype.move = function() {
}

Robot.prototype.checkHit = function(player) {
	if (this.ball.y < this.groundY) return;
	if (this.ball.x < this.x - this.width || this.ball.x > this.x + this.width) return;
	this.ball.velY = -10 - Math.random() * 180;
	this.ball.velX = - Math.random() * 100;
}

//A function for drawing the particle.
Robot.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = this.color;
	theContext.fillRect(this.x - this.width, this.y - this.height, 2*this.width, 2*this.height);
}

Robot.prototype.XYtoR = function(dx, dy) {
	 return Math.atan2(dx, -dy) - 0.5 * Math.PI;
}