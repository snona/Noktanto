import React, { Component } from 'react';
import { Container } from 'flux/utils';

import UserAction from '../actions/UserAction';
import UserStore from '../stores/UserStore';
import Routes from '../components/Routes';

/**
 * 全画面統括
 */
class _App extends Component {
  static getStores() {
    return [UserStore];
  }

  static calculateState() {
    return {
      user: UserStore.getState().toJS(),
    };
  }

  componentWillMount() {
    UserAction.signIn();
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}
const App = Container.create(_App);
export default App;