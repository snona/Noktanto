import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

class LayoutAction {
  static setLayouts(layouts) {
    AppDispatcher.dispatch({
      type: ActionTypes.Layouts.SET,
      layouts,
    });
  }

  static addLayout(layout) {
    AppDispatcher.dispatch({
      type: ActionTypes.Layouts.ADD,
      layout,
    });
  }
}
export default LayoutAction;
