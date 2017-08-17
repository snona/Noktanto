import AppDispatcher from '../dispatcher/AppDispatcher';

class LayoutAction {
  static setLayouts(layouts) {
    AppDispatcher.dispatch({
      type: 'set_layouts',
      layouts,
    });
  }

  static addLayout(layout) {
    AppDispatcher.dispatch({
      type: 'add_layout',
      layout,
    });
  }
}
export default LayoutAction;
