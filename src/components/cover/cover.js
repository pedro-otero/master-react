import React from 'react';
import PropTypes from 'prop-types';

import './cover.css';

const Cover = ({
  album: {
    images,
    release_date: releaseDate,
  },
  imageClass,
  yearClass,
}) => {
  const jointImageClass = `image${imageClass ? ` ${imageClass}` : ''}`;
  const jointYearClass = `year${yearClass ? ` ${yearClass}` : ''}`;
  const imageStyle = { backgroundImage: `url(${images[0].url})` };

  return <div
      className={jointImageClass}
      style={imageStyle}>
    <span className={jointYearClass}>
      {releaseDate.substring(0, 4)}
    </span>
  </div>;
};

Cover.propTypes = {
  album: PropTypes.object.isRequired,
  imageClass: PropTypes.string,
  yearClass: PropTypes.string,
};

export default Cover;
