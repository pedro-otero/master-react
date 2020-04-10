/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';
import { MemoryRouter } from 'react-router-dom';

import Root from '../components/root';
import AppContext from '../context';
import me from '../../mock-data/me.json';
import track from '../../mock-data/track--radio-friendly.json';

const context = {
  spotify: {
    get: url => new Promise((resolve) => {
      if (url === '/me') {
        resolve(me);
      } else if (url === '/tracks/T1') {
        resolve(track);
      } else if (url === '/albums/L1') {
        resolve({
          data: {
            id: 'L1',
            name: 'Sophomore',
            release_date: '2005',
            images: [{ url: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3' }],
            artists: [{ id: 'R1' }],
            tracks: {
              items: [{
                id: 'T1',
                name: 'Club Banger',
                duration_ms: 214000,
              }, {
                id: 'T2',
                name: 'Hollow Track',
                duration_ms: 196000,
              }, {
                id: 'T3',
                name: 'Cheesily Sad Song',
                duration_ms: 247000,
              }, {
                id: 'T4',
                name: 'Not Even Fans Like It',
                duration_ms: 238000,
              }, {
                id: 'T5',
                name: 'Included Out Of Pity',
                duration_ms: 164000,
              }],
            },
          },
        });
      } else if (url === '/artists/R1') {
        resolve({
          data: {
            name: 'One Hit Wonder',
            images: [{ url: 'https://i.scdn.co/image/c49267a32f21626acd55c8dd5f42c0b9e66994f4' }],
          },
        });
      } else if (url === '/me/player') {
        resolve({ data: {} });
      }
    }),
  },
  observeAlbumSearch: () => ({
    subscribe: (subscriber) => {
      subscriber.next({
        bestMatch: {
          tracks: [{
            id: 'T1',
            composers: ['Ghost Writer', 'Credit Vulture', 'Sampled Artist', 'Hot Producer'],
            producers: [],
            credits: {},
          }, {
            id: 'T2',
            composers: ['Ghost Writer', 'Credit Vulture', 'Hot Producer'],
            producers: [],
            credits: {},
          }, {
            id: 'T3',
            composers: ['Ghost Writer', 'Credit Vulture', 'Hot Producer'],
            producers: [],
            credits: {},
          }, {
            id: 'T4',
            composers: ['Someone Else', 'Credit Vulture', 'Hot Producer'],
            producers: [],
            credits: {},
          }, {
            id: 'T5',
            composers: ['One Hit Wonder', 'Hot Producer'],
            producers: [],
            credits: {},
          }],
        },
        progress: 100,
      });
      return { unsubscribe: () => {} };
    },
  }),
};

storiesOf('Crews', module)
  .add('Viewing an album', () => (
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/album/L1']}>
        <Root />
      </MemoryRouter>
    </AppContext.Provider>
  ));
