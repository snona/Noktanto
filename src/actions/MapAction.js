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

  static initHexes() {
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
}
export default MapAction;
