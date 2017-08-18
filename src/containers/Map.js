import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';
import RaisedButton from 'material-ui/RaisedButton';

import Hex from '../components/Hex';
import RectImage from '../components/RectImage';
import Cell from '../components/Cell';
import CellText from '../components/CellText';
import MapAction from '../actions/MapAction';
import PiecesStore from '../stores/PiecesStore';

/**
 * 画面統括
 */
class _Map extends Component {
  static getStores() {
    return [PiecesStore];
  }

  static calculateState() {
    return {
      pieces: PiecesStore.getState().toJS(),
    };
  }

  componentWillMount() {
    MapAction.initHexes();
    MapAction.listenPieces();
  }

  render() {
    const { pieces } = this.state;
    const { layout } = this.props;
    const viewPieces = Object.keys(pieces).map(key => (
      <Hex
        hex={pieces[key]}
        draggable={true}
        movePiece={(key, piece) => MapAction.movePiece(pieces, key, piece)}
      />
    ));
    const cells = MapAction.createCells(12);
    const viewCells = cells.map(cell => (
      <Cell cell={cell} />
    ));
    const viewTexts = cells.map(cell => (
      <CellText cell={cell} />
    ));
    const img = new Image();
    img.src = 'http://www.wtrpg9.com/trpg/image/material/map01.jpg';
    return (
      <div style={{ margin: 10 }}>
        {/* <RaisedButton
          label="Add Piece"
          secondary={true}
          onClick={() => MapAction.addPiece(pieces)}
        /> */}
        <Stage width={layout.w - 40} height={layout.h - 40} draggable={true} >
          <Layer>
            <RectImage
              image={{
                x: 0,
                y: 0,
                width: 12*30,
                height: 12*30,
                src: img,
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