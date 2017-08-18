import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import AppDispatcher from '../dispatcher/AppDispatcher';

/** MapAreaに配置する駒の選択済み一覧 */
class SelectPiecesStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS({});
  }

  reduce(state, action) {
    switch (action.type) {
      case 'set_pieces':
        return Immutable.fromJS(action.pieces);
      case 'set_piece':
        return state.set(action.piece.id, action.piece);
      default:
        return state;
    }
  }
}

export default new SelectPiecesStore(AppDispatcher);