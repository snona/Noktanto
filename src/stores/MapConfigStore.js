import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

/**
 * MapAreaの情報
 */
class MapConfigStore extends ReduceStore {
  getInitialState() {
    const image = new Image();
    image.src = 'http://www.wtrpg9.com/trpg/image/material/map01.jpg';
    return Immutable.fromJS({
      x: 10,  // 横セル数
      y: 10,  // 縦セル数
      size: 30, // セルのサイズ
      backImage: image,  // 背景イメージ
      color: '#B2FF59',  // セル, 文字の色
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case 'set_background':
        return Immutable.fromJS(action.background);
      default:
        return state;
    }
  }
}

export default new MapConfigStore(AppDispatcher);