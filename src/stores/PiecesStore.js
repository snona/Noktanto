import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

class PiecesStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({});
  }

  reduce(state, action) {
    switch (action.type) {
      case 'set_pieces':
        return Immutable.fromJS(action.pieces);
      default:
        return state;
    }
  }
}

export default new PiecesStore(AppDispatcher);