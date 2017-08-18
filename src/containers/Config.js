import React, { Component } from 'react';
import { Container } from 'flux/utils';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import MapAction from '../actions/MapAction';
import MapConfigStore from '../stores/MapConfigStore';
import MapConfig from '../components/MapConfig';

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
    // MapAction.listenConfig();
    const { mapConfig } = this.state;
    const tmpMapConfig = {
      url: mapConfig.backImage.src,
      x: mapConfig.x,
      y: mapConfig.y,
      size: mapConfig.size,
      color: mapConfig.color,
    };
    this.setState({ open: false, tmpMapConfig });
  }

  _setTmpConfig(newConfig, tmpConfig) {
    const obj = {};
    Object.keys(tmpConfig).forEach(key => {
      obj[key] = newConfig[key] !== undefined ? newConfig[key] : tmpConfig[key];
    })
    return obj;
  }

  render() {
    const { mapConfig, tmpMapConfig } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={() => this.setState({ open: false })}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={() => { MapAction.setConfig(tmpMapConfig); this.setState({ open: false }) }}
      />,
    ];
    return (
      <div style={{ margin: 10 }}>
        <RaisedButton
          label="Map Config"
          primary={true}
          onClick={() => this.setState({ open: true })}
        />
        <Dialog
          title="Map Config"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          autoScrollBodyContent={true}
        >
          <MapConfig
            config={tmpMapConfig}
            setConfig={(newConfig) => { console.log(newConfig); this.setState({ tmpMapConfig: this._setTmpConfig(newConfig, tmpMapConfig) })}}
          />
        </Dialog>
      </div>
    );
  }
}
const Config = Container.create(_Config);
export default Config;