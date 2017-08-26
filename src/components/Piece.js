import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Group, Rect, Text } from 'react-konva';

import RectImage from '../components/RectImage';

/**
 * マップ表示用駒部品
 */
class Piece extends Component {
  
  _createImage(cell) {
    if (cell.url === undefined) {
      return (
        <Rect
          x={0}
          y={0}
          width={cell.width}
          height={cell.height}
          fill={'#FAFAFA'}
          stroke={'#263238'}
          strokeWidth={cell.strokeWidth}
        />
      );
    }

    const image = {
      x: 0,
      y: 0,
      width: cell.width,
      height: cell.height,
      src: cell.url,
    }
    return (
      <RectImage
        image={image}
      />
    );
  }

  _createName(cell) {
    if (cell.name === undefined) {
      return null;
    }

    const fontSize = 12;
    return (
      <Group>
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

  _movePiece = (value) => {
    const { movePiece } = this.props;
    movePiece(value.target.attrs);
  };

  _selectPiece = () => {
    const { selectPiece } = this.props;
    selectPiece(true);
  };

  _doubleClick = (value) => {
    const { selectPiece } = this.props;
    selectPiece(false);
  };

  render() {
    const { cell  } = this.props;
    const image = this._createImage(cell);
    const name = this._createName(cell);
    return (
      <Group
        x={cell.x}
        y={cell.y}
        draggable={true}
        onDragend={this._movePiece}
        onClick={this._selectPiece}
        onDoubleClick={this._doubleClick}
      >
        {image}
        {name}
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
    name: PropTypes.string,
    url: PropTypes.string,
    strokeWidth: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  movePiece: PropTypes.func.isRequired,
  selectPiece: PropTypes.func.isRequired,
};

export default Piece;