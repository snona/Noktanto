import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import { Layer, Stage, Image } from 'react-konva';
import RaisedButton from 'material-ui/RaisedButton';

import Hex from '../components/Hex';

import MapAction from '../actions/MapAction';

import HexesStore from '../stores/HexesStore';
import PiecesStore from '../stores/PiecesStore';

/**
 * 画面統括
 */
class _Map extends Component {
  static getStores() {
    return [HexesStore, PiecesStore];
  }

  static calculateState() {
    return {
      hexes: HexesStore.getState().toJS(),
      pieces: PiecesStore.getState().toJS(),
    };
  }

  componentWillMount() {
    MapAction.initHexes();
    MapAction.listenPieces();
  }

  render() {
    const { hexes, pieces } = this.state;
    const { layout } = this.props;
    const viewHexes = Object.keys(hexes).map(key => <Hex hex={hexes[key]} draggable={false} />);
    const viewPieces = Object.keys(pieces).map(key => (
      <Hex
        hex={pieces[key]}
        draggable={true}
        movePiece={(key, piece) => MapAction.movePiece(pieces, key, piece)}
      />
    ));
    return (
      <div>
        <RaisedButton
          label="Add Piece"
          secondary={true}
          onClick={() => MapAction.addPiece(pieces)}
        />
        <Stage width={layout.w - 20} height={layout.h - 40}>
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
_Map.protoType = {
  layout: PropTypes.object.isRequired,
};
const Map = Container.create(_Map);
export default Map;