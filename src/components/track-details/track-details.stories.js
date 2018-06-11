/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { TrackDetails } from './track-details';

const bestMatch = {
  composers: ['Realname Ofpopmaster', 'Goto Producer'],
  producers: ['Goto Producer'],
  credits: {
    'Pop Master': ['Vocals', 'Keyboards'],
    'Goto Producer': ['Backing Vocals'],
    'Guy Bass': ['Bass'],
  },
};

storiesOf('Track details', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Default', () => (
    <TrackDetails
        name="Char Topper Everybody's Sick Of"
        artist="Pop Master"
        albumId="albumId"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a"
        year="2016"
        progress={100}
        bestMatch={bestMatch} />
  ));
