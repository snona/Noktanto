import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';

import RectImage from '../components/RectImage';
import Cell from '../components/Cell';
import Piece from '../components/Piece';
import MapAction from '../actions/MapAction';
import PiecesStore from '../stores/PiecesStore';
import MapStore from '../stores/MapStore';

/**
 * マップ画面統括
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
    const { roomId } = this.props;
    console.log(roomId);
    MapAction.listenPieces(roomId); // マップ情報の自動読込み
  }

  componentWillUnmount() {
    const { roomId } = this.props;
    MapAction.unListenPieces(roomId);
  }

  /**
   * 背景画像を作成
   * @param {Map} map マップ設定情報
   * @return {node} 背景画像
   */
  _createBackImage(map) {
    return (
      <RectImage
        image={{
          x: 0, y: 0,
          width: map.cols * map.size,
          height: map.rows * map.size,
          src: map.url,
        }}
      />
    );
  }

  /**
   * 描画用枠を作成
   * @param {Map} map マップ設定情報
   * @return {node[]} 枠と座標テキスト群
   */
  _createViewCells(map) {
    // セル枠を作成
    const cells = MapAction.createCells(map.cols, map.rows, map.size, map.color);
    return cells.map(cell => (
      <Cell key={cell.key} cell={cell} />
    ));
  }

  /**
   * 描画用駒を作成
   * @param {pieces} pieces 駒一覧
   * @return {node[]} 描画用駒一覧
   */
  _createViewPieces(pieces) {
    return Object.keys(pieces).map(key => {
      const piece = pieces[key];
      return <Piece
        key={key}
        cell={piece}
        movePiece={(value) => MapAction.movePiece(value, piece)}
        selectPiece={(value) => MapAction.selectPiece(value, piece)}
      />
    });
  }

  render() {
    const { pieces, map } = this.state;
    const { layout } = this.props;

    const backImage = this._createBackImage(map);
    const viewCells = this._createViewCells(map);
    const viewPieces = this._createViewPieces(pieces);
    const width = layout.w - 40;
    const height = layout.h - 40;
    return (
      <div style={{ margin: 10 }}>
        <Stage width={width} height={height} draggable={true} onDragend={(v) => console.log(v.target.attrs) }>
          <Layer>
            {backImage}
          </Layer>
          <Layer>
            {viewCells}
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
  roomId: PropTypes.string.isRequired,
  layout: PropTypes.object.isRequired,
};
const Map = Container.create(_Map);
export default Map;