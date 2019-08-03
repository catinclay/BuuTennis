module.exports = class ImageManager {
  constructor() {
    this.images = {};
  }

  get(imageName) {
    return this.images[imageName];
  }

  registerImage(image) {
    this.images[image.name] = new Image();
    const thisImage = this.images[image.name];
    thisImage.src = image.src;
    return new Promise((resolve, reject) => {
      thisImage.onload = resolve;
      thisImage.onerror = reject;
    });
  }
};
