import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './cover.css';

const Cover = ({
  src,
  year,
  imageClass,
  yearClass,
}) => {
  const imageStyle = { backgroundImage: `url(${src})` };

  return <div
      className={classnames('image', imageClass)}
      style={imageStyle}>
    <span className={classnames('year', yearClass)}>
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
