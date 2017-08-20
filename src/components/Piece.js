import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Text } from 'react-konva';

import RectImage from '../components/RectImage';

/**
 * マップ表示用駒部品
 */
class Piece extends Component {
    render() {
      const { cell, movePiece, selectPiece } = this.props;
      const fontSize = 12;
      const image = {
        x: 0,
        y: 0,
        width: cell.width,
        height: cell.height,
        src: cell.url,
      }
      return (
        <Group
          x={cell.x}
          y={cell.y}
          draggable={true}
          onDragend={(v) => movePiece(v.target.attrs) }
          onClick={() => selectPiece(true)}
          onDoubleClick={(v) => { console.log(v.target.attrs); selectPiece(false); } }
        >
          {/* 画像 */}
          <RectImage
            image={image}
          />
          {/* 名前枠 */}
          <Rect
            x={0}
            y={-10}
            width={cell.width}
            height={14}
            fill={'#FAFAFA'}
            stroke={'#263238'}
            strokeWidth={cell.strokeWidth}
          />
          {/* 名前 */}
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
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  movePiece: PropTypes.func.isRequired,
  selectPiece: PropTypes.func.isRequired,
};

export default Piece;