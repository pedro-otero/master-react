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
  artists: {
    R1: { failed: true },
  },
});

storiesOf('Crews', module)
  .add('Failure to load artist', () => (
    <Provider store={thisStore}>
      <MemoryRouter initialEntries={['/artist/R1']}>
        <Root redirectUri="some.url" />
      </MemoryRouter>
    </Provider>
  ));
