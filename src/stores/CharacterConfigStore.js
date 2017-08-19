import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

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
      case 'set_characterConfig':
        return Immutable.fromJS(action.characterConfig);
      case 'init_characterConfig':
        return this.getInitialState();
      default:
        return state;
    }
  }
}

export default new CharacterConfigStore(AppDispatcher);