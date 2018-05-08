import React from 'react';
import PropTypes from 'prop-types';

const Artist = ({ className, name }) => (
  <span>
    <span className={className}>{name}</span>
    <br />
  </span>
);

Artist.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Artist;
