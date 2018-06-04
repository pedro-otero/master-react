import React from 'react';
import PropTypes from 'prop-types';

import './track-item.css';
import Composers from './composers';

const duration = (millis) => {
  const time = new Date();
  time.setMilliseconds(time.getTime() + millis);
  return `${time.getMinutes()}:${time.getSeconds()}`;
};

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
