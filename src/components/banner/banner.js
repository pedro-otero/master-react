import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './banner.css';

const Banner = ({ src, className, children }) => {
  const gradient = 'linear-gradient(rgba(0,0,0,0.1) 65%, black)';
  const layers = image => ({
    backgroundImage: `${gradient}, url(${image})`,
  });
  return (
    <div className="banner-main">
      <div className={classnames('banner-content', className)}>
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
  src: PropTypes.string,
};

export default Banner;
