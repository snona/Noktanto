import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import DiceBotArea from '../components/DiceBotArea';

class ChatInput extends Component {
  componentWillMount() {
    this.setState({
      name: 'A',
      text: '',
    });
  }

  render() {
    const { name, text } = this.state;
    const { sendMessage, systems, system, selectSystem } = this.props;
    return (
      <div style={{ margin: 10 }} >
        <DiceBotArea
          systems={systems}
          system={system}
          selectSystem={(value) => selectSystem(value)}
        />
        <TextField
          floatingLabelText="Name"
          style={{ width: 100, marginRight: 10 }}
          value={name}
          onChange={(e, v) => this.setState({ name: v })}
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
          onClick={() => { sendMessage({ system: system.gameType, name, text }); this.setState({ text: '' }); }}
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
};
export default ChatInput;