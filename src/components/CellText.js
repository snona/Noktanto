import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rect, Text } from 'react-konva';

class CellText extends Component {
    render() {
      const { cell } = this.props;
      const fontSize = 10;
      return (
        <Text
          x={cell.x * cell.width}
          y={cell.y * cell.height}
          text={`${cell.x}-${cell.y}`}
          fontSize={fontSize}
          fontFamily={'Roboto'}
          fill={cell.stroke}
        />
      );
    }
}

CellText.propTypes = {
  cell: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
  }).isRequired,
};

export default CellText;