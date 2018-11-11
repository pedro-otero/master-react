/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import { SavedTracks } from './saved-tracks';

const outer = {
  display: 'flex',
  justifyContent: 'center',
};

const inner = {
  border: '1px solid grey',
  width: '300px',
};

const tracks = [{
  id: 1,
  name: 'First Single',
  artist: 'Hot Band',
  album: 'Sleeper Hit',
}, {
  id: 1,
  name: 'Chart Topper',
  artist: 'Hot Band',
  album: 'Sleeper Hit',
}, {
  id: 1,
  name: 'Guns and Bitches',
  artist: 'Sum Rappa',
  album: 'Reference To Marijuana',
}, {
  id: 1,
  name: 'Unexpected Flop',
  artist: 'Hot Band',
  album: 'Sleeper Hit',
}, {
  id: 1,
  name: 'Song She Wrote',
  artist: 'Pop Diva',
  album: 'Pahp Deevah',
}, {
  id: 1,
  name: 'Song With a F*****g lot of cursing',
  artist: 'Sum Rappa',
  album: 'Reference To Marijuana',
}];

storiesOf('Saved tracks', module)
  .add('Default', () => (
    <div style={outer}>
      <div style={inner}>
        <SavedTracks tracks={tracks} loadSavedTracks={() => ({})} />
      </div>
    </div>
  ));
