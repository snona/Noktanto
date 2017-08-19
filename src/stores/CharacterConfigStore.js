import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

/**
 * MapAreaの情報
 */
class CharacterConfigStore extends ReduceStore {
  getInitialState() {
    // const image = new Image();
    // image.src = 'http://www.wtrpg9.com/trpg/image/material/map01.jpg';
    return Immutable.fromJS({
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case 'set_characterConfig':
        return Immutable.fromJS(action.characterConfig);
      default:
        return state;
    }
  }
}

export default new CharacterConfigStore(AppDispatcher);