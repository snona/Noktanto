import React, { Component } from 'react';
import { Container } from 'flux/utils';

import GridArea from '../components/GridArea';
import LayoutsStore from '../stores/LayoutsStore';
import MessagesStore from '../stores/MessagesStore';
import LayoutAction from '../actions/LayoutAction';
import ChatAction from '../actions/ChatAction';

class _App extends Component {
  static getStores() {
    return [LayoutsStore, MessagesStore];
  }

  static calculateState() {
    return {
      layouts: LayoutsStore.getState().toJS(),
      messages: MessagesStore.getState().toJS(),
    };
  }

  render() {
    return (
      <div className="App">
        <GridArea
          layouts={this.state.layouts}
          messages={this.state.messages}
          setLayouts={layouts => LayoutAction.setLayouts(layouts)}
          sendMessage={message => ChatAction.addMessage(message)}
        />
      </div>
    );
  }
}
const App = Container.create(_App);
export default App;