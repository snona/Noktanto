import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * 発言キャラクタの一覧
 * @extends {ReduceStore}
 * 
 * @typedef {Object} Characters 発言キャラクタ一覧
 * @property {Object} {id} キャラクタのID(※キー名称はキャラクタ毎に別)
 * @property {string} {id}.id キャラクタのID
 * @property {string} {id}.name キャラクタ名
 * @property {string} {id}.color キャラクタ色
 * @property {string} {id}.url キャラクタ画像の参照先
 */
class CharactersStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      'A': {
        id: 'A',
        name: 'A',
        color: '#f44336',
        url: './resources/31_ic.png',
      },
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Characters.ADD:
        return state.set(action.character.id, action.character);
      default:
        return state;
    }
  }
}

export default new CharactersStore(AppDispatcher);