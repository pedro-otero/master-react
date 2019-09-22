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
    getTrack: () => Promise.resolve({
      body: {
        id: 'T1',
        name: 'Radio Friendly',
        album: { id: 'L1' },
        artists: [{ id: 'R1' }],
      },
    }),
    getAlbum: () => Promise.resolve({
      body: {
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
    }),
    getArtist: () => Promise.resolve({
      body: {
        name: 'One Hit Wonder',
        images: [{ url: 'https://i.scdn.co/image/c49267a32f21626acd55c8dd5f42c0b9e66994f4' }],
      },
    }),
    getMyCurrentPlaybackState: () => Promise.resolve({
      body: {},
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
  .add('Viewing a track', () => (
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/track/T1']}>
        <Root />
      </MemoryRouter>
    </AppContext.Provider>
  ));
