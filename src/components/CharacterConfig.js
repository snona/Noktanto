import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import SelectColorField from '../components/SelectColorField';

class CharacterConfig extends Component {
  render() {
    const { config, setConfig } = this.props;
    console.log(config);
    return (
      <div style={{ margin: 10 }} >
        <div>
          <TextField
            floatingLabelText="Name"
            style={{ width: 150 }}
            value={config.name}
            onChange={(e, v) => setConfig({ name: v })}
          />
        </div>
        <SelectColorField
          selectedColor={config.color}
          selectColor={(color) => setConfig({ color })}
        />
        <TextField
          floatingLabelText="Avatar URL"
          style={{ width: 350 }}
          value={config.url}
          onChange={(e, v) => setConfig({ url: v })}
        />
      </div>
    )
  }
}
CharacterConfig.protoType = {
  setConfig: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};
export default CharacterConfig;