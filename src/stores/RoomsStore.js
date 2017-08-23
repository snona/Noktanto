import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * ルーム一覧
 * @extends {ReduceStore}
 * 
 * @typedef {Object} Rooms ルーム一覧
 * @property {Object} {id} ルームのID(※キー名称はルームごとに別)
 * @property {string} {id}.id ルームのID
 * @property {string} {id}.name ルーム名
 * @property {Object} {id}.users 部屋に参加可能なユーザ
 * @property {string} {id}.authentication 認証必か(必須の場合は認証ID)
 * @property {boolean} {id}.visit 見学可否
 * @property {string} {id}.system デフォルトのゲームシステム
 */
class RoomsStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({});
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Rooms.ADD:
        return state.set(action.room.id, action.room);
      case ActionTypes.Rooms.REMOVE:
        return state.delete(action.room.id);
      case ActionTypes.Rooms.INIT:
        return this.getInitialState();
      default:
        return state;
    }
  }
}

export default new RoomsStore(AppDispatcher);