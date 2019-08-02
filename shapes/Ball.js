// Simple class example

function Ball(posX, posY, groundY, groundW, net) {
		this.net = net;
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
	// Compute resistence.
	var signX = this.velX >= 0? 1: -1;
	this.resistanceX = signX*this.velX*this.velX*0.0045;
	this.velX -= this.resistanceX;
	var signY = this.velY >= 0? 1: -1;
	this.resistanceY = -1*signY*this.velY*this.velY*0.0045;
	this.velY += this.accelY + this.resistanceY;

	// TODO: using nextX and nextY for clean code.
	var nextX = this.x + this.velX;
	var nextY = this.y + this.velY;

	// TODO: maybe move to Net class
	// Check net collision. Only check if velX != 0;
	if (this.velX != 0)
		if ((this.x - this.net.x) * (nextX - this.net.x) < 0) {
			// did crossing net on x-axis, now check if touch net on y-axis.
			var dx = this.net.x - this.x;
			var dy = this.velY * dx / this.velX;
			if (this.y + dy >= this.net.top) {
				// did cross net on y-axis.
				this.velX = 0;
				this.x = this.net.x + (this.x < this.net.x ? -this.radius : this.radius);
			}
		} 

	// Check if ball is on the ground.
	if (this.y + this.velY >= this.groundY) {
		this.x += this.velX;
		this.velX = 0;
		this.velY = 0;
		this.y = this.groundY;
	} else {
		this.x += this.velX;
		this.y += this.velY;
	}

	// Check court boundary.
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