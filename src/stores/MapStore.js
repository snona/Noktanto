import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * MapAreaの情報
 * @extends {ReduceStore}
 * 
 * @typedef {Object} Map マップ情報
 * @property {number} cols 横セル数
 * @property {number} rows 縦セル数
 * @property {number} size セルの大きさ
 * @property {Image} url 背景画像の参照先
 * @property {string} color セルの色
 */
class MapStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      cols: 10,  // 横セル数
      rows: 10,  // 縦セル数
      size: 50, // セルのサイズ
      url: './resources/map02.jpg',  // 背景イメージ
      color: '#B2FF59',  // セル, 文字の色
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Map.SET:
        return Immutable.fromJS(action.map);
      case ActionTypes.Map.INIT:
        return this.getInitialState();
      default:
        return state;
    }
  }
}

export default new MapStore(AppDispatcher);