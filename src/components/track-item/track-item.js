import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './track-item.css';
import globalStyles from '../../index.css';
import Composers from '../composers/composers';

function duration(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const TrackItem = ({
  name, millis, id, composers,
}) =>
  <Link
      to={`/track/${id}`}
      className={globalStyles.RRlink}>
    <div className={styles.div}>
      <div className={styles.centerBlock}>
        <div className={styles.name}>{name}</div>
        <Composers list={composers} />
      </div>
      <div className={styles.duration}>{duration(millis)}</div>
    </div>
  </Link>;

TrackItem.propTypes = {
  composers: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  millis: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default TrackItem;
