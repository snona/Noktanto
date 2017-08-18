import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

import SelectColorField from '../components/SelectColorField';

class MapConfig extends Component {
  render() {
    const { config, setConfig } = this.props;
    console.log(config);
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
          floatingLabelText="X"
          style={{ width: 50, marginRight: 10 }}
          value={config.x}
          onChange={(e, v) => setConfig({ x: v })}
        />
        <TextField
          floatingLabelText="Y"
          style={{ width: 50, marginRight: 10 }}
          value={config.y}
          onChange={(e, v) => setConfig({ y: v })}
        />
        <TextField
          floatingLabelText="Size"
          style={{ width: 50, marginRight: 10 }}
          value={config.size}
          onChange={(e, v) => setConfig({ size: v })}
        />
        <SelectColorField
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