import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * ユーザ情報
 * @extends {ReduceStore}
 * 
 * @typedef {Object} User
 * @property {string} id 認証ID
 * @property {string} uid 認証ID
 */
class UserStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      id: '',
      name: '',
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.User.id.SET:
        return state.set('id', action.id);
      case ActionTypes.User.name.SET:
        return state.set('name', action.name);
      default:
        return state;
    }
  }
}

export default new UserStore(AppDispatcher);