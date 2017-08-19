import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * MapAreaの情報
 */
class CharacterConfigStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
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

export default new CharacterConfigStore(AppDispatcher);