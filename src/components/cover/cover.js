import React from 'react';
import PropTypes from 'prop-types';

import './cover.css';

const Cover = ({
  src,
  year,
  imageClass,
  yearClass,
}) => {
  const jointImageClass = `image${imageClass ? ` ${imageClass}` : ''}`;
  const jointYearClass = `year${yearClass ? ` ${yearClass}` : ''}`;
  const imageStyle = { backgroundImage: `url(${src})` };

  return <div
      className={jointImageClass}
      style={imageStyle}>
    <span className={jointYearClass}>
      {year}
    </span>
  </div>;
};

Cover.propTypes = {
  imageClass: PropTypes.string,
  src: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  yearClass: PropTypes.string,
};

export default Cover;
