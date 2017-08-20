/**
 * 画像管理
 */
class ImagesManager {
  // 管理中画像一覧
  static images = {};

  /**
   * 管理中画像一覧にscrの画像が含まれるか
   * @param {string} src 検索対象URL
   * @return {bool} 管理済みか?
   */
  static hasImage(src) {
    return this.images[src] !== undefined;
  }

  /**
   * 管理中画像一覧からscrの画像を取得  
   * 未登録の場合は、管理に追加
   * @param {string} src 対象URL
   * @return {Image} 対象のImageオブジェクト
   */
  static getImage(src) {
    return this.hasImage(src) ? this.images[src] : this.addImage(src);
  }

  /**
   * 管理中画像一覧にscrの画像を追加
   * @param {string} src 対象URL
   * @return {Image} 対象のImageオブジェクト
   */
  static addImage(src) {
    const image = new Image();
    image.src = src;
    this.images[src] = image;
    return image; 
  }
}
export default ImagesManager;