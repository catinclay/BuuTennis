module.exports = class Robot {
  constructor(posX, posY, ball, groundY, groundW, net) {
    this.x = posX;
    this.y = posY;
    this.groundY = groundY;
    this.groundW = groundW;
    this.velX = 0;
    this.velY = 0;
    this.accelX = 0;
    this.accelY = 0.5;
    this.color = '#999900';
    this.width = 200;
    this.height = 3;
    this.speed = 0;
    this.ball = ball;
    this.net = net;
  }

  move() {
    //
  }

  checkHit(player) {
    if (this.ball.y < this.groundY) return;
    if (this.ball.x < this.x - this.width || this.ball.x > this.x + this.width)
      return;
    if (this.ball.x - this.net.x < 10) {
      // Too close to net, hit back.
      this.ball.velY = -10 - Math.random() * 180;
      this.ball.velX = Math.random() * 20;
    } else {
      this.ball.velY = -10 - Math.random() * 180;
      this.ball.velX = -Math.random() * 100;
    }
  }

  // A function for drawing the particle.
  drawToContext(theContext) {
    theContext.fillStyle = this.color;
    theContext.fillRect(
      this.x - this.width,
      this.y - this.height,
      2 * this.width,
      2 * this.height
    );
  }

  XYtoR(dx, dy) {
    return Math.atan2(dx, -dy) - 0.5 * Math.PI;
  }
};
