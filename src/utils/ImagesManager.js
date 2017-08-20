class ImagesManager {
  static images = {};

  static hasImage(src) {
    return this.images[src] !== undefined;
  }

  static getImage(src) {
    return this.images[src];
  }

  static addImage(src) {
    const image = new Image();
    image.src = src;
    this.images[src] = image;
    return image; 
  }
}
export default ImagesManager;