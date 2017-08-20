import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Text } from 'react-konva';

/**
 * マップ枠, 座標表示部品
 */
class Cell extends Component {
    render() {
      const { cell } = this.props;
      const fontSize = 10;
      return (
        <Group
          x={cell.x}
          y={cell.y}
        >
          <Rect
            x={0}
            y={0}
            width={cell.width}
            height={cell.height}
            stroke={cell.stroke}
            strokeWidth={cell.strokeWidth}
          />
          <Text
            x={0}
            y={0}
            text={cell.key}
            fontSize={fontSize}
            fontFamily={'Roboto'}
            fill={cell.stroke}
          />
        </Group>
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
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cell;