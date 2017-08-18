import AppDispatcher from '../dispatcher/AppDispatcher';
import { messagesRef, secretMessagesRef } from '../firebase';

import DiceBotAction from '../actions/DiceBotAction';

class ChatAction {
  static listenMessages() {
    messagesRef.on('child_added', (snapshot, id) => this.addMessage(snapshot.key, snapshot.val()));
    secretMessagesRef.on('child_added', (snapshot, id) => this.addMessage(snapshot.key, snapshot.val()));
  }

  static setMessages(messages) {
    AppDispatcher.dispatch({
      type: 'set_messages',
      messages: messages === null ? [] : messages,
    });
  }

  static _createResultMessage(message, response) {
    return {
      name: message.name,
      text: response.result,
    };
  }

  static sendMessage(message) {
    DiceBotAction.getDiceRoll(message.system, message.text).then(response => {
      if (!response.ok) {
        messagesRef.push(message);
      } else {
        const sendFn = (msg) => response.secret ? secretMessagesRef.push(msg) : messagesRef.push(msg);
        sendFn(message);
        const resultMessage = this._createResultMessage(message, response)
        sendFn(resultMessage);
      }
    });
  }

  static addMessage(key, message) {
    message.id = key;
    AppDispatcher.dispatch({
      type: 'add_message',
      message,
    });
  }
}
export default ChatAction;
