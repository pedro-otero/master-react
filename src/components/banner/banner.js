import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import './banner.css';

const Background = styled.div`
  width: 100%;
  margin-bottom: 10px;
  filter: brightness(0.6) blur(10px);
  background-position: center;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 0;
  background-image: linear-gradient(rgba(0,0,0,0.1) 65%, black), url(${props => props.src})
`;

const Banner = ({ src, className, children }) => (
  <div className="banner-main">
    <div className="banner-content">
      <div className={classnames('banner-content', className)}>
        {children}
      </div>
    </div>
    <Background src={src} />
  </div>);

Banner.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string,
  src: PropTypes.string,
};

export default Banner;
