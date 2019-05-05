/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import { SavedAlbums } from './saved-albums';
import { SavedTracks } from 'components/SavedTracks';

const outer = {
  display: 'flex',
  justifyContent: 'center',
};

const inner = {
  border: '1px solid grey',
  width: '300px',
};

const albums = [{
  id: 1,
  artist: 'Hot Band',
  name: 'Sleeper Hit',
}, {
  id: 1,
  artist: 'Sum Rappa',
  name: 'Reference To Marijuana',
}, {
  id: 1,
  artist: 'Hot Band',
  name: 'Sleeper Hit',
}, {
  id: 1,
  artist: 'Pop Diva',
  name: 'Pahp Deevah',
}];

storiesOf('Saved albums', module)
  .add('Default', () => (
    <div style={outer}>
      <div style={inner}>
        <SavedAlbums
            albums={albums}
            loadSavedAlbums={() => ({})}
            clearErrors={() => {}} />
      </div>
    </div>
  ));
