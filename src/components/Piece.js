import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Text } from 'react-konva';

import RectImage from '../components/RectImage';

class Piece extends Component {
    render() {
      const { cell, movePiece, selectPiece } = this.props;
      const fontSize = 12;
      const src = new Image();
      src.src = cell.url;
      const image = {
        x: 0,
        y: 0,
        width: cell.width,
        height: cell.width,
        src,
      }
      return (
        <Group
          x={cell.x}
          y={cell.y}
          draggable={true}
          onDragend={(v) => movePiece(v.target.attrs) }
          onClick={() => selectPiece()}
        >
          <RectImage
            image={image}
          />
          <Rect
            x={0}
            y={-10}
            width={cell.width}
            height={14}
            fill={'#FAFAFA'}
            stroke={'#263238'}
            strokeWidth={cell.strokeWidth}
          />
          <Text
            x={0}
            y={-10}
            text={cell.name}
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
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  movePiece: PropTypes.func.isRequired,
  selectPiece: PropTypes.func.isRequired,
};

export default Piece;