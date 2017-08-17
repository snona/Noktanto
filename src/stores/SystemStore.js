import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

class SystemStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      name: '',
      gameType: 'Cthulhu',
      prefixs: [],
      info: '',
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case 'set_system':
        return Immutable.fromJS(action.system);
      default:
        return state;
    }
  }
}

export default new SystemStore(AppDispatcher);