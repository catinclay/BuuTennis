// Simple class example

function HitLine(posX, posY) {
	this.color = "#000000"
	this.startX = posX;
	this.startY = posY;
	this.endX = posX;
	this.endY = posY;
	this.isSwinging = false;
}

HitLine.prototype.startSwing = function(posX, posY) {
	this.isSwinging = true;
	this.updateStartPos(posX, posY);
}

HitLine.prototype.updateStartPos = function(posX, posY) {
	this.startX = posX;
	this.startY = posY;
}

HitLine.prototype.finishSwing = function(posX, posY) {
	this.isSwinging = false;
}

HitLine.prototype.updateEndPos = function(posX, posY) {
	this.endX = posX;
	this.endY = posY;
}

//A function for drawing the particle.
HitLine.prototype.drawToContext = function(theContext) {
	if (!this.isSwinging) return;
	theContext.lineWidth = 3;
	theContext.strokeStyle = this.color;
	theContext.beginPath();

	theContext.moveTo(this.startX, this.startY);
	theContext.lineTo(this.endX, this.endY);
	theContext.stroke();
}
