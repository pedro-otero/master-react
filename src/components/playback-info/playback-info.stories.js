/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import PlaybackInfo from './playback-info';
import AppContext from '../../context';

storiesOf('Playback Info', module)
  .add('Default', () => {
    const context = {
      spotify: {
        get: url => new Promise((resolve) => {
          if (url === '/me/player') {
            resolve({
              data: {
                item: {
                  id: 1,
                  name: 'Give It To Me',
                  artists: [{ name: 'Cliche Pop' }],
                  album: { images: [{ url: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730' }] },
                },
              },
            });
          }
        }),
      },
    };
    return (
      <AppContext.Provider value={context}>
        <PlaybackInfo isVisible />
      </AppContext.Provider>
    );
  })
  .add('Wrapped texts', () => {
    const context = {
      spotify: {
        get: url => new Promise((resolve) => {
          if (url === '/me/player') {
            resolve({
              data: {
                item: {
                  id: 1,
                  name: 'If this title is too long then it should wrap because otherwise it would take many lines',
                  artists: [{ name: 'iamamiwhoami willibe whoimsupossedtobe will.i.am whatever i just want to break this' }],
                  album: { images: [{ url: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730' }] },
                },
              },
            });
          }
        }),
      },
    };
    return (
      <AppContext.Provider value={context}>
        <PlaybackInfo isVisible />
      </AppContext.Provider>
    );
  });
