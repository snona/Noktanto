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
      },
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case 'set_character':
        return Immutable.fromJS(action.mapConfig);
      default:
        return state;
    }
  }
}

export default new CharactersStore(AppDispatcher);