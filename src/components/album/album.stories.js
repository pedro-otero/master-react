/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import { ViewContext } from 'components/View';
import { Album } from './album';
import AppContext from '../../context';

const spotifyApi = {
  getAlbum: () => Promise.resolve({
    body: {
      name: 'Hyped EP',
      artists: [{}],
      tracks: {
        items: [{
          name: 'Dark Opening',
          duration_ms: 181000,
        }, {
          name: 'Inspiring Ballad',
          duration_ms: 209000,
        }, {
          name: 'Departure',
          duration_ms: 291000,
        }, {
          name: 'Song Where Another Band Member Sings',
          duration_ms: 176000,
        }, {
          name: 'Filler',
          duration_ms: 226000,
        }, {
          name: 'Track About The End Of Something',
          duration_ms: 317000,
        }],
      },
      images: [{ url: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3' }],
      release_date: '2017',
    },
  }),
  getArtist: () => Promise.resolve({
    body: {
      name: 'The Band',
      images: [{ url: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3' }],
    },
  }),
};

storiesOf('Album', module)
  .add('Just started', () => {
    const context = {
      spotifyApi: {
        getAlbum: () => new Promise(() => {}),
      },
      observeAlbumSearch: () => ({
        subscribe: () => ({
          unsubscribe() {},
        }),
      }),
    };
    return (
      <AppContext.Provider value={context}>
        <ViewContext.Provider value={{ setIsError: () => {} }}>
          <Album />
        </ViewContext.Provider>
      </AppContext.Provider>
    );
  })
  .add('Album and artist loaded', () => {
    const context = {
      spotifyApi,
      observeAlbumSearch: () => ({
        subscribe: () => ({
          unsubscribe() {},
        }),
      }),
    };
    return (
      <AppContext.Provider value={context}>
        <ViewContext.Provider value={{ setIsError: () => {} }}>
          <Album />
        </ViewContext.Provider>
      </AppContext.Provider>
    );
  })
  .add('Some credits found', () => {
    const context = {
      spotifyApi,
      observeAlbumSearch: () => ({
        subscribe: (subscriber) => {
          subscriber.next({
            bestMatch: {
              tracks: [{
                composers: ['Goto Producer'],
              }, {
                composers: [],
              }, {
                composers: ['Goto Producer'],
              }, {
                composers: [],
              }, {
                composers: ['Goto Producer'],
              }, {
                composers: [],
              }],
            },
            progress: 50,
          });
          return { unsubscribe() {} };
        },
      }),
    };
    return (
      <AppContext.Provider value={context}>
        <ViewContext.Provider value={{ setIsError: () => {} }}>
          <Album />
        </ViewContext.Provider>
      </AppContext.Provider>
    );
  })
  .add('Full', () => {
    const context = {
      spotifyApi,
      observeAlbumSearch: () => ({
        subscribe: (subscriber) => {
          subscriber.next({
            bestMatch: {
              tracks: [{
                composers: ['Mr. Frontman', 'Goto Producer'],
              }, {
                composers: ['Mr. Frontman', 'The Drummer'],
              }, {
                composers: ['Goto Producer', 'Goto Producer'],
              }, {
                composers: ['Mr. Frontman'],
              }, {
                composers: ['Mr. Frontman', 'Goto Producer', 'The Drummer', 'Guy Bass'],
              }, {
                composers: ['Mr. Frontman', 'The Drummer'],
              }],
            },
            progress: 100,
          });
          return { unsubscribe() {} };
        },
      }),
    };
    return (
      <AppContext.Provider value={context}>
        <ViewContext.Provider value={{ setIsError: () => {} }}>
          <Album />
        </ViewContext.Provider>
      </AppContext.Provider>
    );
  });
