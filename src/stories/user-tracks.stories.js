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
  user: {
    ...baseState.user,
    library: {
      tracks: {
        total: 5,
        nextPage: null,
        items: {
          T1: {
            name: 'Adjective Noun',
            artist: 'Boy',
            album: 'Boy',
          },
          T2: {
            name: 'Concept',
            artist: 'Boy',
            album: 'Now A Man',
          },
          T3: {
            name: 'Soundtrack of Some Movie',
            artist: 'Girl',
            album: 'Teen Pop',
          },
          T4: {
            name: 'Long Name Signaling They Are Super Clever',
            artist: 'Band',
            album: 'Wrds Wtht Vwls',
          },
          T5: {
            name: 'Song About Sexuality',
            artist: 'Girl',
            album: 'Pre Mental Breakdown',
          },
        },
      },
    },
  },
});

storiesOf('Crews', module)
  .add('User saved tracks', () => (
    <Provider store={thisStore}>
      <MemoryRouter initialEntries={['/user/tracks']}>
        <Root redirectUri="some.url" />
      </MemoryRouter>
    </Provider>
  ));
