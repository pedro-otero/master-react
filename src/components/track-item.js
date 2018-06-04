import React from 'react';
import PropTypes from 'prop-types';

import './track-item.css';
import Composers from './composers';

const duration = millis => '0:01';

const TrackItem = ({
  number, fromSpotify: { name, duration_ms: millis }, fromSearch: { composers },
}) => <div className="track-item-div">
  <div>
    <div className="track-item-number">{number}</div>
    <div className="track-item-name">{name}</div>
    <div className="track-item-duration">{duration(millis)}</div>
  </div>
  <Composers list={composers} />
</div>;

TrackItem.propTypes = {
  fromSearch: PropTypes.object.isRequired,
  fromSpotify: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
};

export default TrackItem;
