import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * ルーム
 * @extends {ReduceStore}
 * 
 * @typedef {Object} Room ルーム
 */
class RoomStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({});
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Room.SET:
        return Immutable.fromJS(action.room);
      default:
        return state;
    }
  }
}

export default new RoomStore(AppDispatcher);