const { Net, Player, Ball, Robot, HitLine } = require('./shapes');

module.exports = class Game {
  init(canvasWidth, canvasHeight, imageManager, soundManager) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.drawables = [];
    this.imageManager = imageManager;
    this.soundManager = soundManager;
    const groundY = 420;

    this.net = new Net(400, groundY, canvasWidth);
    this.player = new Player(200, 0, groundY, this.net);
    this.ball = new Ball(300, 0, groundY, canvasWidth, this.net);
    this.robot = new Robot(
      600,
      groundY,
      this.ball,
      groundY,
      canvasWidth,
      this.net
    );
    this.hitLine = new HitLine(0, 0);
    this.drawables.push(this.hitLine);
    this.drawables.push(this.player);
    this.drawables.push(this.robot);
    this.drawables.push(this.ball);
    this.drawables.push(this.net);
  }

  update() {
    this.player.move();
    this.ball.move();
    this.robot.checkHit();
  }

  getDrawables() {
    return this.drawables;
  }

  keyDownListener(key) {
    switch (key) {
      case 'A':
      case 'a':
        this.player.movingLeft();
        break;
      case 'D':
      case 'd':
        this.player.movingRight();
        break;
      case 'W':
      case 'w':
        this.player.jump();
        break;
      default:
        break;
    }
  }

  keyPressListener(key) {
    switch (key) {
      case 'A':
      case 'a':
        this.player.movingLeft();
        break;
      case 'D':
      case 'd':
        this.player.movingRight();
        break;
      case 'W':
      case 'w':
        this.player.jump();
        break;
      default:
        break;
    }
  }

  keyUpListener(key) {
    switch (key) {
      case 'A':
      case 'a':
        this.player.stopMovingLeft();
        break;
      case 'D':
      case 'd':
        this.player.stopMovingRight();
        break;
      default:
        break;
    }
  }

  inputDownListener(touchX, touchY) {
    this.player.startSwing(touchX, touchY);
    this.hitLine.startSwing(touchX, touchY);
  }

  inputMoveListener(touchX, touchY) {
    this.player.updateSwingArea(touchX, touchY);
    this.hitLine.updateEndPos(touchX, touchY);
  }

  inputUpListener(touchX, touchY) {
    const isHit = this.ball.checkHit(this.player);
    const hit = this.player.finishSwing(touchX, touchY);
    if (isHit) this.ball.hit(hit);
    this.hitLine.finishSwing();
  }
};
