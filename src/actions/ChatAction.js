import AppDispatcher from '../dispatcher/AppDispatcher';
import { messagesRef } from '../firebase';

class ChatAction {
  static listenMessages() {
    // messagesRef.once('value', (snapshot) => { console.log(snapshot); this.setMessages(snapshot.val())});
    messagesRef.on('child_added', (snapshot) => this.addMessage(snapshot.val()));
  }

  static setMessages(messages) {
    AppDispatcher.dispatch({
      type: 'set_messages',
      messages: messages === null ? [] : messages,
    });
  }

  static sendMessage(message) {
    messagesRef.push(message);
  }

  static addMessage(message) {
    AppDispatcher.dispatch({
      type: 'add_message',
      message,
    });
  }
}
export default ChatAction;
