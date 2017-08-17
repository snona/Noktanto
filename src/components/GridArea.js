import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import * as Colors from 'material-ui/styles/colors';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

import MapArea from '../components/MapArea';
import ChatArea from '../components/ChatArea';

class GridArea extends Component {
  static width = 1200;
  static height = 2000;
  static cols = 24;
  static rows = 40;
  static wx = GridArea.width / GridArea.cols;
  static hx = GridArea.height / GridArea.rows;

  componentWillMount() {
    this.setState({ isStatic: true });
  }

  _calWidthHight(layout) {
    const { w, h } = layout;
    const { wx, hx } = GridArea;
    return { w: w * wx, h: h * hx };
  }

  render() {
    const { width, height, cols, rows } = GridArea;
    const { isStatic } = this.state;
    const { layouts, setLayouts, messages, sendMessage,
      systems, system, selectSystem, hexes } = this.props;
    const chatLayout = layouts.find(layout => layout.i === 'chat-board');

    return (
      <Paper style={{ margin: 10 }}>
        <ReactGridLayout className="layout" layout={layouts}
          cols={cols} rowHeight={rows}
          width={width} height={height}
          onDragStop={(newLayouts) => setLayouts(newLayouts)}
          onResizeStop={(newLayouts) => setLayouts(newLayouts)}
        >
          <Paper key={'map-board'}>
            <MapArea
              hexes={hexes}
            />
          </Paper>
          <Paper key={'chat-board'} style={{ backgroundColor: Colors.lightGreen100 }}>
            <ChatArea
              messages={messages}
              sendMessage={messages => sendMessage(messages)}
              layout={this._calWidthHight(chatLayout)}
              systems={systems}
              system={system}
              selectSystem={(value) => selectSystem(value)}
            />
          </Paper>
        </ReactGridLayout>
      </Paper>
    )
  }
}
GridArea.protoType = {
  layouts: PropTypes.array.isRequired,
  setLayouts: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  systems: PropTypes.array.isRequired,
  system: PropTypes.object.isRequired,
  selectSystem: PropTypes.func.isRequired,
  hexes: PropTypes.object.isRequired,
};
export default GridArea;