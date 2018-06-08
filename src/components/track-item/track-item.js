import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './track-item.css';
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
      className="RR-link">
    <div className="track-item-div">
      <div>
        <div className="track-item-center-block">
          <div className="track-item-name">{name}</div>
          <Composers list={composers} />
        </div>
        <div className="track-item-duration">{duration(millis)}</div>
      </div>
    </div>
  </Link>;

TrackItem.propTypes = {
  composers: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  millis: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default TrackItem;
