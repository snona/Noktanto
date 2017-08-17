import React, { Component } from 'react';
import { Container } from 'flux/utils';

import GridArea from '../components/GridArea';
import LayoutsStore from '../stores/LayoutsStore';
import LayoutAction from '../actions/LayoutAction';

class _App extends Component {
  static getStores() {
    return [LayoutsStore];
  }

  static calculateState() {
    return {
      layouts: LayoutsStore.getState().toJS(),
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <GridArea layouts={this.state.layouts} setLayouts={layouts => LayoutAction.setLayouts(layouts)} />
      </div>
    );
  }
}
const App = Container.create(_App);
export default App;