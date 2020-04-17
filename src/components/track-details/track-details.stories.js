/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import { ViewContext } from 'components/View';
import { TrackDetails } from './track-details';
import AppContext from '../../context';

const spotify = {
  get: url => new Promise((resolve) => {
    if (url === '/tracks/T1') {
      resolve({
        data: {
          name: "Char Topper Everybody's Sick Of",
          album: { id: 'L1' },
          artists: [{ id: 'R1' }],
        },
      });
    } else if (url === '/albums/L1') {
      resolve({
        data: {
          artists: [{}],
          tracks: {
            items: [{
              name: "Char Topper Everybody's Sick Of",
            }],
          },
          images: [{ url: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3' }],
          release_date: '2016',
        },
      });
    } else if (url === '/artists/R1') {
      resolve({
        data: {
          name: 'Pop Master',
          images: [{ url: 'https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a' }],
        },
      });
    }
  }),
};

storiesOf('Track details', module)
  .add('Just started', () => {
    const context = {
      spotify: {
        get: () => new Promise(() => {}),
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
          <TrackDetails trackId="T1" />
        </ViewContext.Provider>
      </AppContext.Provider>
    );
  }).add('With Spotify data loaded', () => {
    const context = {
      spotify,
      observeAlbumSearch: () => ({
        subscribe: () => ({
          unsubscribe() {},
        }),
      }),
    };
    return (
      <AppContext.Provider value={context}>
        <ViewContext.Provider value={{ setIsError: () => {} }}>
          <TrackDetails trackId="T1" />
        </ViewContext.Provider>
      </AppContext.Provider>
    );
  })
  .add('Found composers', () => {
    const context = {
      spotify,
      observeAlbumSearch: () => ({
        subscribe: (subscriber) => {
          subscriber.next({
            bestMatch: {
              tracks: [{
                id: 'T1',
                composers: ['Realname Ofpopmaster', 'Goto Producer'],
                producers: [],
                credits: {},
              }],
            },
            progress: 50,
          });
          return {
            unsubscribe() {},
          };
        },
      }),
    };
    return (
      <AppContext.Provider value={context}>
        <ViewContext.Provider value={{ setIsError: () => {} }}>
          <TrackDetails trackId="T1" />
        </ViewContext.Provider>
      </AppContext.Provider>
    );
  })
  .add('Full', () => {
    const context = {
      spotify,
      observeAlbumSearch: () => ({
        subscribe: (subscriber) => {
          subscriber.next({
            bestMatch: {
              tracks: [{
                id: 'T1',
                composers: ['Realname Ofpopmaster', 'Goto Producer'],
                producers: ['Goto Producer'],
                credits: {
                  'Pop Master': ['Vocals', 'Keyboards'],
                  'Goto Producer': ['Backing Vocals'],
                  'Guy Bass': ['Bass'],
                },
              }],
            },
            progress: 100,
          });
          return {
            unsubscribe() {},
          };
        },
      }),
    };
    return (
      <AppContext.Provider value={context}>
        <ViewContext.Provider value={{ setIsError: () => {} }}>
          <TrackDetails trackId="T1" />
        </ViewContext.Provider>
      </AppContext.Provider>
    );
  });
