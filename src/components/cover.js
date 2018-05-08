import React from 'react';
import PropTypes from 'prop-types';

const Cover = ({ album }) => (
  <div
      className="albumCover"
      style={{ backgroundImage: `url(${album.images[0].url})` }}>
    <span className="albumYear">{album.release_date.substring(0, 4)}</span>
  </div>);

Cover.propTypes = {
  album: PropTypes.object.isRequired,
};

export default Cover;
