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
            name: 'album of song',
            release_date: '2005',
            images: [{ url: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3' }],
            artists: [{ id: 'AR1' }],
            tracks: {
              items: [{
                id: 'T1',
                name: 'title of song',
                duration_ms: 1000,
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
        resolve({
          data: {
            item: {
              id: 1,
              name: 'Song being played',
              artists: [{ name: 'Artist of the song that is being played' }],
              album: { images: [{ url: '' }] },
            },
          },
        });
      } else if (url === '/me/albums') {
        resolve({
          data: {
            items: [{ album: { id: 'L1', name: 'Boy', artists: [{ name: 'Boy' }] } },
              { album: { id: 'L1', name: 'Now A Man', artists: [{ name: 'Boy' }] } },
              { album: { id: 'L1', name: 'Teen Pop', artists: [{ name: 'Girl' }] } },
              { album: { id: 'L1', name: 'Wrds Wtht Vwls', artists: [{ name: 'Band' }] } },
              { album: { id: 'L1', name: 'Pre Mental Breakdown', artists: [{ name: 'Girl' }] } }],
          },
        });
      }
    }),
  },
  observeAlbumSearch: () => ({
    subscribe: (subscriber) => {
      subscriber.next({
        bestMatch: {
          tracks: [{
            id: 'T1',
            name: 'track #1',
            composers: ['Radio Friendly', 'Hislongtime Collaborator'],
            producers: ['Hislongtime Collaborator', 'Someone Else'],
            credits: {
              'Radio Friendly': ['Vocals', 'Piano'],
              'Histlongtime Collaborator': ['Backing Vocals', 'Writer'],
              'Engineer Guy': ['Mixed by'],
            },
          }],
        },
        progress: 100,
      });
      return { unsubscribe: () => {} };
    },
  }),
};

storiesOf('Crews', module)
  .add('User saved albums', () => (
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/user/albums']}>
        <Root />
      </MemoryRouter>
    </AppContext.Provider>
  ));
