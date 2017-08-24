import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import SelectColor from '../components/SelectColor';

/**
 * キャラクタ設定部品
 */
class CharacterConfig extends Component {
  _inputName = (e, value) => {
    const { setConfig } = this.props;
    setConfig({ name: value });
  };

  _selectColor = (color) => {
    const { setConfig } = this.props;
    setConfig({ color });
  };

  _inputURL = (e, value) => {
    const { setConfig } = this.props;
    setConfig({ url: value });
  };

  render() {
    const { config } = this.props;
    return (
      <div style={{ margin: 10 }} >
        <div>
          <TextField
            floatingLabelText="Name"
            style={{ width: 150 }}
            value={config.name}
            onChange={this._inputName}
          />
        </div>
        <SelectColor
          selectedColor={config.color}
          selectColor={this._selectColor}
        />
        <TextField
          floatingLabelText="Avatar URL"
          style={{ width: 350 }}
          value={config.url}
          onChange={this._inputURL}
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