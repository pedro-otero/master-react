/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import TrackDetails from './track-details';

storiesOf('Track details', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Just started', () => (
    <TrackDetails loading={true} />
  ))
  .add('With Spotify track info', () => (
    <TrackDetails name="Char Topper Everybody's Sick Of" />
  ))
  .add('With Spotify album info', () => (
    <TrackDetails
        name="Char Topper Everybody's Sick Of"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        year="2016" />
  ))
  .add('With Spotify artist info', () => (
    <TrackDetails
        name="Char Topper Everybody's Sick Of"
        artist="Pop Master"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a"
        year="2016" />
  ))
  .add('Search started', () => (
    <TrackDetails
        name="Char Topper Everybody's Sick Of"
        artist="Pop Master"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a"
        year="2016"
        searchStarted={true}
        progress={0} />
  ))
  .add('Search progressing', () => (
    <TrackDetails
        name="Char Topper Everybody's Sick Of"
        artist="Pop Master"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a"
        year="2016"
        searchStarted={true}
        progress={15} />
  ))
  .add('Found composers', () => (
    <TrackDetails
        name="Char Topper Everybody's Sick Of"
        artist="Pop Master"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a"
        year="2016"
        composers={['Realname Ofpopmaster', 'Goto Producer']}
        searchStarted={true}
        progress={21} />
  ))
  .add('Found credits', () => (
    <TrackDetails
        name="Char Topper Everybody's Sick Of"
        artist="Pop Master"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a"
        year="2016"
        composers={['Realname Ofpopmaster', 'Goto Producer']}
        credits={{
          'Goto Producer': ['Backing Vocals'],
          'Guy Bass': ['Bass'],
        }}
        searchStarted={true}
        progress={41} />
  ))
  .add('Finished', () => (
    <TrackDetails
        name="Char Topper Everybody's Sick Of"
        artist="Pop Master"
        albumId="albumId"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a"
        year="2016"
        progress={100}
        searchStarted={true}
        composers={['Realname Ofpopmaster', 'Goto Producer']}
        producers={['Goto Producer']}
        credits={{
          'Pop Master': ['Vocals', 'Keyboards'],
          'Goto Producer': ['Backing Vocals'],
          'Guy Bass': ['Bass'],
        }} />
  ))
  .add('Failed', () => (
    <TrackDetails failed={true} />
  ));
