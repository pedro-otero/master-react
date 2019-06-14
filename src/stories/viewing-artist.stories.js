/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Root from '../components/root';
import baseState from './base/baseState.json';
import mockStore from './base/mockStore';

const thisStore = mockStore({
  ...baseState,
  tracks: {},
  artists: {
    R1: {
      name: 'One Hit Wonder',
      image: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730',
      albums: {
        items: [{
          name: 'Albums',
          items: [{
            id: 'L1',
            name: 'Sophomore',
            year: '2019',
            image: 'https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3',
          }, {
            id: 'L2',
            name: 'Debut',
            year: '2018',
            image: 'https://i.scdn.co/image/c49267a32f21626acd55c8dd5f42c0b9e66994f4',
          }],
        }, {
          name: 'Singles',
          items: [{
            id: 'L3',
            name: 'Club Banger',
            year: '2019',
            image: 'https://i.scdn.co/image/7cdfc49b5edfc4e5d6dd3bd44433b147b878ac3f',
          }, {
            id: 'L4',
            name: 'Flopped Single',
            year: '2018',
            image: 'https://i.scdn.co/image/68a91789907876ec5354ff1767a5a40d5c77f3f9',
          }, {
            id: 'L4',
            name: 'First of Previous Album',
            year: '2018',
            image: 'https://i.scdn.co/image/d488134b70615cc25353949ebdeb67f9c46e4cc3',
          }],
        }],
      },
    },
  },
  albums: {},
});

storiesOf('Crews', module)
  .add('Viewing an artist', () => (
    <Provider store={thisStore}>
      <MemoryRouter initialEntries={['/artist/R1']}>
        <Root redirectUri="some.url" />
      </MemoryRouter>
    </Provider>
  ));
