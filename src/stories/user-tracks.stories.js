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
      } else if (url === '/me/tracks') {
        resolve({
          data: {
            items: [{
              track: {
                id: 'T1', name: 'Adjective Noun', artists: [{ name: 'Adjective Noun' }], album: { name: 'Boy' },
              },
            },
            {
              track: {
                id: 'T2', name: 'Concept', artists: [{ name: 'Concept' }], album: { name: 'Boy' },
              },
            },
            {
              track: {
                id: 'T3', name: 'Soundtrack of Some Movie', artists: [{ name: 'Soundtrack of Some Movie' }], album: { name: 'Girl' },
              },
            },
            {
              track: {
                id: 'T4', name: 'Long Name Signaling They Are Super Clever', artists: [{ name: 'Long Name Signaling They Are Super Clever' }], album: { name: 'Band' },
              },
            },
            {
              track: {
                id: 'T5', name: 'Song About Sexuality', artists: [{ name: 'Song About Sexuality' }], album: { name: 'Girl' },
              },
            }],
          },
        });
      }
    }),
  },
};

storiesOf('Crews', module)
  .add('User saved tracks', () => (
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/user/tracks']}>
        <Root />
      </MemoryRouter>
    </AppContext.Provider>
  ));
