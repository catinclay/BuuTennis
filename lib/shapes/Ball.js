module.exports = class Ball {
  constructor(posX, posY, groundY, groundW, net) {
    this.net = net;
    this.x = posX;
    this.y = posY;
    this.groundY = groundY;
    this.groundW = groundW;
    this.velX = 0;
    this.velY = 0;
    this.accelX = 0;
    this.accelY = 1;
    this.color = '#FF0000';
    this.radius = 3;
    this.speed = 0;
  }

  move() {
    // Compute resistence.
    // const signX = this.velX >= 0 ? 1 : -1;
    // this.resistanceX = signX * this.velX * this.velX * 0.0045;
    // this.velX -= this.resistanceX;
    // const signY = this.velY >= 0 ? 1 : -1;
    // this.resistanceY = -1 * signY * this.velY * this.velY * 0.0045;
    // this.velY += this.accelY + this.resistanceY;

    // TODO: using nextX and nextY for clean code.
    // const nextX = this.x + this.velX;
    // const nextY = this.y + this.velY;

    // Compute resistence and next position with magic
    const k = 0.0065;
    const signX = this.velX >= 0 ? 1 : -1;
    const absX = Math.abs(this.velX);

    const nextX = this.x + 1 / k * Math.log(1+k*this.velX);
    this.velX = signX * 1 / ((1/absX) + k);

    const signY = this.velY >= 0 ? 1 : -1;
    const absY = Math.abs(this.velY);

    const nextY = this.y + 1 / k * Math.log(1+k*this.velY);
    this.velY = signY * 1 / ((1/absY) + k) + this.accelY;

    // TODO: maybe move to Net class
    // Check net collision. Only check if velX != 0;
    if (this.velX != 0)
      if ((this.x - this.net.x) * (nextX - this.net.x) < 0) {
        // did crossing net on x-axis, now check if touch net on y-axis.
        const dx = this.net.x - this.x;
        const dy = (this.velY * dx) / this.velX;
        if (this.y + dy >= this.net.top) {
          // did cross net on y-axis.
          this.velX = 0;
          this.x =
            this.net.x + (this.x < this.net.x ? -this.radius : this.radius);
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
    } else if (this.x + this.velX >= this.groundW - 5) {
      this.velX = 0;
      this.x = this.groundW - 5;
    }
  }

  checkHit(player) {
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const r = this.XYtoR(dx, dy);
    const dis2 = dx * dx + dy * dy;
    return (
      dis2 <= (player.swingRange + 25) * (player.swingRange + 25) &&
      dis2 >= 500 &&
      Math.abs(r - player.swingR) <= 0.25 * Math.PI
    );
  }

  hit(hit) {
    const powerGap = 3000;
    const power = hit.p <= powerGap ? Math.sqrt(hit.p) * 1 : Math.sqrt(hit.p) * 2 + Math.sqrt(hit.p-powerGap)*2;
    this.velX = Math.cos(hit.r) * power;
    var yOffset = this.velY > 0? 1.25 : 1;
    this.velY = Math.sin(hit.r) * power * yOffset;
  }

  // A function for drawing the particle.
  drawToContext(theContext) {
    theContext.fillStyle = this.color;
    theContext.fillRect(
      this.x - this.radius,
      this.y - this.radius,
      2 * this.radius,
      2 * this.radius
    );
  }

  XYtoR(dx, dy) {
    return Math.atan2(dx, -dy) - 0.5 * Math.PI;
  }
};
