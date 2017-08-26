import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import SelectColor from '../components/SelectColor';

/**
 * マップ設定部品
 */
class MapConfig extends Component {
  _inputURL = (e, value) => {
    const { setConfig } = this.props;
    setConfig({ url: value });
  };

  _inputCols = (e, value) => {
    const { setConfig } = this.props;
    setConfig({ cols: Number(value) });
  };

  _inputRows = (e, value) => {
    const { setConfig } = this.props;
    setConfig({ rows: Number(value) });
  };

  _inputSize = (e, value) => {
    const { setConfig } = this.props;
    setConfig({ size: Number(value) });
  };

  _selectColor = (color) => {
    const { setConfig } = this.props;
    setConfig({ color });
  };

  render() {
    const { config } = this.props;
    return (
      <div style={{ margin: 10 }} >
        <div>
          <TextField
            floatingLabelText="Image URL"
            style={{ width: 550 }}
            value={config.url}
            onChange={this._inputURL}
          />
        </div>
        <TextField
          floatingLabelText="Cols"
          style={{ width: 50, marginRight: 10 }}
          value={config.cols}
          onChange={this._inputCols}
        />
        <TextField
          floatingLabelText="Rows"
          style={{ width: 50, marginRight: 10 }}
          value={config.rows}
          onChange={this._inputRows}
        />
        <TextField
          floatingLabelText="Size"
          style={{ width: 50, marginRight: 10 }}
          value={config.size}
          onChange={this._inputSize}
        />
        <SelectColor
          selectedColor={config.color}
          selectColor={this._selectColor}
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