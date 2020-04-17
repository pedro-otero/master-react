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
        resolve({ data: {} });
      }
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
