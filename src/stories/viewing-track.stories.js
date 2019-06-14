/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Root from '../components/root';
import baseState from './base/baseState.json';
import mockStore from './base/mockStore';

const thisStore = mockStore({
  ...baseState,
  tracks: {
    T1: {
      name: 'Radio Friendly',
      artistId: 'R1',
      albumId: 'L1',
      composers: ['Radio Friendly', 'Hislongtime Collaborator'],
      producers: ['Hislongtime Collaborator', 'Someone Else'],
      credits: {
        'Radio Friendly': ['Vocals', 'Piano'],
        'Histlongtime Collaborator': ['Backing Vocals', 'Writer'],
        'Engineer Guy': ['Mixed by'],
      },
    },
  },
  artists: {
    R1: {
      name: 'One Hit Wonder',
      image: 'https://i.scdn.co/image/c49267a32f21626acd55c8dd5f42c0b9e66994f4  ',
    },
  },
  albums: {
    L1: {
      image: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3',
    },
  },
});

storiesOf('Crews', module)
  .add('Viewing a track', () => (
    <Provider store={thisStore}>
      <MemoryRouter initialEntries={['/track/T1']}>
        <Root redirectUri="some.url" />
      </MemoryRouter>
    </Provider>
  ));
