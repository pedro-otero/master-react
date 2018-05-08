import React from 'react';
import PropTypes from 'prop-types';

import './banner.css';

const Banner = ({ src, className, children }) => {
  const contentClassName = `banner-content${className ? ` ${className}` : ''}`;
  const gradient = 'linear-gradient(rgba(0,0,0,0.1) 65%, black)';
  const layers = image => ({
    backgroundImage: `${gradient}, url(${image})`,
  });
  return (
    <div className="banner-main">
      <div className={contentClassName}>
        {children}
      </div>
      <div
          className="banner-background"
          style={layers(src)}></div>
    </div>);
};

Banner.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
};

export default Banner;
