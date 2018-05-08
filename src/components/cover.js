import React from 'react';
import PropTypes from 'prop-types';

import './cover.css';

const Cover = ({ album, imageClass, yearClass }) => (
  <div
      className={`image${imageClass ? ` ${imageClass}` : ''}`}
      style={{ backgroundImage: `url(${album.images[0].url})` }}>
    <span className={`year${yearClass ? ` ${yearClass}` : ''}`}>{album.release_date.substring(0, 4)}</span>
  </div>);

Cover.propTypes = {
  album: PropTypes.object.isRequired,
  imageClass: PropTypes.string,
  yearClass: PropTypes.string,
};

export default Cover;
