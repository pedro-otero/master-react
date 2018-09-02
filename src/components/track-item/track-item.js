import React from 'react';
import PropTypes from 'prop-types';

import Link from 'components/Link';
import Composers from 'components/Composers';
import styles from './track-item.css';

const TrackItem = ({
  name, duration, id, composers,
}) =>
  <Link to={`/track/${id}`}>
    <div className={styles.div}>
      <div className={styles.centerBlock}>
        <div className={styles.name}>{name}</div>
        <Composers list={composers} />
      </div>
      <div className={styles.duration}>{duration}</div>
    </div>
  </Link>;

TrackItem.propTypes = {
  composers: PropTypes.array.isRequired,
  duration: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TrackItem;
