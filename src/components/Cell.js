import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rect, Text } from 'react-konva';

class Cell extends Component {
    render() {
      const { cell } = this.props;
      return (
        <Rect
          x={cell.x * cell.width}
          y={cell.y * cell.height}
          width={cell.width}
          height={cell.height}
          stroke={cell.stroke}
          strokeWidth={cell.strokeWidth}
        />
      );
    }
}

Cell.propTypes = {
  cell: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
  }).isRequired,
};

export default Cell;