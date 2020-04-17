/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';
import { MemoryRouter } from 'react-router-dom';

import Root from '../components/root';
import AppContext from '../context';
import me from '../../mock-data/me.json';

const context = {
  spotify: {
    get: url => new Promise((resolve) => {
      if (url === '/me') {
        resolve(me);
      } else if (url === '/me/player') {
        resolve({
          data: {
            item: {
              id: 1,
              name: 'A song',
              artists: [{ name: 'Gifted Singer' }],
              album: { images: [{ url: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730' }] },
            },
          },
        });
      }
    }),
  },
};

storiesOf('Crews', module)
  .add('With a track playing', () => (
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>
    </AppContext.Provider>
  ));
