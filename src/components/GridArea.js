import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';
import Paper from 'material-ui/Paper';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

class GridArea extends Component {
  static width = 1200;
  static height = 2000;
  static cols = 24;
  static rows = 40;
  static wx = GridArea.width / GridArea.cols;
  static hx = GridArea.height / GridArea.rows;

  updateLayouts(newLayouts) {
    const { layouts } = this.props;
    return newLayouts.map(newLayout => {
      const layout = layouts.find(layout => layout.i === newLayout.i);
      newLayout.style = layout.style;
      newLayout.node = layout.node;
      return newLayout;
    });
  }

  render() {
    const { width, height, cols, rows } = GridArea;
    const { layouts, setLayouts } = this.props;
    const items = layouts.map(layout => {
      layout.style.width = layout.w * GridArea.wx;
      layout.style.height = layout.h * GridArea.hx;
      return (
        <Paper key={layout.i} style={layout.style}>
          {layout.node}
        </Paper>
      );
    })
    return (
      <Paper style={{ margin: 10 }}>
        <ReactGridLayout className="layout" layout={layouts}
          cols={cols} rowHeight={rows}
          width={width} height={height}
          onDragStop={(newLayouts) => setLayouts(this.updateLayouts(newLayouts))}
          onResizeStop={(newLayouts) => setLayouts(this.updateLayouts(newLayouts))}
        >
          {items}
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