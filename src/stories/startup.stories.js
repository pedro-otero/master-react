/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';
import { MemoryRouter } from 'react-router-dom';

import Root from '../components/root';
import AppContext from '../context';

const context = {
  spotifyApi: {
    getMe: () => Promise.resolve({
      body: {
        id: 'clever_nick87',
        display_name: 'User McLastname',
        images: [{ url: 'https://i.imgflip.com/wahid.jpg' }],
        country: 'CA',
      },
    }),
    getTrack: () => Promise.reject(Error()),
    getMyCurrentPlaybackState: () => Promise.resolve({
      body: {
      },
    }),
  },
};

storiesOf('Crews', module)
  .add('Startup', () => (
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>
    </AppContext.Provider>
  ));
