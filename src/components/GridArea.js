import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

import MapArea from '../components/MapArea';
import Chat from '../containers/Chat';

class GridArea extends Component {
  static width = 1200;
  static height = 2000;
  static cols = 24;
  static rows = 40;
  static wx = GridArea.width / GridArea.cols;
  static hx = GridArea.height / GridArea.rows;

  _calWidthHight(layout) {
    const { w, h } = layout;
    const { wx, hx } = GridArea;
    return { w: w * wx, h: h * hx };
  }

  render() {
    const { width, height, cols, rows } = GridArea;
    const { layouts, setLayouts, hexes, pieces, movePiece, addPiece } = this.props;
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
              pieces={pieces}
              movePiece={(pieces, key, piece) => movePiece(pieces, key, piece)}
              addPiece={(pieces) => addPiece(pieces)}
            />
          </Paper>
          <Paper key={'chat-board'} style={{ backgroundColor: Colors.lightGreen100 }}>
            <Chat
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
  hexes: PropTypes.object.isRequired,
  pieces: PropTypes.object.isRequired,
  movePiece: PropTypes.func.isRequired,
  addPiece: PropTypes.func.isRequired,
};
export default GridArea;