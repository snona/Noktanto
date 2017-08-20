import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { messagesRef } from '../firebase';

import DiceBotAction from '../actions/DiceBotAction';

class ChatAction {
  static listenMessages() {
    messagesRef.on('child_added', (snapshot, id) => this.addMessage(snapshot.key, snapshot.val()));
  }

  static setMessages(messages) {
    AppDispatcher.dispatch({
      type: ActionTypes.Messages.SET,
      messages: messages === null ? [] : messages,
    });
  }

  static _createResultMessage(message, response) {
    return {
      system: message.system,
      character: message.character,
      text: `${message.system} ${response.result}`,
    };
  }

  static sendMessage(message) {
    DiceBotAction.getDiceRoll(message.system, message.text).then(response => {
      if (!response.ok) {
        messagesRef.push(message);
      } else {
        if (response.secret) {
          const secretMessage = {
            system: message.system,
            character: message.character,
            text: 'シークレットダイス',
          };
          messagesRef.push(secretMessage);
        }
        messagesRef.push(message);
        const resultMessage = this._createResultMessage(message, response)
        messagesRef.push(resultMessage);
      }
    });
  }

  static addMessage(key, message) {
    message.id = key;
    AppDispatcher.dispatch({
      type: ActionTypes.Messages.ADD,
      message,
    });
  }
}
export default ChatAction;
