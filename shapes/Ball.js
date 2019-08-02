// Simple class example

function Ball(posX, posY, groundY, groundW) {
		this.x = posX;
		this.y = posY;
		this.groundY = groundY;
		this.groundW = groundW;
		this.velX = 0;
		this.velY = 0;
		this.accelX = 0;
		this.accelY = 0.5;
		this.color = "#FF0000";
		this.radius = 3;
		this.speed = 0;
}

Ball.prototype.move = function() {
	var signX = this.velX >= 0? 1: -1;
	this.resistanceX = signX*this.velX*this.velX*0.0045;
	this.velX -= this.resistanceX;
	var signY = this.velY >= 0? 1: -1;
	this.resistanceY = -1*signY*this.velY*this.velY*0.0045;
	this.velY += this.accelY + this.resistanceY;

	if (this.y + this.velY >= this.groundY) {
		this.x += this.velX;
		this.velX = 0;
		this.velY = 0;
		this.y = this.groundY;
	} else {
		this.x += this.velX;
		this.y += this.velY;
	}

	if (this.x + this.velX <= 5) {
		this.velX = 0;
		this.x = 5;
	} else if ( this.x +this.velX >= this.groundW - 5) {
		this.velX = 0;
		this.x = this.groundW - 5;
	}
}

Ball.prototype.checkHit = function(player) {
	var dx = this.x - player.x;
	var dy = this.y - player.y;
	var r = this.XYtoR(dx, dy);
	var dis2 = dx * dx + dy * dy; 
	return  dis2 <= (player.swingRange+25) * (player.swingRange+25) && dis2 >= 500 && Math.abs(r - player.swingR) <= 0.25 * Math.PI; 
}

Ball.prototype.hit = function(hit) {
	this.velX = Math.cos(hit.r) * hit.p * 10;
	// Apply some offset to make it feel better.
	var yOffset = this.velY >= 0? 20:10;
	this.velY = Math.sin(hit.r) * hit.p * yOffset;
}


//A function for drawing the particle.
Ball.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = this.color;
	theContext.fillRect(this.x - this.radius, this.y - this.radius, 2*this.radius, 2*this.radius);
}

Ball.prototype.XYtoR = function(dx, dy) {
	 return Math.atan2(dx, -dy) - 0.5 * Math.PI;
}