import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

class MessagesStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS([{
      id: 1,
      name: 'A',
      text: 'send message',
    }, {
      id: 2,
      name: 'B',
      text: 'send message',
    }, {
      id: 3,
      name: 'C',
      text: 'send message',
    }, {
      id: 4,
      name: 'D',
      text: 'send message',
    }, {
      id: 5,
      name: 'A',
      text: 'send message',
    }]);
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