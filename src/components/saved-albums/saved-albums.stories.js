/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import { SavedAlbums } from './saved-albums';
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
    getMySavedAlbums: () => Promise.resolve({
      body: {
        items: [{
          album: {
            id: 1, artists: [{ name: 'Hot Band' }], name: 'Sleeper Hit',
          },
        }, {
          album: {
            id: 1, artists: [{ name: 'Sum Rappa' }], name: 'Reference To Marijuana',
          },
        }, {
          album: {
            id: 1, artists: [{ name: 'Pop Diva' }], name: 'Pahp Deevah',
          },
        }],
      },
    }),
  },
};

storiesOf('Saved albums', module)
  .add('Default', () => (
    <div style={outer}>
      <div style={inner}>
        <AppContext.Provider value={context}>
          <DataContext.Provider value={{ filter: '' }}>
            <SavedAlbums />
          </DataContext.Provider>
        </AppContext.Provider>
      </div>
    </div>
  ));
