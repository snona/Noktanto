import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RegularPolygon } from 'react-konva';

class Hex extends Component {
    render() {
      const { hex, draggable, movePiece } = this.props;
      const { drawX, drawY, radius, strokeWidth, color, key } = hex;
      return (
        <RegularPolygon
          x={drawX}
          y={drawY}
          sides={6}
          radius={radius}
          fill={color.fill}
          stroke={color.stroke}
          strokeWidth={strokeWidth}
          key={key}
          draggable={draggable}
          onDragend={(v) => {if (draggable) movePiece(key, v.target.attrs)}}
        />
      );
    }
}

Hex.propTypes = {
  hex: PropTypes.shape({
    drawX: PropTypes.number.isRequired,
    drawY: PropTypes.number.isRequired,
    color: PropTypes.shape({
      fill: PropTypes.string.isRequired,
      stroke: PropTypes.string.isRequired,
    }).isRequired,
    radius: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
  draggable: PropTypes.bool.isRequired,
  movePiece: PropTypes.func,
};

export default Hex;