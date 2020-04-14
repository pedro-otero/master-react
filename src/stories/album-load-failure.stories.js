/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';
import { MemoryRouter } from 'react-router-dom';

import Root from '../components/root';
import AppContext from '../context';
import me from '../../mock-data/me.json';

const context = {
  spotify: {
    get: url => new Promise((resolve, reject) => {
      if (url === '/me') {
        resolve(me);
      } else if (url === '/albums/L1') {
        reject(Error());
      } else if (url === '/me/player') {
        resolve({ data: {} });
      }
    }),
  },
  observeAlbumSearch: () => ({
    subscribe: () => ({ unsubscribe: () => {} }),
  }),
};

storiesOf('Crews', module)
  .add('Failure to load album', () => (
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/album/L1']}>
        <Root />
      </MemoryRouter>
    </AppContext.Provider>
  ));
