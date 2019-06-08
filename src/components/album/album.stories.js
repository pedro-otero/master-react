/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import { Album } from './album';

const tracks = [{
  name: 'Dark Opening',
  duration: '3:01',
}, {
  name: 'Inspiring Ballad',
  duration: '3:29',
}, {
  name: 'Departure',
  duration: '4:51',
}, {
  name: 'Song Where Another Band Member Sings',
  duration: '2:56',
}, {
  name: 'Filler',
  duration: '3:46',
}, {
  name: 'Track About The End Of Something',
  duration: '5:17',
}];
const composers = [{
  composers: ['Mr. Frontman', 'Goto Producer'],
}, {
  composers: ['Mr. Frontman', 'The Drummer'],
}, {
  composers: ['The Drummer', 'Goto Producer'],
}, {
  composers: ['Mr. Frontman'],
}, {
  composers: ['Mr. Frontman', 'Goto Producer', 'The Drummer', 'Guy Bass'],
}, {
  composers: ['Mr. Frontman', 'The Drummer'],
}];

storiesOf('Album', module)
  .add('Album loaded', () => (
    <Album
        clearErrors={() => {}}
        clearAlbumInView={() => {}}
        load={() => {}}
        artist="The Band"
        name="Hyped EP"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        year="2017"
        tracks={tracks} />
  ))
  .add('Artist loaded', () => (
    <Album
        clearErrors={() => {}}
        clearAlbumInView={() => {}}
        load={() => {}}
        artist="The Band"
        name="Hyped EP"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        year="2017"
        tracks={tracks}
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a" />
  ))
  .add('Some credits found', () => (
    <Album
        clearErrors={() => {}}
        clearAlbumInView={() => {}}
        load={() => {}}
        artist="The Band"
        name="Hyped EP"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        year="2017"
        tracks={Object.assign(tracks, { 0: Object.assign({}, tracks[0], composers[0]) })}
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a" />
  ))
  .add('Full', () => (
    <Album
        clearErrors={() => {}}
        clearAlbumInView={() => {}}
        load={() => {}}
        artist="The Band"
        name="Hyped EP"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        year="2017"
        tracks={tracks.map((track, i) => Object.assign({}, track, composers[i]))}
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a" />
  ));
