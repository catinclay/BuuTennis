module.exports = class SoundManager {
  constructor() {
    this.sounds = {};
  }

  registerSound(sound) {
    this.sounds[sound.name] = new Audio(sound.src);
  }

  play(sound) {
    this.sounds[sound].play();
  }
};
