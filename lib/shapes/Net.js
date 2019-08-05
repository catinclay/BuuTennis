module.exports = class Net {
  constructor(posX, groundY, groundW) {
    this.x = posX;
    this.groundY = groundY;
    this.groundW = groundW;
    this.velX = 0;
    this.velY = 0;
    this.accelX = 0;
    this.accelY = 0.5;
    this.color = '#0000FF';
    this.width = 3;
    this.height = 100;
    this.y = groundY - this.height / 2;
    this.top = groundY - this.height;
    this.speed = 0;
  }

  checkHit(player) {
    // if (this.ball.y < this.groundY - this.height) return;
    // if (this.ball.x < this.x - this.width || this.ball.x > this.x + this.width) return;
    // this.ball.velY = -5 - Math.random() * 200;
    // this.ball.velX = - Math.random() * 100;
  }

  // A function for drawing the particle.
  drawToContext(theContext) {
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
