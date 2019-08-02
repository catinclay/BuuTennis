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
	this.hitLine = new HitLine(0, 0);
	this.drawables.push(this.hitLine);
	this.drawables.push(this.player);
	this.drawables.push(this.ball);
}

Game.prototype.update = function() {
	this.player.move();
	this.ball.move();
}

Game.prototype.getDrawables = function() {
	return this.drawables;
}

Game.prototype.keyDownListener = function(key) {
	switch(key) {
		case 'A':
		case 'a':
			this.player.faceLeft();
			break;
		case 'D':
		case 'd':
			this.player.faceRight();
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
			this.player.faceLeft();
			break;
		case 'D':
		case 'd':
			this.player.faceRight();
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
		case 'D':
		case 'd':
			this.player.faceMiddle();
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