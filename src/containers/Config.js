import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import MapAction from '../actions/MapAction';
import CharacterAction from '../actions/CharacterAction';
import MapStore from '../stores/MapStore';
import CharacterStore from '../stores/CharacterStore';
import PieceStore from '../stores/PieceStore';
import MapConfig from '../components/MapConfig';
import CharacterConfig from '../components/CharacterConfig';
import PieceConfig from '../components/PieceConfig';
import ConfigDialog from '../components/ConfigDialog';

/**
 * 設定画面統括  
 * 現状開発用の画面置き場
 */
class _Config extends Component {
  static getStores() {
    return [MapStore, CharacterStore, PieceStore];
  }

  static calculateState() {
    return {
      map: MapStore.getState().toJS(),
      character: CharacterStore.getState().toJS(),
      piece: PieceStore.getState().toJS(),
    };
  }

  componentWillMount() {
    MapAction.listenConfig();
    CharacterAction.listenConfig();
    this.setState({ open: false });
  }

  render() {
    const { map, character, piece } = this.state;
    const { history } = this.props;
    return (
      <div>
        <RaisedButton
          label="Remove Pieces"
          primary={true}
          onClick={() => MapAction.removePieces()}
          style={{ marginTop: 10, marginLeft: 10 }}
        />
        {/* マップ設定画面 */}
        <ConfigDialog
          label="Config Map"
          config={map}
          setConfig={(newConfig) => MapAction.sendConfig(newConfig)}
          ConfigArea={MapConfig}
        />
        {/* キャラクタ設定画面 */}
        <ConfigDialog
          label="Add Character"
          config={character}
          setConfig={(newConfig) => CharacterAction.sendConfig(newConfig)}
          ConfigArea={CharacterConfig}
        />
        {/* 駒設定画面 */}
        <ConfigDialog
          label="Add Piece"
          config={piece}
          setConfig={(newConfig) => MapAction.addPiece(newConfig)}
          ConfigArea={PieceConfig}
        />
        <RaisedButton
          label="Go Rooms"
          onClick={() => history.push('/')}
          style={{ marginTop: 10, marginLeft: 10 }}
        />
      </div>
    );
  }
}
_Config.protoType = {
  history: PropTypes.object.isRequired,
};
const Config = Container.create(_Config);
export default Config;