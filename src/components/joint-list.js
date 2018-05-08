import React from 'react';
import PropTypes from 'prop-types';

const JointList = ({
  values, start, end, className,
}) => {
  if (!values.length) {
    return null;
  }
  return (
    <span className={className}>{start}{values.join(', ')}{end}</span>
  );
};

JointList.propTypes = {
  className: PropTypes.string,
  end: PropTypes.string,
  start: PropTypes.string,
  values: PropTypes.array.isRequired,
};

export default JointList;
