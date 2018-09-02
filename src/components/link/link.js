import React from 'react';
import { Link } from 'react-router-dom';

import globalStyles from '../../index.css';

const StyledLink = props => (
  <Link className={globalStyles.RRlink} {...props} />
);

export default StyledLink;
