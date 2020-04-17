/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import { ViewContext } from 'components/View';
import { Artist } from './artist';
import AppContext from '../../context';
import DataContext from '../../data-context';

storiesOf('Artist', module)
  .add('With albums', () => {
    const context = {
      spotify: {
        get: url => new Promise((resolve) => {
          if (url === '/artists/R1') {
            resolve({
              data: {
                name: 'Somebody Famous',
                images: [{ url: 'https://i.scdn.co/image/0a4c9792c52ec21c3b881542e0739d6f605799b8' }],
              },
            });
          } else if (url === '/artists/R1/albums') {
            resolve({
              data: {
                offset: 0,
                limit: 5,
                total: 5,
                items: [{
                  id: 1,
                  name: 'Acclaimed Debut',
                  images: [{ url: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3' }],
                  release_date: '2007',
                  available_markets: ['CA'],
                  album_type: 'album',
                  album_group: 'album',
                }, {
                  id: 1,
                  name: 'Failing Too High Expectations',
                  images: [{ url: 'https://i.scdn.co/image/20fccd3b7b907c57a1f8a21660843bac5967b5e8' }],
                  release_date: '2009',
                  available_markets: ['CA'],
                  album_type: 'album',
                  album_group: 'album',
                }, {
                  id: 1,
                  name: 'Comeback',
                  images: [{ url: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730' }],
                  release_date: '2014',
                  available_markets: ['CA'],
                  album_type: 'album',
                  album_group: 'album',
                }, {
                  id: 1,
                  name: 'Comeback (Deluxe Edition)',
                  images: [{ url: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730' }],
                  release_date: '2015',
                  available_markets: ['CA'],
                  album_type: 'album',
                  album_group: 'album',
                }, {
                  id: 1,
                  name: 'Too Big To Fail',
                  images: [{ url: 'https://i.scdn.co/image/617f0d587125577484d73dcd6492aa7f027d45b4' }],
                  release_date: '2017',
                  available_markets: ['CA'],
                  album_type: 'album',
                  album_group: 'album',
                }, {
                  id: 1,
                  name: 'Chart Topper',
                  images: [{ url: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3' }],
                  release_date: '2017',
                  album_type: 'single',
                  album_group: 'single',
                  available_markets: ['CA'],
                }, {
                  id: 1,
                  name: 'Too Big To Fail',
                  images: [{ url: 'https://i.scdn.co/image/20fccd3b7b907c57a1f8a21660843bac5967b5e8' }],
                  release_date: '2017',
                  album_type: 'single',
                  album_group: 'single',
                  available_markets: ['CA'],
                }, {
                  id: 1,
                  name: 'Flop',
                  images: [{ url: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730' }],
                  release_date: '2018',
                  album_type: 'single',
                  album_group: 'single',
                  available_markets: ['CA'],
                }],
              },
            });
          }
        }),
      },
    };
    return (
      <AppContext.Provider value={context}>
        <DataContext.Provider value={{ profile: { country: 'CA' } }}>
          <ViewContext.Provider value={{ setIsError: () => {} }}>
            <Artist id="R1" />
          </ViewContext.Provider>
        </DataContext.Provider>
      </AppContext.Provider>
    );
  })
  .add('With no albums', () => {
    const context = {
      spotify: {
        get: url => new Promise((resolve) => {
          if (url === '/artists/R1') {
            resolve({
              data: {
                name: 'Somebody Famous',
                images: [{ url: 'https://i.scdn.co/image/0a4c9792c52ec21c3b881542e0739d6f605799b8' }],
              },
            });
          }
        }),
      },
    };
    return (
      <AppContext.Provider value={context}>
        <DataContext.Provider value={{ profile: { country: 'CA' } }}>
          <ViewContext.Provider value={{ setIsError: () => {} }}>
            <Artist id="R1" />
          </ViewContext.Provider>
        </DataContext.Provider>
      </AppContext.Provider>
    );
  });
