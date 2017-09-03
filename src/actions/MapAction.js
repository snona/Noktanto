import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { piecesRef, configsRef } from '../firebase';

/**
 * マップに関する操作
 */
class MapAction {

  /**
   * 枠線一覧の作成
   * @param {number} cols 横の枠数
   * @param {number} rows 縦の枠数
   * @param {number} size 幅
   * @param {string} color 線の色
   * @return {Object[]} 枠線一覧
   */
  static createCells(cols, rows, size, color) {
    const cells = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        cells.push({
          x: x * size,
          y: y * size,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: 1,
          size,
          key: `${x}-${y}`,
        });
      } 
    }
    return cells;
  }

  /**
   * 乱数(整数)を返す
   * @param {number} [max=3] 発生乱数の最大値
   * @param {number} [min=0] 発生乱数の最小値
   */
  static _getRandomInt(max = 3, min = 0) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }

  /**
   * 駒を追加
   * @param {Object} config 追加駒情報
   */
  static addPiece(roomId, config) {
    const x = this._getRandomInt();
    const y = this._getRandomInt();
    const size = config.size;
    const piece = {
      x: x * size,
      y: y * size,
      width: size,
      height: size,
      strokeWidth: 1,
      size: size,
      name: config.name,
      url: config.url,
    };
    piecesRef.child(roomId).push(piece)
  }

  /**
   * 駒の移動情報を登録
   * @param {Object} value 移動先配置情報
   * @param {Object} piece 移動する駒
   */
  static movePiece(roomId, value, piece) {
    console.log(piece);
    piece.x = this._roundOff(value.x, piece.size);
    piece.y = this._roundOff(value.y, piece.size);
    piece.move = piece.move ? false : true;
    piecesRef.child(`${roomId}/${piece.id}`).set(piece);
  }

  /**
   * 対象に対して四捨五入し親しい方の値を計算
   * @param {number} target 対象の値
   * @param {number} size 四捨五入する値の幅
   */
  static _roundOff(target, size) {
    const rest = target % size;
    if ( rest > size / 2) {
      return target - rest + size;
    }
    return target - rest;
  }

  /**
   * 駒を全削除
   */
  static removePieces(roomId) {
    piecesRef.child(roomId).set({});
  }

  /**
   * 駒の選択
   * @param {Object} piece 選択された駒
   */
  static selectPiece(isSelect, piece) {
    AppDispatcher.dispatch({
      type: ActionTypes.Piece.SET,
      piece,
    });
  }

  /**
   * 駒情報の自動取得を設定
   */
  static listenPieces(roomId) {
    this._initPieces();
    piecesRef.child(roomId).on('child_added', (snapshot) => this._setPiece(snapshot.key, snapshot.val()));
    piecesRef.child(roomId).on('child_changed', (snapshot) => this._setPiece(snapshot.key, snapshot.val()));
    piecesRef.child(roomId).on('child_removed', (snapshot) => this._removePiece(snapshot.key));
  }

  static unListenPieces(roomId) {
    piecesRef.child(roomId).off();
  }

  static _initPieces() {
    AppDispatcher.dispatch({
      type: ActionTypes.Pieces.INIT,
    });
  }

  /**
   * 駒情報をStoreに格納
   * @param {string} id 格納する駒のID
   * @param {Object} piece 格納する駒
   */
  static _setPiece(id, piece) {
    piece.id = id;
    AppDispatcher.dispatch({
      type: ActionTypes.Pieces.ADD,
      piece,
    });
  }

  /**
   * Storeから駒を削除
   * @param {string} id 削除対象の駒ID
   */
  static _removePiece(id) {
    AppDispatcher.dispatch({
      type: ActionTypes.Pieces.REMOVE,
      id,
    });
  }

  /**
   * 設定情報を自動取得
   */
  static listenConfig(roomId) {
    this._initConfig();
    configsRef.child(`${roomId}/mapConfig`).on('value', (snapshot) => this._setConfig(snapshot.val()));
  }

  static unListenConfig(roomId) {
    configsRef.child(`${roomId}/mapConfig`).off();
  }

  static _initConfig() {
    AppDispatcher.dispatch({
      type: ActionTypes.Map.INIT,
    });
  }

  /**
   * 設定情報を保存
   * @param {Object} config マップの設定情報
   */
  static sendConfig(roomId, config) {
    configsRef.child(roomId).set({ 'mapConfig': config });
  }

  /**
   * 設定情報を設定
   * @param {Object} config マップの設定情報
   */
  static _setConfig(config) {
    if (config !== null) {
      AppDispatcher.dispatch({
        type: ActionTypes.Map.SET,
        map: config,
      });
    }
  }
}
export default MapAction;
