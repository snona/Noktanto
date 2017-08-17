import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage, RegularPolygon } from 'react-konva';
import Hex from '../components/Hex';

class MapArea extends Component {
    render() {
      const { hexes } = this.props;
      const viewHexes = Object.keys(hexes).map(key => <Hex hex={hexes[key]} />);
      return (
        <Stage width={700} height={700}>
          <Layer>
            {viewHexes}
          </Layer>
          <Layer>
            <RegularPolygon
              x={150}
              y={150}
              sides={6}
              radius={15}
              fill={'#1abc9c'}
              stroke={'#16a085'}
              strokeWidth={2}
              key={'moveable'}
              draggable={true}
            />
          </Layer>
        </Stage>
      );
    }
}

MapArea.propTypes = {
  hexes: PropTypes.object.isRequired,
};

export default MapArea;