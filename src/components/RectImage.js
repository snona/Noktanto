import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-konva';

class RectImage extends Component {
    render() {
      const { image } = this.props;
      return (
        <Image
          x={image.x}
          y={image.y}
          width={image.width}
          height={image.height}
          image={image.src}
        />
      );
    }
}

RectImage.propTypes = {
  image: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.object.isRequired,
  }).isRequired,
};

export default RectImage;