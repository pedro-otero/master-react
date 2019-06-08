/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import { Artist } from './artist';
import { Album } from 'components/Album';

const albums = [{
  name: 'Albums',
  items: [{
    id: 1,
    name: 'Acclaimed Debut',
    image: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3',
    year: 2007,
  }, {
    id: 1,
    name: 'Failing Too High Expectations',
    image: 'https://i.scdn.co/image/20fccd3b7b907c57a1f8a21660843bac5967b5e8',
    year: 2009,
  }, {
    id: 1,
    name: 'Comeback',
    image: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730',
    year: 2014,
  }, {
    id: 1,
    name: 'Comeback (Deluxe Edition)',
    image: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730',
    year: 2015,
  }, {
    id: 1,
    name: 'Too Big To Fail',
    image: 'https://i.scdn.co/image/617f0d587125577484d73dcd6492aa7f027d45b4',
    year: 2017,
  }],
}, {
  name: 'Singles',
  items: [{
    id: 1,
    name: 'Chart Topper',
    image: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3',
    year: 2017,
  }, {
    id: 1,
    name: 'Too Big To Fail',
    image: 'https://i.scdn.co/image/20fccd3b7b907c57a1f8a21660843bac5967b5e8',
    year: 2017,
  }, {
    id: 1,
    name: 'Flop',
    image: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730',
    year: 2018,
  }],
}];

storiesOf('Artist', module)
  .add('With albums', () => (
    <Artist
        clearErrors={() => {}}
        loadArtistAlbums={() => {}}
        id="1"
        name="Somebody Famous"
        image="https://i.scdn.co/image/0a4c9792c52ec21c3b881542e0739d6f605799b8"
        albums={albums}
        viewArtist={() => ({})}
      />
  ))
  .add('With no albums', () => (
    <Artist
        clearErrors={() => {}}
        loadArtistAlbums={() => {}}
        id="1"
        name="Somebody Famous"
        image="https://i.scdn.co/image/0a4c9792c52ec21c3b881542e0739d6f605799b8"
        albums={[]}
        viewArtist={() => ({})}
      />
  ));
