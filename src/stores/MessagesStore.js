import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

/** LogAreaに表示するチャット履歴 */
class MessagesStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS([]);
  }

  reduce(state, action) {
    switch (action.type) {
      case 'set_messages':
        return Immutable.fromJS(action.messages);
      case 'add_message':
        return state.push(action.message);
      default:
        return state;
    }
  }
}

export default new MessagesStore(AppDispatcher);