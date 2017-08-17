import AppDispatcher from '../dispatcher/AppDispatcher';

class MapAction {
  static maxAround = 5;
  static radius = 15;

  static createAround(max) {
    const round = [];
    const min = max * -1;
    for (let z = min; z <= max; z++) {
      for (let x = min; x <= max; x++) {
        const y = (x + z) * -1;
        if (min <= y && max >= y) {
          round.push({ x, y, z });
        }
      } 
    }
    return round;
  }

  static initAroundHexes() {
    const hexes = {};
    this.createAround(this.maxAround).forEach(({ x, y, z }) => {
      const radius = this.radius;
      const strokeWidth = 2;
      const drawX = (x - y) * 0.866 * (radius + strokeWidth) + this.maxAround * this.radius * 2.5;
      const drawY = z * 1.5 * (radius + strokeWidth) + this.maxAround * this.radius * 2;
      const key = this.createKey({ x, y, z });
      const color = { fill: '#e74c3c', stroke: '#c0392b' };
      hexes[key] = {
        x, y, z,
        radius, strokeWidth,
        drawX, drawY,
        color,
        key,
      };
    });
    return hexes;
  }

  static initHexes() {
    const hexes = this.initAroundHexes();
    AppDispatcher.dispatch({
      type: 'set_hexes',
      hexes,
    });
  }

  static getAround(hex) {
    return this.createAround(1).map(({ x, y, z }) => ({
      x: hex.x + x,
      y: hex.y + y,
      z: hex.z + z,
    }));
  }

  static createKey({ x, y, z }) {
    return `(${x}, ${y}, ${z})`;
  }

  static initPieces() {
    const radius = this.radius;
    const strokeWidth = 2;
    const pieces = {
      'moveable1': {
        radius,
        strokeWidth,
        drawX: (0 - 0) * 0.866 * (radius + strokeWidth) + this.maxAround * this.radius * 2.5,
        drawY: 0 * 1.5 * (radius + strokeWidth) + this.maxAround * this.radius * 2,
        color: { fill: '#3498db', stroke: '#2980b9' },
        key: 'moveable1',
      },
      'moveable2': {
        radius,
        strokeWidth,
        drawX: (1 - 1) * 0.866 * (radius + strokeWidth) + this.maxAround * this.radius * 2.5,
        drawY: 1 * 1.5 * (radius + strokeWidth) + this.maxAround * this.radius * 2,
        color: { fill: '#2ecc71', stroke: '#27ae60' },
        key: 'moveable2',
      },
      'moveable3': {
        radius,
        strokeWidth,
        drawX: (3 - 1) * 0.866 * (radius + strokeWidth) + this.maxAround * this.radius * 2.5,
        drawY: 3 * 1.5 * (radius + strokeWidth) + this.maxAround * this.radius * 2,
        color: { fill: '#f1c40f', stroke: '#f39c12' },
        key: 'moveable3',
      },
    };
    AppDispatcher.dispatch({
      type: 'set_pieces',
      pieces,
    });
  }

  static movePiece(pieces, key, piece) {
    pieces[key].drawX = piece.x;
    pieces[key].drawY = piece.y;
    AppDispatcher.dispatch({
      type: 'set_pieces',
      pieces,
    });
  }
}
export default MapAction;
