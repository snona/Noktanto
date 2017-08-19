import React, { Component } from 'react';
import { Container } from 'flux/utils';
import RaisedButton from 'material-ui/RaisedButton';

import MapAction from '../actions/MapAction';
import CharacterAction from '../actions/CharacterAction';
import MapConfigStore from '../stores/MapConfigStore';
import CharacterConfigStore from '../stores/CharacterConfigStore';
import PieceStore from '../stores/PieceStore';
import MapConfig from '../components/MapConfig';
import CharacterConfig from '../components/CharacterConfig';
import PieceConfig from '../components/PieceConfig';
import ConfigDialog from '../components/ConfigDialog';

/**
 * 画面統括
 */
class _Config extends Component {
  static getStores() {
    return [MapConfigStore, CharacterConfigStore, PieceStore];
  }

  static calculateState() {
    return {
      mapConfig: MapConfigStore.getState().toJS(),
      characterConfig: CharacterConfigStore.getState().toJS(),
      piece: PieceStore.getState().toJS(),
    };
  }

  componentWillMount() {
    MapAction.listenConfig();
    CharacterAction.listenConfig();
    this.setState({ open: false });
  }

  render() {
    const { mapConfig, characterConfig, piece } = this.state;
    const tmpMapConfig = {
      url: mapConfig.backImage.src,
      x: mapConfig.x,
      y: mapConfig.y,
      size: mapConfig.size,
      color: mapConfig.color,
    };
    return (
      <div>
        <RaisedButton
          label="Remove Pieces"
          primary={true}
          onClick={() => MapAction.removePieces()}
          style={{ marginTop: 10, marginLeft: 10 }}
        />
        <ConfigDialog
          label="Config Map"
          config={tmpMapConfig}
          setConfig={(newConfig) => MapAction.sendConfig(newConfig)}
          ConfigArea={MapConfig}
        />
        <ConfigDialog
          label="Add Character"
          config={characterConfig}
          setConfig={(newConfig) => CharacterAction.sendConfig(newConfig)}
          ConfigArea={CharacterConfig}
        />
        <ConfigDialog
          label="Add Piece"
          config={piece}
          setConfig={(newConfig) => MapAction.addPiece(newConfig)}
          ConfigArea={PieceConfig}
        />
      </div>
    );
  }
}
const Config = Container.create(_Config);
export default Config;