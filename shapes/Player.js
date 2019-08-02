// Simple class example

function Player(posX, posY, groundY) {
		this.x = posX;
		this.y = posY;
		this.groundY = groundY;
		this.velX = 0;
		this.velY = 0;
		this.accelX = 0;
		this.accelY = 0;
		this.color = "#FF0000";
		this.height = 20;
		this.width = 10;
		this.speed = 6;
		// 0 = no, -1 = left, 1 = right
		this.direction = 0;

		this.swingR = 0;

		this.swingRangeColor = "#0000FF66"
		this.swingRange = 60;

		this.startSwingX = 0;
		this.startSwingY = 0;
		this.isSwinging = false;
}


Player.prototype.startSwing = function(mosX, mosY) {
	this.isSwinging = true;
	this.startSwingX = mosX;
	this.startSwingY = mosY;
}

Player.prototype.finishSwing = function(mosX, mosY) {
	this.isSwinging = false;
	var hit = {};
	var dx = mosX - this.startSwingX;
	var dy = mosY - this.startSwingY;
	hit.r = this.XYtoR(dx, dy);
	hit.p = Math.sqrt(dx*dx+dy*dy)/75;
	return hit;
}

Player.prototype.updateSwingArea = function(mosX, mosY) {
	if (this.isSwinging) return;
	this.swingR = this.XYtoR(mosX - this.x, mosY - this.y);
}

Player.prototype.faceRight = function() {
	this.direction = 1;
}

Player.prototype.faceLeft = function() {
	this.direction = -1;
}

Player.prototype.faceMiddle = function() {
	this.direction = 0;
}

Player.prototype.move = function() {
	this.x += this.speed * this.direction;
}

//A function for drawing the particle.
Player.prototype.drawToContext = function(theContext) {
	theContext.beginPath();
	theContext.arc(this.x, this.y, this.swingRange, this.swingR - 0.25 * Math.PI, this.swingR + 0.25 * Math.PI, false);

	theContext.lineWidth = 40;
	theContext.strokeStyle = this.swingRangeColor;
	theContext.stroke();

	theContext.fillStyle = this.color;
	theContext.fillRect(this.x - this.width, this.y - this.height, 2*this.width, 2*this.height);
}

Player.prototype.XYtoR = function(dx, dy) {
	 return Math.atan2(dx, -dy) - 0.5 * Math.PI;
}
