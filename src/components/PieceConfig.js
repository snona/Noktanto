import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

/**
 * 駒設定部品
 */
class PieceConfig extends Component {
  _inputName = (e, value) => {
    const { setConfig } = this.props;
    setConfig({ name: value });
  };

  _inputSize = (e, value) => {
    const { setConfig } = this.props;
    setConfig({ size: value });
  };

  _inputURL = (e, value) => {
    const { setConfig } = this.props;
    setConfig({ url: value })
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
        <div>
          <TextField
            floatingLabelText="Size"
            style={{ width: 50 }}
            value={config.size}
            onChange={this._inputSize}
          />
        </div>
        <div>
          <TextField
            floatingLabelText="Image URL"
            style={{ width: 350 }}
            value={config.url}
            onChange={this._inputURL}
          />
        </div>
      </div>
    )
  }
}
PieceConfig.protoType = {
  setConfig: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};
export default PieceConfig;