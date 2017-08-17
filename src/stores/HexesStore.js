import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

class HexesStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({});
  }

  reduce(state, action) {
    switch (action.type) {
      case 'set_hexes':
        return Immutable.fromJS(action.hexes);
      default:
        return state;
    }
  }
}

export default new HexesStore(AppDispatcher);