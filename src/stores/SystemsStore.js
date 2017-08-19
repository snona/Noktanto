import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * BCDiceの提供するシステム一覧
 * @extends {ReduceStore}
 * @typedef {string[]} SystemsStore システム名の指定値リスト
 */
class SystemsStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS([]);
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Systems.SET:
        return Immutable.fromJS(action.systems);
      default:
        return state;
    }
  }
}

export default new SystemsStore(AppDispatcher);