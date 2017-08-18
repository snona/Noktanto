import AppDispatcher from '../dispatcher/AppDispatcher';
import { piecesRef } from '../firebase';

class MapAction {
  static radius = 15;

  static createCells(xMax, yMax, size, color) {
    const cells = [];
    for (let x = 0; x < xMax; x++) {
      for (let y = 0; y < yMax; y++) {
        cells.push({
          x: x,
          y: y,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: 1,
        });
      } 
    }
    return cells;
  }

  static getRandomInt(max = 3, min = -3) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
  }

  static addPiece(pieces) {
    const radius = this.radius;
    const strokeWidth = 2;
    const x = this.getRandomInt();
    const y = this.getRandomInt();
    const z = this.getRandomInt();
    const key = `moveable-${this.createKey({ x, y, z })}`;
    pieces[key] = {
      radius,
      strokeWidth,
      drawX: (x - y) * 0.866 * (radius + strokeWidth) + this.maxAround * this.radius * 2.5,
      drawY: z * 1.5 * (radius + strokeWidth) + this.maxAround * this.radius * 2,
      color: { fill: '#3498db', stroke: '#2980b9' },
      key,
    };
    piecesRef.push(pieces)
  }

  static movePiece(pieces, key, piece) {
    pieces[key].drawX = piece.x;
    pieces[key].drawY = piece.y;
    piecesRef.push(pieces)
  }

  static listenPieces() {
    piecesRef.on('child_added', (snapshot) => this.setPieces(snapshot.val()));
  }

  static setPieces(pieces) {
    AppDispatcher.dispatch({
      type: 'set_pieces',
      pieces,
    });
  }

  static setConfig(config) {
    const image = new Image();
    image.src = config.url;
    config.backImage = image
    AppDispatcher.dispatch({
      type: 'set_mapConfig',
      mapConfig: config,
    });
  }
}
export default MapAction;
