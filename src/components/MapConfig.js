import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import SelectColor from '../components/SelectColor';

/**
 * マップ設定部品
 */
class MapConfig extends Component {
  render() {
    const { config, setConfig } = this.props;
    return (
      <div style={{ margin: 10 }} >
        <div>
          <TextField
            floatingLabelText="Image URL"
            style={{ width: 550 }}
            value={config.url}
            onChange={(e, v) => setConfig({ url: v })}
          />
        </div>
        <TextField
          floatingLabelText="Cols"
          style={{ width: 50, marginRight: 10 }}
          value={config.cols}
          onChange={(e, v) => setConfig({ cols: Number(v) })}
        />
        <TextField
          floatingLabelText="Rows"
          style={{ width: 50, marginRight: 10 }}
          value={config.rows}
          onChange={(e, v) => setConfig({ rows: Number(v) })}
        />
        <TextField
          floatingLabelText="Size"
          style={{ width: 50, marginRight: 10 }}
          value={config.size}
          onChange={(e, v) => setConfig({ size: Number(v) })}
        />
        <SelectColor
          selectedColor={config.color}
          selectColor={(color) => setConfig({ color })}
        />
      </div>
    )
  }
}
MapConfig.protoType = {
  setConfig: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};
export default MapConfig;