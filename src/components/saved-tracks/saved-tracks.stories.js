/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import { SavedTracks } from './saved-tracks';
import AppContext from '../../context';
import DataContext from '../../data-context';

const outer = {
  display: 'flex',
  justifyContent: 'center',
};

const inner = {
  border: '1px solid grey',
  width: '300px',
};

const context = {
  spotifyApi: {
    getMySavedTracks: () => Promise.resolve({
      body: {
        items: [{
          track: {
            id: 1, name: 'First Single', artists: [{ name: 'Hot Band' }], album: { name: 'Sleeper Hit' },
          },
        }, {
          track: {
            id: 1, name: 'Chart Topper', artists: [{ name: 'Hot Band' }], album: { name: 'Sleeper Hit' },
          },
        }, {
          track: {
            id: 1, name: 'Guns and Bitches', artists: [{ name: 'Sum Rappa' }], album: { name: 'Reference To Marijuana' },
          },
        }, {
          track: {
            id: 1, name: 'Unexpected Flop', artists: [{ name: 'Hot Band' }], album: { name: 'Sleeper Hit' },
          },
        }, {
          track: {
            id: 1, name: 'Song She Wrote', artists: [{ name: 'Pop Diva' }], album: { name: 'Pahp Deevah' },
          },
        }, {
          track: {
            id: 1,
            name: 'Song With a F*****g lot of cursing',
            artists: [{ name: 'Sum Rappa' }],
            album: { name: 'Reference To Marijuana' },
          },
        }],
      },
    }),
  },
};

storiesOf('Saved tracks', module)
  .add('Default', () => (
    <div style={outer}>
      <div style={inner}>
        <AppContext.Provider value={context}>
          <DataContext.Provider value={{ filter: '' }}>
            <SavedTracks />
          </DataContext.Provider>
        </AppContext.Provider>
      </div>
    </div>
  ));
