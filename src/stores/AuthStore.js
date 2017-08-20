import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * ユーザ認証情報
 * @extends {ReduceStore}
 * 
 * @typedef {Object} Authentication
 * @property {string} uid 認証ID
 */
class AuthenticationStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      uid: '',
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Authentication.SET:
        return Immutable.fromJS(action.auth);
      default:
        return state;
    }
  }
}

export default new AuthenticationStore(AppDispatcher);