import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

/**
 * MapAreaの情報
 */
class CharactersStore extends ReduceStore {
  getInitialState() {
    // const image = new Image();
    // image.src = 'http://www.wtrpg9.com/trpg/image/material/map01.jpg';
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
      case 'set_character':
        return state.set(action.character.id, action.character);
      default:
        return state;
    }
  }
}

export default new CharactersStore(AppDispatcher);