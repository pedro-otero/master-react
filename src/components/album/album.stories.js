/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { Album } from './album';

const tracks = [{
  name: 'Dark Opening',
  duration_ms: 354784,
}, {
  name: 'Inspiring Ballad',
  duration_ms: 254784,
}, {
  name: 'Departure',
  duration_ms: 199750,
}, {
  name: 'Song Where Another Band Member Sings',
  duration_ms: 236750,
}, {
  name: 'Filler',
  duration_ms: 200750,
}, {
  name: 'Track About The End Of Something',
  duration_ms: 243750,
}];
const searchTracks = [{
  composers: ['Mr. Frontman', 'Goto Producer'],
}, {
  composers: ['Mr. Frontman', 'The Drummer'],
}, {
  composers: ['The Drummer', 'Goto Producer'],
}, {
  composers: ['Mr. Frontman'],
}, {
  composers: ['Mr. Frontman', 'Goto Producer', 'The Drummer', 'Guy Bass'],
}, {
  composers: ['Mr. Frontman', 'The Drummer'],
}];

storiesOf('Album', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Default', () => (
    <Album
        name="Hyped EP"
        artist="The Band"
        albumImg="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        artistImg="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a"
        year="2017"
        progress={100}
        tracks={tracks}
        searchTracks={searchTracks} />
  ));
