import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import styles from './track-item.css';

const SmallText = styled.span`
  font-size: smaller;
`;

const TrackItem = ({
  name, duration, id, composers,
}) =>
  <Link to={`/track/${id}`}>
    <div className={styles.div}>
      <div className={styles.centerBlock}>
        <div className={styles.name}>{name}</div>
        {composers && <SmallText>({composers})</SmallText>}
      </div>
      <div className={styles.duration}>{duration}</div>
    </div>
  </Link>;

TrackItem.propTypes = {
  composers: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TrackItem;
