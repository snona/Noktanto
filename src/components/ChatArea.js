import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Colors from 'material-ui/styles/colors';

import LogArea from '../components/LogArea';
import InputArea from '../components/InputArea';

class ChatBoard extends Component {
  render() {
    const { messages, sendMessage, layout, systems, system, selectSystem } = this.props;
    return (
      <div style={{ margin: 10, height: '100%' }} >
        <LogArea
          messages={messages}
          layout={layout}
        />
        <InputArea
          sendMessage={message => { message.id = messages.length + 1; sendMessage(message); }}
          systems={systems}
          system={system}
          selectSystem={(value) => selectSystem(value)}
        />
      </div>
    )
  }
}
ChatBoard.protoType = {
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  layout: PropTypes.object.isRequired,
  systems: PropTypes.array.isRequired,
  system: PropTypes.object.isRequired,
  selectSystem: PropTypes.func.isRequired,
};
export default ChatBoard;