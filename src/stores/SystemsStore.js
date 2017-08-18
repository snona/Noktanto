import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

/**
 * BCDiceの提供するシステム一覧
 */
class SystemsStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS([]);
  }

  reduce(state, action) {
    switch (action.type) {
      case 'set_systems':
        return Immutable.fromJS(action.systems);
      default:
        return state;
    }
  }
}

export default new SystemsStore(AppDispatcher);