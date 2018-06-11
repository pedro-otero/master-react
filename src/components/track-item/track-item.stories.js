/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import TrackItem from './track-item';

storiesOf('Track item', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Without composers', () => (
    <TrackItem
        name='Hot New Track'
        millis={25693579} />
  ))
  .add('With composers', () => (
    <TrackItem
        composers={['The one', 'The other']}
        name='Hot New Track'
        millis={25693579} />
  ));
