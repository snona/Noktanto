import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Rooms from '../containers/Rooms';
import Room from '../containers/Room';

/**
 * ルート
 */
class Routes extends Component {
  render() {
    const { user } = this.props;
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Rooms} />
          <Route exact path="/:roomId" component={Room} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;