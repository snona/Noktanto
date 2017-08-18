import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

/** GridAreaに表示する画面項目の配置, サイズ一覧 */
class LayoutsStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS([{
      i: 'map-board', x: 0, y: 0, w: 8, h: 7, minW: 8, minH: 7, isDraggable: false,
    }, {
      i: 'chat-board', x: 0, y: 0, w: 12, h: 6, minW: 12, minH: 6,
    }]);
  }

  reduce(state, action) {
    switch (action.type) {
      case 'set_layouts':
        return Immutable.fromJS(action.layouts);
      case 'add_layout':
        return state.push(action.layout);
      default:
        return state;
    }
  }
}

export default new LayoutsStore(AppDispatcher);