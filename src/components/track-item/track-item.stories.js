/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import TrackItem from './track-item';

storiesOf('Track item', module)
  .add('Without composers', () => (
    <TrackItem
        name='Hot New Track'
        millis={25693579} />
  ))
  .add('With composers', () => (
    <TrackItem
        composers="The one, The other"
        name='Hot New Track'
        millis={25693579} />
  ));
