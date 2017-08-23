import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';

import ChatLog from '../components/ChatLog';
import ChatInput from '../components/ChatInput';

import ChatAction from '../actions/ChatAction';
import DiceBotAction from '../actions/DiceBotAction';

import MessagesStore from '../stores/MessagesStore';
import SystemsStore from '../stores/SystemsStore';
import SystemStore from '../stores/SystemStore';
import CharactersStore from '../stores/CharactersStore';

/**
 * チャット画面の統括
 */
class _Chat extends Component {
  static getStores() {
    return [MessagesStore, SystemsStore, SystemStore, CharactersStore];
  }

  static calculateState() {
    return {
      messages: MessagesStore.getState().toJS(),
      systems: SystemsStore.getState().toJS(),
      system: SystemStore.getState().toJS(),
      characters: CharactersStore.getState().toJS(),
    };
  }

  componentWillMount() {
    const { roomId } = this.props;
    ChatAction.listenMessages(roomId);  // 発言情報の自動取得
    DiceBotAction.getSystems(); // BCDiceAPIのシステム一覧取得
  }

  componentWillUnmount() {
    const { roomId } = this.props;
    ChatAction.unListenMessages(roomId);  // 発言情報の自動取得終了
  }

  render() {
    const { layout } = this.props;
    return (
      <div style={{ margin: 10, height: '100%' }} >
        <ChatLog
          messages={this.state.messages}
          layout={layout}
        />
        <ChatInput
          sendMessage={message => ChatAction.sendMessage(this.props.roomId, message)}
          systems={this.state.systems}
          system={this.state.system}
          selectSystem={(system) => DiceBotAction.getSystem(system)}
          characters={this.state.characters}
        />
      </div>
    );
  }
}
_Chat.protoType = {
  roomId: PropTypes.string.isRequired,
  layout: PropTypes.object.isRequired,
};
const Chat = Container.create(_Chat);
export default Chat;