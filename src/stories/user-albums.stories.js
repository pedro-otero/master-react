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
      albums: {
        total: 5,
        nextPage: null,
        items: {
          T1: {
            artist: 'Boy',
            name: 'Boy',
          },
          T2: {
            artist: 'Boy',
            name: 'Now A Man',
          },
          T3: {
            artist: 'Girl',
            name: 'Teen Pop',
          },
          T4: {
            artist: 'Band',
            name: 'Wrds Wtht Vwls',
          },
          T5: {
            artist: 'Girl',
            name: 'Pre Mental Breakdown',
          },
        },
      },
    },
  },
});

storiesOf('Crews', module)
  .add('User saved tracks', () => (
    <Provider store={thisStore}>
      <MemoryRouter initialEntries={['/user/albums']}>
        <Root redirectUri="some.url" />
      </MemoryRouter>
    </Provider>
  ));
