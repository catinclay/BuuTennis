module.exports = class HitLine {
  constructor(posX, posY) {
    this.color = '#000000';
    this.startX = posX;
    this.startY = posY;
    this.endX = posX;
    this.endY = posY;
    this.isSwinging = false;
  }

  startSwing(posX, posY) {
    this.isSwinging = true;
    this.updateStartPos(posX, posY);
  }

  updateStartPos(posX, posY) {
    this.startX = posX;
    this.startY = posY;
  }

  finishSwing(posX, posY) {
    this.isSwinging = false;
  }

  updateEndPos(posX, posY) {
    this.endX = posX;
    this.endY = posY;
  }

  // A function for drawing the particle.
  drawToContext(theContext) {
    if (!this.isSwinging) return;
    theContext.lineWidth = 3;
    theContext.strokeStyle = this.color;
    theContext.beginPath();

    theContext.moveTo(this.startX, this.startY);
    theContext.lineTo(this.endX, this.endY);
    theContext.stroke();
  }
};
