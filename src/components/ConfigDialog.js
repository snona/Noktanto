import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * 設定用ダイアログ部品
 */
class ConfigDialog extends Component {
  componentWillMount() {
    const { config } = this.props;
    // 設定値の内部保持用にコピーを作成
    const tmpConfig =this._mergeObject({}, config);
    this.setState({ open: false, tmpConfig });
  }

  componentWillReceiveProps(nextProps) {
    const { config } = nextProps;
    // 設定値の内部保持用にコピーを作成
    const tmpConfig =this._mergeObject({}, config);
    this.setState({ tmpConfig });
  }

  /**
   * Objectをマージする  
   * マージ先に未設定の項目にマージ元の値を設定する
   * @param {Object} to マージ先
   * @param {Object} from マージ元
   * @return {Object} マージ結果の新規オブジェクト
   */
  _mergeObject(to, from) {
    const obj = {};
    Object.keys(from).forEach(key => {
      obj[key] = to[key] !== undefined ? to[key] : from[key];
    })
    return obj;
  }

  _openDialog = () => {
    this.setState({ open: true });
  };

  _closeDialog = () => {
    this.setState({ open: false });
  };

  _setConfig = () => {
    const { tmpConfig } = this.state;
    const { setConfig } = this.props;
    setConfig(tmpConfig);
    this._closeDialog();
  };

  _setNewConfig = (newConfig) => {
    const { tmpConfig } = this.state;
    this.setState({ tmpConfig: this._mergeObject(newConfig, tmpConfig) });
  };

  render() {
    const { tmpConfig, open } = this.state;
    const { label, ConfigArea } = this.props;
    // ダイアログに表示するOK, キャンセルボタン
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._closeDialog}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this._setConfig}
      />,
    ];
    return (
      <div style={{ margin: 10 }}>
        <RaisedButton
          label={label}
          primary={true}
          onClick={this._openDialog}
        />
        <Dialog
          title={label}
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this._closeDialog}
          autoScrollBodyContent={true}
        >
          <ConfigArea
            config={tmpConfig}
            setConfig={this._setNewConfig}
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