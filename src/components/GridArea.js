import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

import Map from '../containers/Map';
import Chat from '../containers/Chat';

class GridArea extends Component {
  static width = 1200;
  static height = 2000;
  static cols = 24;
  static rows = 40;
  static wx = GridArea.width / GridArea.cols;
  static hx = GridArea.height / GridArea.rows;

  _calWidthHight(key) {
    const { layouts } = this.props;
    const layout = layouts.find(layout => layout.i === key);
    const { w, h } = layout;
    const { wx, hx } = GridArea;
    return { w: w * wx, h: h * hx };
  }

  render() {
    const { width, height, cols, rows } = GridArea;
    const { layouts, setLayouts } = this.props;

    return (
      <Paper style={{ margin: 10 }}>
        <ReactGridLayout className="layout" layout={layouts}
          cols={cols} rowHeight={rows}
          width={width} height={height}
          onDragStop={(newLayouts) => setLayouts(newLayouts)}
          onResizeStop={(newLayouts) => setLayouts(newLayouts)}
        >
          <Paper key={'map-board'}>
            <Map
              layout={this._calWidthHight('map-board')}
            />
          </Paper>
          <Paper key={'chat-board'} style={{ backgroundColor: Colors.lightGreen100 }}>
            <Chat
              layout={this._calWidthHight('chat-board')}
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
};
export default GridArea;