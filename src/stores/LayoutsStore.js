import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * GridAreaに表示する画面項目の配置, サイズ一覧
 * @extends {ReduceStore}
 * 
 * @typedef {Layout[]} Layouts レイアウト一覧
 * 
 * @typedef {Object} Layout レイアウト
 * @property {string} i レイアウトID
 * @property {number} x 座標(x)
 * @property {number} y 座標(y)
 * @property {number} w サイズ(横)
 * @property {number} h サイズ(縦)
 * @property {number} minW 最小サイズ(横)
 * @property {number} minH 最小サイズ(縦)
 * @property {bool} isDraggable ドラッグ移動の可否
 */
class LayoutsStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS([{
      i: 'map-board', x: 0, y: 0, w: 8, h: 7, minW: 8, minH: 7, isDraggable: false,
    }, {
      i: 'chat-board', x: 12, y: 0, w: 12, h: 7, minW: 12, minH: 6,
    }, {
      i: 'config-board', x: 8, y: 0, w: 4, h: 7, minW: 4, minH: 4,
    }]);
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Layouts.SET:
        return Immutable.fromJS(action.layouts);
      case ActionTypes.Layouts.ADD:
        return state.push(action.layout);
      default:
        return state;
    }
  }
}

export default new LayoutsStore(AppDispatcher);