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
    playbackInfo: {
      itemId: 'T1',
      name: 'A song',
      artist: 'Gifted Singer',
      image: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730',
    },
  },
});

storiesOf('Crews', module)
  .add('With a track playing', () => (
    <Provider store={thisStore}>
      <MemoryRouter initialEntries={['/']}>
        <Root redirectUri="some.url" />
      </MemoryRouter>
    </Provider>
  ));
