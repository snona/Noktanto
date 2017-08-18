import React, { Component } from 'react';
import { Container } from 'flux/utils';

import LayoutAction from '../actions/LayoutAction';
import ChatAction from '../actions/ChatAction';
import DiceBotAction from '../actions/DiceBotAction';
import MapAction from '../actions/MapAction';

import GridArea from '../components/GridArea';

import LayoutsStore from '../stores/LayoutsStore';
import MessagesStore from '../stores/MessagesStore';
import SystemsStore from '../stores/SystemsStore';
import SystemStore from '../stores/SystemStore';
import HexesStore from '../stores/HexesStore';
import PiecesStore from '../stores/PiecesStore';

class _App extends Component {
  static getStores() {
    return [LayoutsStore, MessagesStore, SystemsStore, SystemStore, HexesStore, PiecesStore];
  }

  static calculateState() {
    return {
      layouts: LayoutsStore.getState().toJS(),
      messages: MessagesStore.getState().toJS(),
      systems: SystemsStore.getState().toJS(),
      system: SystemStore.getState().toJS(),
      hexes: HexesStore.getState().toJS(),
      pieces: PiecesStore.getState().toJS(),
    };
  }

  componentWillMount() {
    ChatAction.listenMessages();
    DiceBotAction.getSystems();
    MapAction.initHexes();
    MapAction.listenPieces();
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
          hexes={this.state.hexes}
          pieces={this.state.pieces}
          movePiece={(pieces, key, piece) => MapAction.movePiece(pieces, key, piece)}
          addPiece={(pieces) => MapAction.addPiece(pieces)}
        />
      </div>
    );
  }
}
const App = Container.create(_App);
export default App;