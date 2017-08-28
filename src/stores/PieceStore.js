import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * 駒の情報
 * @extends {ReduceStore}
 * 
 * @typedef {Object} Piece
 * @property {string} name 駒名
 * @property {string} url 駒画像の参照先
 * @property {number} size 駒の大きさ
 */
class PieceStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      name: '',
      url: '',
      size: 50,
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Piece.SET:
        return Immutable.fromJS(action.piece);
      case ActionTypes.Piece.INIT:
        return this.getInitialState();
      default:
        return state;
    }
  }
}

export default new PieceStore(AppDispatcher);