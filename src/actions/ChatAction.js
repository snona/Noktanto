import AppDispatcher from '../dispatcher/AppDispatcher';

class ChatAction {
  static setMessages(messages) {
    AppDispatcher.dispatch({
      type: 'set_messages',
      messages,
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
