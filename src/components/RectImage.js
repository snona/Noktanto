import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-konva';

import ImagesManager from '../utils/ImagesManager';

class RectImage extends Component {
    render() {
      const { image } = this.props;
      const img = ImagesManager.hasImage(image.src) ? ImagesManager.getImage(image.src) : ImagesManager.addImage(image.src);
      return (
        <Image
          x={image.x}
          y={image.y}
          width={image.width}
          height={image.height}
          image={img}
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
    src: PropTypes.string.isRequired,
  }).isRequired,
};

export default RectImage;