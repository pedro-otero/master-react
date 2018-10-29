import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const XTRA_SMALL = '(max-width: 320px)';
const SMALL = '(min-width: 321px) and (max-width: 768px)';
const MEDIUM = '(min-width: 769px) and (max-width: 1280px)';
const LARGE = '(min-width: 1281px) and (max-width: 1919px)';
const XTRA_LARGE = '(min-width: 1920px)';

const dimensions = size => `
  min-width: ${size};
  max-width: ${size};
  min-height: ${size};
  max-height: ${size};
`;

const breakpointSize = (def, size) => `
  @media ${def} {
    ${dimensions(size)}  
  }
`;

const Image = styled.div`
  background-image: url(${({ src }) => src});
  background-size: cover;
  ${({ rounded }) => (rounded ? 'border-radius: 100%;' : '')}
  ${({ xs }) => (xs ? breakpointSize(XTRA_SMALL, xs) : '')}
  ${({ sm }) => (sm ? breakpointSize(SMALL, sm) : '')}
  ${({ md }) => (md ? breakpointSize(MEDIUM, md) : '')}
  ${({ lg }) => (lg ? breakpointSize(LARGE, lg) : '')}
  ${({ xl }) => (xl ? breakpointSize(XTRA_LARGE, xl) : '')}
  ${({ size }) => (size ? dimensions(size) : '')}
`;

Image.propTypes = {
  lg: PropTypes.string,
  md: PropTypes.string,
  rounded: PropTypes.bool,
  size: PropTypes.string,
  sm: PropTypes.string,
  src: PropTypes.string,
  xl: PropTypes.string,
  xs: PropTypes.string,
};

export default Image;
