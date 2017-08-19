import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * MapAreaに配置する駒一覧
 * @extends {ReduceStore}
 */
class PiecesStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({});
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Pieces.SET:
        return Immutable.fromJS(action.pieces);
      case ActionTypes.Pieces.ADD:
        return state.set(action.piece.id, action.piece);
      case ActionTypes.Pieces.REMOVE:
        return state.delete(action.id);
      default:
        return state;
    }
  }
}

export default new PiecesStore(AppDispatcher);