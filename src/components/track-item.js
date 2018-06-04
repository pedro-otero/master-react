import React from 'react';
import PropTypes from 'prop-types';

import './track-item.css';
import Composers from './composers';

function duration(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const TrackItem = ({
  number, fromSpotify: { name, duration_ms: millis }, fromSearch: { composers },
}) => <div className="track-item-div">
  <div>
    <div className="track-item-number">{number}</div>
    <div className="track-item-name">
      <div>{name}</div>
      <Composers list={composers} />
    </div>
    <div className="track-item-duration">{duration(millis)}</div>
  </div>
</div>;

TrackItem.propTypes = {
  fromSearch: PropTypes.object.isRequired,
  fromSpotify: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
};

export default TrackItem;
