import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/** LogAreaに表示するチャット履歴 */
class MessagesStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS([]);
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Messages.SET:
        return Immutable.fromJS(action.messages);
      case ActionTypes.Messages.ADD:
        return state.push(action.message);
      default:
        return state;
    }
  }
}

export default new MessagesStore(AppDispatcher);