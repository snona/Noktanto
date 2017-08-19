import React, { Component } from 'react';
import { Container } from 'flux/utils';

import ChatInput from '../components/ChatInput';

import ChatAction from '../actions/ChatAction';

import ChatPalletsStore from '../stores/ChatPalletsStore';
import SystemStore from '../stores/SystemStore';

/**
 * チャット画面
 */
class _ChatPallet extends Component {
  static getStores() {
    return [ChatPalletsStore, SystemStore];
  }

  static calculateState() {
    return {
      chatPallets: ChatPalletsStore.getState().toJS(),
      system: SystemStore.getState().toJS(),
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div style={{ margin: 10, height: '100%' }} >
        <ChatInput
          sendMessage={message => ChatAction.sendMessage(message)}
          systems={this.state.systems}
          system={this.state.system}
          selectSystem={(system) => DiceBotAction.getSystem(system)}
          characters={this.state.characters}
        />
      </div>
    );
  }
}
const ChatPallet = Container.create(_ChatPallet);
export default ChatPallet;