import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';
import RaisedButton from 'material-ui/RaisedButton';
import Hex from '../components/Hex';

class MapArea extends Component {
    render() {
      const { hexes, pieces, movePiece, addPiece } = this.props;
      const viewHexes = Object.keys(hexes).map(key => <Hex hex={hexes[key]} draggable={false} />);
      const viewPieces = Object.keys(pieces).map(key => (
        <Hex
          hex={pieces[key]}
          draggable={true}
          movePiece={(key, piece) => movePiece(pieces, key, piece)}
        />
      ));
      return (
        <div>
          <RaisedButton
            label="Add Piece"
            secondary={true}
            onClick={() => addPiece(pieces)}
          />
          <Stage width={700} height={700}>
            <Layer>
              {viewHexes}
            </Layer>
            <Layer>
              {viewPieces}
            </Layer>
          </Stage>
        </div>
      );
    }
}

MapArea.propTypes = {
  hexes: PropTypes.object.isRequired,
  pieces: PropTypes.object.isRequired,
  movePiece: PropTypes.func.isRequired,
  addPiece: PropTypes.func.isRequired,
};

export default MapArea;