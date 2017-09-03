import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * BCDiceに指定するシステム情報
 * @extends {ReduceStore}
 * 
 * @typedef {Object} System
 * @property {string} name システム名
 * @property {string} gameType システム名の指定値
 * @property {string[]} prefixs システム特有のダイス表記リスト
 * @property {string} info システム特有のダイス表記に対する説明文
 */
class SystemStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      name: '',
      gameType: '',
      prefixs: [],
      info: '',
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.System.gameType.SET:
        return state.set('gameType', action.gameType);
      case ActionTypes.System.SET:
        return Immutable.fromJS(action.system);
      default:
        return state;
    }
  }
}

export default new SystemStore(AppDispatcher);