import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * LogAreaに表示するチャット履歴
 * @extends {ReduceStore}
 * 
 * @typedef {Message[]} Messages メッセージ一覧
 * 
 * @typedef {Object} Message メッセージ
 * @property {string} id メッセージID
 * @property {Object} character 発言者
 * @property {string} character.id 発言者ID
 * @property {string} character.name 発言者名
 * @property {string} character.color 表示色
 * @property {string} character.url 発言者画像の参照先
 * @property {string} system ダイスシステム
 * @property {string} text 発言内容
 */
class MessagesStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS([]);
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Messages.SET:
        return Immutable.fromJS(action.messages);
      case ActionTypes.Messages.ADD:
        return state.push(action.message);
      case ActionTypes.Messages.INIT:
        return this.getInitialState();
      default:
        return state;
    }
  }
}

export default new MessagesStore(AppDispatcher);