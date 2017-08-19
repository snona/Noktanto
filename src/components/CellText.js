import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-konva';

class CellText extends Component {
    render() {
      const { cell } = this.props;
      const fontSize = 10;
      return (
        <Text
          x={cell.x}
          y={cell.y}
          text={`${cell.x/cell.width}-${cell.y/cell.height}`}
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