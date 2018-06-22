import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './progress.css';

const Progress = ({ size, value }) => (
  <div className={classnames(styles.progress, styles[`${size}-progress`])}>
    <div className={styles.progressAll}></div>
    <div
        className={styles.progressDone}
        style={{ width: `${value}%` }}></div>
  </div>);

Progress.propTypes = {
  size: PropTypes.oneOf(['big', 'small']).isRequired,
  value: (props, value) => {
    if (props[value] < 0 || props[value] > 100) {
      return Error('"progress" prop out of range (0 <= progress <= 100)');
    }
    return null;
  },
};

export default Progress;
