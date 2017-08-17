import AppDispatcher from '../dispatcher/AppDispatcher';
import { messagesRef } from '../firebase';

import DiceBotAction from '../actions/DiceBotAction';

class ChatAction {
  static listenMessages() {
    messagesRef.on('child_added', (snapshot) => this.addMessage(snapshot.val()));
  }

  static setMessages(messages) {
    AppDispatcher.dispatch({
      type: 'set_messages',
      messages: messages === null ? [] : messages,
    });
  }

  static sendMessage(message) {
    DiceBotAction.getDiceRoll(message.system, message.text).then(response => {
      if (!response.ok) {
        messagesRef.push(message);
      } else {
        if (response.secret) {
          this.addMessage(message);
          const resultMessage = {
            id: message.id + 1,
            name: message.name,
            text: response.result,
          }
          this.addMessage(resultMessage);
        } else {
          messagesRef.push(message);
          const resultMessage = {
            id: message.id + 1,
            name: message.name,
            text: response.result,
          }
          messagesRef.push(resultMessage);
        }
      }
    });
  }

  static addMessage(message) {
    AppDispatcher.dispatch({
      type: 'add_message',
      message,
    });
  }
}
export default ChatAction;
