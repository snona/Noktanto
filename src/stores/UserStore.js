import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import FirebaseObject from '../utils/FirebaseObject';

/**
 * ユーザ情報
 * @extends {ReduceStore}
 * 
 * @typedef {Object} User
 * @property {string} id 認証ID
 * @property {string} name ユーザ名
 * @property {Object} rooms ユーザがログイン可能な部屋
 * @property {Object} channels ユーザが参照可能なチャット
 * @property {Object} authentications ユーザが認証しているパスコード
 */
class UserStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      id: '',
      name: '',
      rooms: {},
      channels: {},
      authentications: {},
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.User.RECEIVE:
        return Immutable.fromJS(this.dbToStore(action.id, action.user));
      case ActionTypes.User.id.SET:
        return state.set('id', action.id);
      default:
        return state;
    }
  }

  dbToStore(key, db) {
    return FirebaseObject.dbToStore(key, db, this.getInitialState().toJS());
  }
}

export default new UserStore(AppDispatcher);