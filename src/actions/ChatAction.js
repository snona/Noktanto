import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { messagesRef, secretMessagesRef } from '../firebase';
import DiceBotAction from '../actions/DiceBotAction';

/**
 * チャットに関わる操作
 */
class ChatAction {

  /**
   * メッセージの自動読込み
   */
  static listenMessages(roomId, userId) {
    messagesRef.child(roomId).on('child_added', (snapshot, id) => this._addMessage(roomId, userId, snapshot.key, snapshot.val()));
  }

  static unListenMessages(roomId) {
    messagesRef.child(roomId).off();
  }

  /**
   * ダイスボットの結果メッセージを構築
   * @param {Object} message ダイスボットに送信したメッセージ
   * @param {Object} response ダイスボットの結果
   * @return {Object} メッセージ形式のダイス結果
   */
  static _createResultMessage(message, response) {
    return {
      system: message.system,
      character: message.character,
      text: `${message.system} ${response.result}`,
      userName: message.userName,
    };
  }

  /**
   * メッセージを送信
   * @param {Object} message 送信メッセージ
   */
  static sendMessage(roomId, userId, message) {
    DiceBotAction.getDiceRoll(message.system, message.text).then(response => {
      if (!response.ok) {
        // 正しく処理されていない場合、コマンドが正しくない(または含んでいない)
        // そのまま送信
        messagesRef.child(roomId).push(message);
      } else {
        if (response.secret) {
          // シークレットダイスの場合
          const resultMessage = this._createResultMessage(message, response);
          const secretMessages = {
            message: message.text,
            result: resultMessage.text,
          };
          console.log(secretMessages);
          const key = secretMessagesRef.child(roomId).push(secretMessages).key;
          console.log(key);
          const secretMessage = {
            system: message.system,
            character: message.character,
            text: 'シークレットダイス',
            userName: message.userName,
            secret: key,
            users: { [userId]: true },
          };
          messagesRef.child(roomId).push(secretMessage);
        } else {
          messagesRef.child(roomId).push(message);
          const resultMessage = this._createResultMessage(message, response);
          messagesRef.child(roomId).push(resultMessage);
        }
      }
    });
  }

  static initMessages() {
    AppDispatcher.dispatch({
      type: ActionTypes.Messages.INIT,
    });
    AppDispatcher.dispatch({
      type: ActionTypes.SecretMessages.INIT,
    });
  }

  /**
   * メッセージを Storeに追加
   * @param {string} key メッセージの Key
   * @param {Object} message 追加メッセージ
   */
  static _addMessage(roomId, userId, key, message) {
    message.id = key;
    if (message.secret !== undefined && message.users !== undefined && message.users[userId] !== undefined) {
      secretMessagesRef.child(roomId).child(message.secret).once('value', (snapshot, id) => {
        this._addSecretMessage(snapshot.key, snapshot.val());
        AppDispatcher.dispatch({
          type: ActionTypes.Messages.ADD,
          message,
        });
      });
    } else {
      AppDispatcher.dispatch({
        type: ActionTypes.Messages.ADD,
        message,
      });
    }
  }

  static _addSecretMessage(key, message) {
    message.id = key;
    AppDispatcher.dispatch({
      type: ActionTypes.SecretMessages.ADD,
      message,
    });
  }
}
export default ChatAction;
