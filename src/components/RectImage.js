import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-konva';

import ImagesManager from '../utils/ImagesManager';

/**
 * Konvaの画像描画部品
 */
class RectImage extends Component {
    render() {
      const { image } = this.props;
      // 画像一覧より本データを取得
      const img = ImagesManager.getImage(image.src);
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