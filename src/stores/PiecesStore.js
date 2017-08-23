import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * MapAreaに配置する駒一覧
 * @extends {ReduceStore}
 * 
 * @typedef {Object} Pieces
 * @property {Object} {id} 駒のID(※キー名称は駒ごとに別)
 * @property {string} {id}.id 駒のID
 * @property {string} {id}.name 駒名
 * @property {number} {id}.x 描画位置(x)
 * @property {number} {id}.y 描画位置(y)
 * @property {number} {id}.width 駒のサイズ(横)
 * @property {number} {id}.height 駒のサイズ(縦)
 * @property {number} {id}.size 駒のサイズ
 * @property {number} {id}.strokeWidth 駒の縁サイズ
 * @property {string} {id}.url 駒画像の参照先
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
      case ActionTypes.Pieces.INIT:
        return this.getInitialState();
      default:
        return state;
    }
  }
}

export default new PiecesStore(AppDispatcher);