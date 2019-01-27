import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StrippedDownLink = styled(Link)`
  all: unset;
  cursor: pointer;
`;

const StyledLink = ({ className, ...otherProps }) => {
  const Component = otherProps.to ? StrippedDownLink : Fragment;
  return <Component className={className} {...otherProps} />;
};

StyledLink.displayName = 'Link';

StyledLink.propTypes = {
  className: PropTypes.any,
};

export default StyledLink;
