/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';
import { MemoryRouter } from 'react-router-dom';

import Root from '../components/root';
import AppContext from '../context';

const context = {
  spotifyApi: {
    getMe: () => Promise.resolve({
      body: {
        id: 'clever_nick87',
        display_name: 'User McLastname',
        images: [{ url: 'https://i.imgflip.com/wahid.jpg' }],
        country: 'CA',
      },
    }),
    getTrack: () => Promise.resolve({
      body: {
        id: 'T1',
        name: 'Radio Friendly',
        album: { id: 'L1' },
        artists: [{ id: 'R1' }],
      },
    }),
    getAlbum: () => Promise.resolve({
      body: {
        id: 'L1',
        name: 'album of song',
        release_date: '2005',
        images: [{ url: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3' }],
        artists: [{ id: 'AR1' }],
        tracks: {
          items: [{
            id: 'T1',
            name: 'title of song',
            duration_ms: 1000,
          }],
        },
      },
    }),
    getArtist: () => Promise.resolve({
      body: {
        name: 'One Hit Wonder',
        images: [{ url: 'https://i.scdn.co/image/c49267a32f21626acd55c8dd5f42c0b9e66994f4' }],
      },
    }),
    getArtistAlbums: () => Promise.resolve({
      body: {
        items: [{
          id: 'L1',
          album_type: 'album',
          album_group: 'album',
          name: 'Sophomore',
          release_date: '2019',
          images: [{ url: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3' }],
          available_markets: ['CA'],
        }, {
          id: 'L2',
          album_type: 'album',
          album_group: 'album',
          name: 'Debut',
          release_date: '2018',
          images: [{ url: 'https://i.scdn.co/image/c49267a32f21626acd55c8dd5f42c0b9e66994f4' }],
          available_markets: ['CA'],
        }, {
          id: 'L3',
          album_type: 'single',
          album_group: 'single',
          name: 'Club Banger',
          release_date: '2019',
          images: [{ url: 'https://i.scdn.co/image/7cdfc49b5edfc4e5d6dd3bd44433b147b878ac3f' }],
          available_markets: ['CA'],
        }, {
          id: 'L4',
          album_type: 'single',
          album_group: 'single',
          name: 'Flopped Single',
          release_date: '2018',
          images: [{ url: 'https://i.scdn.co/image/68a91789907876ec5354ff1767a5a40d5c77f3f9' }],
          available_markets: ['CA'],
        }, {
          id: 'L4',
          album_type: 'single',
          album_group: 'single',
          name: 'First of Previous Album',
          release_date: '2018',
          images: [{ url: 'https://i.scdn.co/image/d488134b70615cc25353949ebdeb67f9c46e4cc3' }],
          available_markets: ['CA'],
        }],
      },
    }),
    getMyCurrentPlaybackState: () => Promise.resolve({
      body: {
      },
    }),
  },
};

storiesOf('Crews', module)
  .add('Viewing an artist', () => (
    <AppContext.Provider value={context}>
      <MemoryRouter initialEntries={['/artist/R1']}>
        <Root />
      </MemoryRouter>
    </AppContext.Provider>
  ));
