import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * ルーム一覧
 * @extends {ReduceStore}
 * 
 * @typedef {Object[]} Rooms ルーム一覧
 */
class RoomsStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS([]);
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Rooms.ADD:
        return state.push(action.room);
      case ActionTypes.Rooms.INIT:
        return this.getInitialState();
      default:
        return state;
    }
  }
}

export default new RoomsStore(AppDispatcher);