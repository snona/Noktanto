import React, { Component } from 'react';
import { Container } from 'flux/utils';

import LayoutAction from '../actions/LayoutAction';
import GridArea from '../components/GridArea';
import LayoutsStore from '../stores/LayoutsStore';

/**
 * 全画面統括
 */
class _App extends Component {
  static getStores() {
    return [LayoutsStore];
  }

  static calculateState() {
    return {
      layouts: LayoutsStore.getState().toJS(),
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="App">
        <GridArea
          layouts={this.state.layouts}
          setLayouts={layouts => LayoutAction.setLayouts(layouts)}
        />
      </div>
    );
  }
}
const App = Container.create(_App);
export default App;