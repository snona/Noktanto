import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';

class ChatLog extends Component {
  render() {
    const { messages, layout } = this.props;
    const logs = messages.reverse().map(message => (
      <div key={`log-${message.id}`}>
        <span style={{ color: Colors.deepPurple900 }} >
          {`${message.name} : ${message.text}`}
        </span>
      </div>
    ));
    console.log(logs);
    return (
      <Paper style={{ padding: 10, overflow: 'scroll', height: layout.h - 210 }} >
        {logs}
      </Paper>
    )
  }
}
ChatLog.protoType = {
  messages: PropTypes.array.isRequired,
  layout: PropTypes.object.isRequired,
};
export default ChatLog;