import React, { Component } from 'react';
import { Container } from 'flux/utils';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import MapAction from '../actions/MapAction';
import CharacterAction from '../actions/CharacterAction';
import MapConfigStore from '../stores/MapConfigStore';
import CharacterConfigStore from '../stores/CharacterConfigStore';
import MapConfig from '../components/MapConfig';
import CharacterConfig from '../components/CharacterConfig';
import ConfigDialog from '../components/ConfigDialog';

/**
 * 画面統括
 */
class _Config extends Component {
  static getStores() {
    return [MapConfigStore, CharacterConfigStore];
  }

  static calculateState() {
    return {
      mapConfig: MapConfigStore.getState().toJS(),
      characterConfig: CharacterConfigStore.getState().toJS(),
    };
  }

  componentWillMount() {
    MapAction.listenConfig();
    CharacterAction.listenConfig();
    this.setState({ open: false });
  }

  render() {
    const { mapConfig } = this.state;
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
          label="Add Piece"
          secondary={true}
          onClick={() => MapAction.addPiece(mapConfig.size, mapConfig.color)}
          style={{ marginTop: 10, marginLeft: 10 }}
        />
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
          Config={MapConfig}
        />
        <ConfigDialog
          label="Add Character"
          config={this.state.characterConfig}
          setConfig={(newConfig) => CharacterAction.sendConfig(newConfig)}
          Config={CharacterConfig}
        />
      </div>
    );
  }
}
const Config = Container.create(_Config);
export default Config;