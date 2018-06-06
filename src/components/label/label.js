import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ className, value }) => (
  <span>
    <span className={className}>{value}</span>
    <br />
  </span>
);

Label.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default Label;
