import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

import ChatArea from '../components/ChatArea';

class GridArea extends Component {
  static width = 1200;
  static height = 2000;
  static cols = 24;
  static rows = 40;
  static wx = GridArea.width / GridArea.cols;
  static hx = GridArea.height / GridArea.rows;

  updateLayouts(newLayouts) {
    // const { layouts } = this.props;
    // return newLayouts.map(newLayout => {
    //   const layout = layouts.find(layout => layout.i === newLayout.i);
    //   newLayout.style = layout.style;
    //   newLayout.node = layout.node;
    //   return newLayout;
    // });
    return newLayouts;
  }

  _calWidthHight(layout) {
    const { w, h } = layout;
    const { wx, hx } = GridArea;
    return { w: w * wx, h: h * hx };
  }

  render() {
    const { width, height, cols, rows } = GridArea;
    const { layouts, setLayouts, messages, sendMessage } = this.props;
    const chatLayout = layouts.find(layout => layout.i === 'chat-board');

    return (
      <Paper style={{ margin: 10 }}>
        <ReactGridLayout className="layout" layout={layouts}
          cols={cols} rowHeight={rows}
          width={width} height={height}
          onDragStop={(newLayouts) => setLayouts(this.updateLayouts(newLayouts))}
          onResizeStop={(newLayouts) => setLayouts(this.updateLayouts(newLayouts))}
        >
          <Paper key={'chat-board'} style={{ backgroundColor: Colors.lightGreen100 }}>
            <ChatArea
              messages={messages}
              sendMessage={messages => sendMessage(messages)}
              layout={this._calWidthHight(chatLayout)}
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
};
export default GridArea;