import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import globalStyles from '../../index.css';

const StyledLink = ({ className, ...otherProps }) => {
  const classes = classnames(globalStyles.RRlink, className);
  return <Link className={classes} {...otherProps} />;
};

StyledLink.displayName = 'Link';

StyledLink.propTypes = {
  className: PropTypes.any,
};

export default StyledLink;
