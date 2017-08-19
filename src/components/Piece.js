import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Text } from 'react-konva';

class Piece extends Component {
    render() {
      const { cell, movePiece, selectPiece } = this.props;
      const fontSize = 10;
      return (
        <Group
          x={cell.x}
          y={cell.y}
          draggable={true}
          onDragend={(v) => movePiece(v.target.attrs) }
          onClick={() => selectPiece()}
        >
          <Rect
            x={0}
            y={0}
            width={cell.width}
            height={cell.height}
            fill={cell.fill}
            stroke={cell.select ? '#263238' : '#263238'}
            strokeWidth={cell.strokeWidth}
          />
          <Text
            x={0}
            y={0}
            text={cell.id}
            fontSize={fontSize}
            fontFamily={'Roboto'}
            fill={'#263238'}
          />
        </Group>
      );
    }
}

Piece.propTypes = {
  cell: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,
    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  movePiece: PropTypes.func.isRequired,
  selectPiece: PropTypes.func.isRequired,
};

export default Piece;