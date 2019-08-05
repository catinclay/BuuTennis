module.exports = class Player {
  constructor(posX, posY, groundY, net) {
    this.net = net;
    this.x = posX;
    this.y = posY;
    this.velX = 0;
    this.velY = 0;
    this.accelX = 0;
    this.accelY = 0.5;
    this.color = '#FF0000';
    this.height = 40;
    this.width = 20;
    this.speed = 6;
    // The posY for the bottom of the player
    this.footHeight = groundY - this.height / 2;
    this.isMovingLeft = 0;
    this.isMovingRight = 0;

    this.swingR = 0;

    this.swingRangeColor = '#0000FF66';
    this.swingRange = 60;

    this.startSwingX = 0;
    this.startSwingY = 0;
    this.isSwinging = false;
  }

  startSwing(mosX, mosY) {
    this.isSwinging = true;
    this.startSwingX = mosX;
    this.startSwingY = mosY;
  }

  finishSwing(mosX, mosY) {
    this.isSwinging = false;
    const hit = {};
    const dx = mosX - this.startSwingX;
    const dy = mosY - this.startSwingY;
    hit.r = this.XYtoR(dx, dy);
    hit.p = Math.sqrt(dx * dx + dy * dy) / 50;
    return hit;
  }

  updateSwingArea(mosX, mosY) {
    if (this.isSwinging) return;
    this.swingR = this.XYtoR(mosX - this.x, mosY - this.y);
  }

  movingRight() {
    this.isMovingRight = 1;
  }

  movingLeft() {
    this.isMovingLeft = 1;
  }

  stopMovingRight() {
    this.isMovingRight = 0;
  }

  stopMovingLeft() {
    this.isMovingLeft = 0;
  }

  move() {
    const nextX =
      this.x + this.speed * (this.isMovingRight - this.isMovingLeft);
    const netLeft = this.net.x - this.width;
    this.x = nextX > netLeft ? netLeft : nextX;
    if (this.y + this.velY >= this.footHeight) {
      this.velY = 0;
      this.y = this.footHeight;
    } else {
      this.velY += this.accelY;
      this.y += this.velY;
    }
  }

  jump() {
    if (this.y >= this.footHeight) {
      this.velY = -10;
    }
  }

  // A function for drawing the particle.
  drawToContext(theContext) {
    theContext.beginPath();
    theContext.arc(
      this.x,
      this.y,
      this.swingRange,
      this.swingR - 0.25 * Math.PI,
      this.swingR + 0.25 * Math.PI,
      false
    );

    theContext.lineWidth = 40;
    theContext.strokeStyle = this.swingRangeColor;
    theContext.stroke();

    theContext.fillStyle = this.color;
    theContext.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }

  XYtoR(dx, dy) {
    return Math.atan2(dx, -dy) - 0.5 * Math.PI;
  }
};
