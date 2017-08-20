import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * レイアウトに関する操作
 */
class LayoutAction {

  /**
   * レイアウト情報を設定
   * @param {Object} layouts レイアウト一覧
   */
  static setLayouts(layouts) {
    AppDispatcher.dispatch({
      type: ActionTypes.Layouts.SET,
      layouts,
    });
  }
}
export default LayoutAction;
