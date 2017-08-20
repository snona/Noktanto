import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * MapAreaの情報
 * @extends {ReduceStore}
 * 
 * @typedef {Object} Map マップ情報
 * @property {number} x 横セル数
 * @property {number} y 縦セル数
 * @property {number} size セルの大きさ
 * @property {Image} url 背景画像の参照先
 * @property {string} color セルの色
 */
class MapStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({
      x: 10,  // 横セル数
      y: 10,  // 縦セル数
      size: 30, // セルのサイズ
      url: './resources/map02.jpg',  // 背景イメージ
      color: '#B2FF59',  // セル, 文字の色
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.Map.SET:
        return Immutable.fromJS(action.map);
      default:
        return state;
    }
  }
}

export default new MapStore(AppDispatcher);