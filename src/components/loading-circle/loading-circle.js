import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './loading-circle.css';

const LoadingCircle = ({ message }) => (
  <div className={styles.main}>
    <div className={styles.skFadingCircle}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
        <div
            key={`sk-circle${n}`}
            className={classNames(styles[`sk-circle${n}`], styles.skCircle)}>
        </div>))}
    </div>
    <h1>{message}</h1>
  </div>
);

LoadingCircle.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LoadingCircle;
