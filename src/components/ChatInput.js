import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import SelectDiceSystem from '../components/SelectDiceSystem';
import SelectCharacter from '../components/SelectCharacter';

/**
 * チャット入力部品
 */
class ChatInput extends Component {
  componentWillMount() {
    this.setState({
      character: {
        id: 'A',
        name: 'A',
        color: '#f44336',
        url: './resources/31_ic.png',
      },
      text: '',
    });
  }

  _selectSystem = (value) => {
    const { selectSystem } = this.props;
    selectSystem(value);
  };

  _selectCharacter = (key) => {
    const { characters } = this.props;
    this.setState({ character: characters[key] });
  };

  _inputText = (e, value) => {
    this.setState({ text: value });
  };

  _enterKey = (event) => {
    if (event.charCode === 13) {
      this._sendMessage();
    }
  }

  _sendMessage = () => {
    const { character, text } = this.state;
    const { sendMessage, system } = this.props;
    sendMessage({ system: system.gameType, character, text });
    this.setState({ text: '' });
  };

  render() {
    const { character, text } = this.state;
    const { systems, system, characters } = this.props;
    return (
      <div style={{ margin: 10 }} >
        {/* ダイスシステム選択 */}
        <SelectDiceSystem
          systems={systems}
          system={system}
          selectSystem={this._selectSystem}
        />
        {/* 発言キャラクタ選択 */}
        <SelectCharacter
          characters={characters}
          selectedCharacter={character}
          selectCharacter={this._selectCharacter}
        />
        <TextField
          floatingLabelText="Text"
          style={{ width: 250, marginRight: 10  }}
          value={text}
          onChange={this._inputText}
          onKeyPress={this._enterKey}
        />
        <RaisedButton
          label="Send Message"
          secondary={true}
          onClick={this._sendMessage}
        />
      </div>
    )
  }
}
ChatInput.protoType = {
  sendMessage: PropTypes.func.isRequired,
  systems: PropTypes.array.isRequired,
  system: PropTypes.object.isRequired,
  selectSystem: PropTypes.func.isRequired,
  characters: PropTypes.object.isRequired,
};
export default ChatInput;