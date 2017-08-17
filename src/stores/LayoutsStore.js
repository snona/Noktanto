import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

class LayoutsStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS([{
      i: 'chat-board', x: 0, y: 0, w: 12, h: 4, minW: 12, minH: 3,
    }]);
  }

  reduce(state, action) {
    switch (action.type) {
      case 'set_layouts':
        return Immutable.fromJS(action.layouts);
      case 'add_layout':
        return state.push(action.layout);
      default:
        return state;
    }
  }
}

export default new LayoutsStore(AppDispatcher);