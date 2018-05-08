import React from 'react';
import PropTypes from 'prop-types';

const Cover = ({ album, imageClass }) => (
  <div
      className={`image${imageClass ? ` ${imageClass}` : ''}`}
      style={{ backgroundImage: `url(${album.images[0].url})` }}>
    <span className="year">{album.release_date.substring(0, 4)}</span>
  </div>);

Cover.propTypes = {
  album: PropTypes.object.isRequired,
  imageClass: PropTypes.string,
};

export default Cover;
