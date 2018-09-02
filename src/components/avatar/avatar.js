import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImageDiv = styled.div`
  border-radius: 100%;
  background-image: url(${({ src }) => src});
  background-size: cover;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  flex: 0 0 ${({ size }) => size};
`;

const Avatar = ({ src, size }) => (
  <ImageDiv src={src} size={size} />
);

Avatar.propTypes = {
  size: PropTypes.string.isRequited,
  src: PropTypes.string.isRequited,
};

export default Avatar;

