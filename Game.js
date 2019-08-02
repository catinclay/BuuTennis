function Game(){}

Game.prototype.init = function(canvasWidth, canvasHeight, imageManager, soundManager){
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.drawables = [];
	this.imageManager = imageManager;
	this.soundManager = soundManager;
	var groundY = 420;
	this.player = new Player(200, 0, groundY);
	this.ball = new Ball(300, 0, groundY, canvasWidth);
	this.net = new Net(400, this.ball, groundY, canvasWidth);
	this.robot = new Robot(600, groundY, this.ball, groundY, canvasWidth);
	this.hitLine = new HitLine(0, 0);
	this.drawables.push(this.hitLine);
	this.drawables.push(this.player);
	this.drawables.push(this.robot);
	this.drawables.push(this.ball);
	this.drawables.push(this.net);
}

Game.prototype.update = function() {
	this.player.move();
	this.ball.move();
	this.robot.checkHit();
}

Game.prototype.getDrawables = function() {
	return this.drawables;
}

Game.prototype.keyDownListener = function(key) {
	switch(key) {
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

Game.prototype.keyPressListener = function(key) {
	switch(key) {
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

Game.prototype.keyUpListener = function(key) {
	switch(key) {
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

Game.prototype.inputDownListener = function(touchX, touchY) {
	this.player.startSwing(touchX, touchY);
	this.hitLine.startSwing(touchX, touchY);
}

Game.prototype.inputMoveListener = function(touchX, touchY) {
	this.player.updateSwingArea(touchX, touchY);
	this.hitLine.updateEndPos(touchX, touchY);
}

Game.prototype.inputUpListener = function(touchX, touchY) {
	var isHit = this.ball.checkHit(this.player);
	var hit = this.player.finishSwing(touchX, touchY);
	if (isHit) this.ball.hit(hit);
	this.hitLine.finishSwing();
}