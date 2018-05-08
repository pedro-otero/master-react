import React from 'react';
import PropTypes from 'prop-types';

import './progress.css';

const Progress = ({ size, value }) => (
  <div className={`progress ${size}-progress`}>
    <div className="progress-all"></div>
    <div
        className="progress-done"
        style={{ width: `${value}%` }}></div>
  </div>);

Progress.propTypes = {
  size: PropTypes.oneOf(['big', 'small']).isRequired,
  value: (props, value) => {
    if (props[value] < 0 || props[value] > 100) {
      return Error('"progress" prop out of range (0 <= progress <= 100)');
    }
  },
};

export default Progress;
