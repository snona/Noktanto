import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * ルーム
 * @extends {ReduceStore}
 * 
 * @typedef {Object} Room ルーム情報
 * @property {string} id 部屋ID
 * @property {string} name 部屋名
 * @property {Object} users 部屋に参加可能なユーザ
 * @property {string} authentication 認証必か(必須の場合は認証ID)
 * @property {boolean} visit 見学可否
 * @property {string} system デフォルトのゲームシステム
 */
class RoomStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      id: '',
      name: '',
      names: {},
      authentication: undefined,
      visit: false,
      system: 'Cthulhu',
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Room.SET:
        return Immutable.fromJS(action.room);
      default:
        return state;
    }
  }
}

export default new RoomStore(AppDispatcher);