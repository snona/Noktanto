import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * LogAreaに表示するチャット履歴
 * @extends {ReduceStore}
 * 
 * @typedef {SecretMessage[]} SecretMessages メッセージ一覧
 * 
 * @typedef {Object} SecretMessage メッセージ
 * @property {string} id メッセージID
 * @property {string} id.message 発言内容
 * @property {string} id.result ダイス結果
 */
class SecretMessagesStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({});
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.SecretMessages.SET:
        return Immutable.fromJS(action.messages);
      case ActionTypes.SecretMessages.ADD:
        return state.set(action.message.id, action.message);
      case ActionTypes.SecretMessages.INIT:
        return this.getInitialState();
      default:
        return state;
    }
  }
}

export default new SecretMessagesStore(AppDispatcher);