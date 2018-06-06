/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import TrackItem from './track-item';

storiesOf('Track item', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('With composers', () => (
    <TrackItem
        fromSearch={{
      composers: ['The one', 'The other'],
    }}
        fromSpotify={{
    name: 'Hot New Track',
    duration_ms: 25693579,
  }} />
  ));
