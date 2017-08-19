import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * MapAreaの情報
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