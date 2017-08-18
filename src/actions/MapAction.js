import AppDispatcher from '../dispatcher/AppDispatcher';
import { piecesRef, mapConfigRef } from '../firebase';

class MapAction {
  static createCells(xMax, yMax, size, color) {
    const cells = [];
    for (let x = 0; x < xMax; x++) {
      for (let y = 0; y < yMax; y++) {
        cells.push({
          x: x * size,
          y: y * size,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: 1,
        });
      } 
    }
    return cells;
  }

  static getRandomInt(max = 3, min = 0) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }

  static addPiece(size, color) {
    const x = this.getRandomInt();
    const y = this.getRandomInt();
    const piece = {
      x: x * size,
      y: y * size,
      width: size,
      height: size,
      fill: color,
      stroke: color,
      strokeWidth: 1,
    };
    piecesRef.push(piece)
  }

  static movePiece(value, piece) {
    console.log(value, piece);
    piece.x = value.x;
    piece.y = value.y;
    piecesRef.child(piece.id).set(piece);
  }

  static removePieces() {
    piecesRef.set({});
  }

  static selectPiece(piece) {
    console.log(piece);
    AppDispatcher.dispatch({
      type: 'set_selectPiece',
      piece,
    });
  }

  static listenPieces() {
    piecesRef.on('child_added', (snapshot) => this.setPiece(snapshot.key, snapshot.val()));
    piecesRef.on('child_changed', (snapshot) => this.setPiece(snapshot.key, snapshot.val()));
    piecesRef.on('child_removed', (snapshot) => this.removePiece(snapshot.key));
  }

  static setPiece(id, piece) {
    piece.id = id;
    AppDispatcher.dispatch({
      type: 'set_piece',
      piece,
    });
  }

  static removePiece(id) {
    AppDispatcher.dispatch({
      type: 'delete_piece',
      id,
    });
  }

  static listenConfig() {
    mapConfigRef.on('child_added', (snapshot) => this.setConfig(snapshot.val()));
    mapConfigRef.on('child_changed', (snapshot) => this.setConfig(snapshot.val()));
  }

  static sendConfig(config) {
    mapConfigRef.set({ 'map_config': config });
  }

  static setConfig(config) {
    const image = new Image();
    image.src = config.url;
    config.backImage = image;
    config.x = Number(config.x);
    config.y = Number(config.y);
    config.size = Number(config.size);
    AppDispatcher.dispatch({
      type: 'set_mapConfig',
      mapConfig: config,
    });
  }
}
export default MapAction;
