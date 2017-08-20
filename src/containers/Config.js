import React, { Component } from 'react';
import { Container } from 'flux/utils';
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
 * 画面統括
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
          config={map}
          setConfig={(newConfig) => MapAction.sendConfig(newConfig)}
          ConfigArea={MapConfig}
        />
        <ConfigDialog
          label="Add Character"
          config={character}
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