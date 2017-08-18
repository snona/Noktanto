import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

/** GridAreaに表示する画面項目の配置, サイズ一覧 */
class LayoutsStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS([{
      i: 'map-board', x: 0, y: 0, w: 8, h: 7, minW: 8, minH: 7, isDraggable: false,
    }, {
      i: 'chat-board', x: 9, y: 3, w: 12, h: 7, minW: 12, minH: 6,
    }, {
      i: 'config-board', x: 9, y: 0, w: 4, h: 2, minW: 4, minH: 2,
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