import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ConfigDialog extends Component {
  componentWillMount() {
    const { config } = this.props;
    const tmpConfig =this._setTmpConfig({}, config);
    this.setState({ open: false, tmpConfig });
  }

  componentWillReceiveProps(nextProps) {
    const { config } = nextProps;
    const tmpConfig =this._setTmpConfig({}, config);
    this.setState({ tmpConfig });
  }

  _setTmpConfig(newConfig, tmpConfig) {
    const obj = {};
    Object.keys(tmpConfig).forEach(key => {
      obj[key] = newConfig[key] !== undefined ? newConfig[key] : tmpConfig[key];
    })
    return obj;
  }

  render() {
    const { tmpConfig } = this.state;
    const { label, setConfig, ConfigArea } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={() => this.setState({ open: false })}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={() => { setConfig(tmpConfig); this.setState({ open: false }) }}
      />,
    ];
    return (
      <div style={{ margin: 10 }}>
        <RaisedButton
          label={label}
          primary={true}
          onClick={() => this.setState({ open: true })}
        />
        <Dialog
          title={label}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          autoScrollBodyContent={true}
        >
          <ConfigArea
            config={tmpConfig}
            setConfig={(newConfig) => { this.setState({ tmpConfig: this._setTmpConfig(newConfig, tmpConfig) })}}
          />
        </Dialog>
      </div>
    )
  }
}
ConfigDialog.protoType = {
  label: PropTypes.string.isRequired,
  setConfig: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  ConfigArea: PropTypes.node.isRequired,
};
export default ConfigDialog;