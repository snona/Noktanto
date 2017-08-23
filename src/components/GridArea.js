import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';

// ReactGridLayout 用 CSS
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

import Map from '../containers/Map';
import Chat from '../containers/Chat';
import Config from '../containers/Config';

/**
 * 各画面の表示部品
 */
class GridArea extends Component {
  static width = 1200;  // グリッドの横幅
  static height = 2000; // グリッドの縦幅
  static cols = 24; // 横サイズ
  static rows = 40; // 縦サイズ
  static wx = GridArea.width / GridArea.cols; // 1セルの横幅
  static hx = GridArea.height / GridArea.rows;  // 1セルの縦幅

  /**
   * 指定Key画面の横, 縦幅を算出
   * @param {string} key 
   * @return {Object} 横幅, 縦幅
   * @param {w} 横幅
   * @param {h} 縦幅
   */
  _calWidthHight(key) {
    const { layouts } = this.props;
    const layout = layouts.find(layout => layout.i === key);
    const { w, h } = layout;
    const { wx, hx } = GridArea;
    return { w: w * wx, h: h * hx };
  }

  render() {
    const { width, height, cols, rows } = GridArea;
    const { layouts, setLayouts, history, roomId } = this.props;

    return (
      <Paper style={{ margin: 10 }}>
        <ReactGridLayout className="layout" layout={layouts}
          cols={cols} rowHeight={rows}
          width={width} height={height}
          onDragStop={(newLayouts) => setLayouts(newLayouts)}
          onResizeStop={(newLayouts) => setLayouts(newLayouts)}
        >
          {/* マップ画面 */}
          <Paper key={'map-board'}>
            <Map
              roomId={roomId}
              layout={this._calWidthHight('map-board')}
            />
          </Paper>
          {/* チャット画面 */}
          <Paper key={'chat-board'} style={{ backgroundColor: Colors.lightGreen100 }}>
            <Chat
              roomId={roomId}
              layout={this._calWidthHight('chat-board')}
            /> 
          </Paper>
          {/* 設定画面 */}
          <Paper key={'config-board'}>
            <Config
              roomId={roomId}
              history={history}
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
  roomId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};
export default GridArea;