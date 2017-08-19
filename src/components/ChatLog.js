import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';

class ChatLog extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { messages, layout } = this.props;
    if (messages.length === nextProps.messages.length) {
      if (layout.w === nextProps.layout.w && layout.h === nextProps.layout.h) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { messages, layout } = this.props;
    const logs = messages.map(message => (
      <div key={`log-${message.id}`}>
        <span style={{ color: message.color }} >
          {`${message.name} : ${message.text}`}
        </span>
      </div>
    )).reverse();
    console.log(logs);
    return (
      <Paper style={{ padding: 10, overflow: 'scroll', height: layout.h - 260 }} >
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