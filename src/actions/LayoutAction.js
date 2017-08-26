import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

/**
 * レイアウトに関する操作
 */
class LayoutAction {
  static readLayouts() {
    const layouts = localStorage.getItem('layouts');
    if (layouts !== null) this.setLayouts(JSON.parse(layouts));
  }

  /**
   * レイアウト情報を設定
   * @param {Object} layouts レイアウト一覧
   */
  static setLayouts(layouts) {
    localStorage.setItem('layouts', JSON.stringify(layouts));
    AppDispatcher.dispatch({
      type: ActionTypes.Layouts.SET,
      layouts,
    });
  }
}
export default LayoutAction;
