import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import styled from 'styled-components';

import globalStyles from '../../index.css';

const StrippedDownLink = styled(Link)`
  all: unset;
  cursor: pointer;
`;

const StyledLink = ({ className, ...otherProps }) => {
  const classes = classnames(globalStyles.RRlink, className);
  return <StrippedDownLink className={classes} {...otherProps} />;
};

StyledLink.displayName = 'Link';

StyledLink.propTypes = {
  className: PropTypes.any,
};

export default StyledLink;
