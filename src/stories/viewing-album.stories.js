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
      name: 'Club Banger',
      composers: ['Ghost Writer', 'Credit Vulture', 'Sampled Artist', 'Hot Producer'],
      duration: '3:34',
    },
    T2: {
      name: 'Hollow Track',
      composers: ['Ghost Writer', 'Credit Vulture', 'Hot Producer'],
      duration: '3:16',
    },
    T3: {
      name: 'Cheesily Sad Song',
      composers: ['Ghost Writer', 'Credit Vulture', 'Hot Producer'],
      duration: '4:07',
    },
    T4: {
      name: 'Not Even Fans Like It',
      composers: ['Someone Else', 'Credit Vulture', 'Hot Producer'],
      duration: '3:58',
    },
    T5: {
      name: 'Included Out Of Pity',
      composers: ['One Hit Wonder', 'Hot Producer'],
      duration: '2:44',
    },
  },
  artists: {
    R1: {
      name: 'One Hit Wonder',
      image: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730',
    },
  },
  albums: {
    L1: {
      name: 'Sophomore',
      artistId: 'R1',
      image: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3',
      trackIds: ['T1', 'T2', 'T3', 'T4', 'T5'],
    },
  },
});

storiesOf('Crews', module)
  .add('Viewing an album', () => (
    <Provider store={thisStore}>
      <MemoryRouter initialEntries={['/album/L1']}>
        <Root redirectUri="some.url" />
      </MemoryRouter>
    </Provider>
  ));
