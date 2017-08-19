import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

class PieceConfig extends Component {
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
        <div>
          <TextField
            floatingLabelText="Size"
            style={{ width: 50 }}
            value={config.size}
            onChange={(e, v) => setConfig({ size: v })}
          />
        </div>
        <div>
          <TextField
            floatingLabelText="Image URL"
            style={{ width: 350 }}
            value={config.url}
            onChange={(e, v) => setConfig({ url: v })}
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