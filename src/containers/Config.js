import React, { Component } from 'react';
import { Container } from 'flux/utils';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import MapAction from '../actions/MapAction';
import MapConfigStore from '../stores/MapConfigStore';
import MapConfig from '../components/MapConfig';
import ConfigDialog from '../components/ConfigDialog';

/**
 * 画面統括
 */
class _Config extends Component {
  static getStores() {
    return [MapConfigStore];
  }

  static calculateState() {
    return {
      mapConfig: MapConfigStore.getState().toJS(),
    };
  }

  componentWillMount() {
    MapAction.listenConfig();
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
          style={{ margin: 10 }}
        />
        <RaisedButton
          label="Remove Pieces"
          primary={true}
          onClick={() => MapAction.removePieces()}
          style={{ margin: 10 }}
        />
        <ConfigDialog
          config={tmpMapConfig}
          setConfig={(newConfig) => MapAction.sendConfig(newConfig)}
          Config={MapConfig}
        />
      </div>
    );
  }
}
const Config = Container.create(_Config);
export default Config;