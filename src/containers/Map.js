import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';

import Piece from '../components/Piece';
import RectImage from '../components/RectImage';
import Cell from '../components/Cell';
import CellText from '../components/CellText';
import MapAction from '../actions/MapAction';
import PiecesStore from '../stores/PiecesStore';
import MapStore from '../stores/MapStore';

/**
 * 画面統括
 */
class _Map extends Component {
  static getStores() {
    return [PiecesStore, MapStore];
  }

  static calculateState() {
    return {
      pieces: PiecesStore.getState().toJS(),
      map: MapStore.getState().toJS(),
    };
  }

  componentWillMount() {
    MapAction.listenPieces();
  }

  render() {
    const { pieces, map } = this.state;
    const { layout } = this.props;
    const cells = MapAction.createCells(map.x, map.y, map.size, map.color);
    const viewCells = cells.map(cell => (
      <Cell cell={cell} />
    ));
    const viewTexts = cells.map(cell => (
      <CellText cell={cell} />
    ));
    const viewPieces = Object.keys(pieces).map(key => {
      const piece = pieces[key];
      return <Piece
        cell={piece}
        movePiece={(value) => MapAction.movePiece(value, piece)}
        selectPiece={() => MapAction.selectPiece(piece)}
      />
    });
    return (
      <div style={{ margin: 10 }}>
        <Stage width={layout.w - 40} height={layout.h - 40} draggable={true} >
          <Layer>
            <RectImage
              image={{
                x: 0, y: 0,
                width: map.x * map.size,
                height: map.y * map.size,
                src: map.url,
              }}
            />
          </Layer>
          <Layer>
            {viewCells}
          </Layer>
          <Layer>
            {viewTexts}
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