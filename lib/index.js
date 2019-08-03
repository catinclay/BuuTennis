const Game = require('./Game');
const GameEngine = require('./GameEngine');
const ImageManager = require('./ImageManager');
const SoundManager = require('./SoundManager');

const game = new Game();
const gameEngine = new GameEngine();
const imageManager = new ImageManager();
const soundManager = new SoundManager();
gameEngine.init(game, imageManager, soundManager, 30);

soundManager.registerSound({
  name: 'failedSound',
  src: 'sounds/failedSound.mp3',
});

const loadPromises = [
  imageManager.registerImage({
    name: 'flightImage',
    src: 'image/flightIcon.png',
  }),
];

Promise.all(loadPromises).then(gameEngine.start());
