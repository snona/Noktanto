import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import DiceBotArea from '../components/DiceBotArea';
import SelectCharacterField from '../components/SelectCharacterField';

class ChatInput extends Component {
  componentWillMount() {
    this.setState({
      character: {
        id: 'A',
        name: 'A',
        color: '#f44336',
      },
      text: '',
    });
  }

  render() {
    const { character, text } = this.state;
    const { sendMessage, systems, system, selectSystem, characters } = this.props;
    return (
      <div style={{ margin: 10 }} >
        <DiceBotArea
          systems={systems}
          system={system}
          selectSystem={(value) => selectSystem(value)}
        />
        <SelectCharacterField
          characters={characters}
          selectedCharacter={character}
          selectCharacter={(key) => this.setState({ character: characters[key] })}
        />
        <TextField
          floatingLabelText="Text"
          style={{ width: 250, marginRight: 10  }}
          value={text}
          onChange={(e, v) => this.setState({ text: v })}
        />
        <RaisedButton
          label="Send Message"
          secondary={true}
          onClick={() => { sendMessage({ system: system.gameType, name: character.name, text, color: character.color }); this.setState({ text: '' }); }}
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