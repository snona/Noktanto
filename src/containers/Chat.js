import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';

import LogArea from '../components/LogArea';
import InputArea from '../components/InputArea';

import ChatAction from '../actions/ChatAction';
import DiceBotAction from '../actions/DiceBotAction';

import MessagesStore from '../stores/MessagesStore';
import SystemsStore from '../stores/SystemsStore';
import SystemStore from '../stores/SystemStore';

/**
 * チャット画面
 */
class _Chat extends Component {
  static getStores() {
    return [MessagesStore, SystemsStore, SystemStore];
  }

  static calculateState() {
    return {
      messages: MessagesStore.getState().toJS(),
      systems: SystemsStore.getState().toJS(),
      system: SystemStore.getState().toJS(),
    };
  }

  componentWillMount() {
    ChatAction.listenMessages();
    DiceBotAction.getSystems();
  }

  render() {
    const { layout } = this.props;
    return (
      <div style={{ margin: 10, height: '100%' }} >
        <LogArea
          messages={this.state.messages}
          layout={layout}
        />
        <InputArea
          sendMessage={message => ChatAction.sendMessage(message)}
          systems={this.state.systems}
          system={this.state.system}
          selectSystem={(system) => DiceBotAction.getSystem(system)}
        />
      </div>
    );
  }
}
_Chat.protoType = {
  layout: PropTypes.object.isRequired,
};
const Chat = Container.create(_Chat);
export default Chat;