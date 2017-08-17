import React, { Component } from 'react';
import { Container } from 'flux/utils';

import LayoutAction from '../actions/LayoutAction';
import ChatAction from '../actions/ChatAction';
import DiceBotAction from '../actions/DiceBotAction';

import GridArea from '../components/GridArea';

import LayoutsStore from '../stores/LayoutsStore';
import MessagesStore from '../stores/MessagesStore';
import SystemsStore from '../stores/SystemsStore';
import SystemStore from '../stores/SystemStore';

class _App extends Component {
  static getStores() {
    return [LayoutsStore, MessagesStore, SystemsStore, SystemStore];
  }

  static calculateState() {
    return {
      layouts: LayoutsStore.getState().toJS(),
      messages: MessagesStore.getState().toJS(),
      systems: SystemsStore.getState().toJS(),
      system: SystemStore.getState().toJS(),
    };
  }

  componentWillMount() {
    ChatAction.listenMessages();
    DiceBotAction.getSystems();
  }

  render() {
    return (
      <div className="App">
        <GridArea
          layouts={this.state.layouts}
          messages={this.state.messages}
          setLayouts={layouts => LayoutAction.setLayouts(layouts)}
          sendMessage={message => ChatAction.sendMessage(message)}
          systems={this.state.systems}
          system={this.state.system}
          selectSystem={(value) => DiceBotAction.getSystem(value)}
        />
      </div>
    );
  }
}
const App = Container.create(_App);
export default App;