import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Colors from 'material-ui/styles/colors';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class InputArea extends Component {
  componentWillMount() {
    this.setState({
      name: 'A',
      text: '',
    });
  }

  render() {
    const { name, text } = this.state;
    const { sendMessage } = this.props;
    return (
      <div style={{ margin: 10, height: '20%' }} >
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
          onClick={() => { sendMessage({ name, text }); this.setState({ text: '' }); }}
        />
      </div>
    )
  }
}
InputArea.protoType = {
  sendMessage: PropTypes.func.isRequired,
};
export default InputArea;