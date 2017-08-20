import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * 発言キャラクタ情報
 * @extends {ReduceStore}
 * 
 * @typedef {Object} Character 発言キャラクタ
 * @property {string} id キャラクタのID
 * @property {string} name キャラクタ名
 * @property {string} color キャラクタ色
 * @property {string} url キャラクタ画像の参照先
 */
class CharacterStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      id: '',
      name: '',
      color: '#ff5252',
      url: '',
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Character.SET:
        return Immutable.fromJS(action.characterConfig);
      case ActionTypes.Character.INIT:
        return this.getInitialState();
      default:
        return state;
    }
  }
}

export default new CharacterStore(AppDispatcher);