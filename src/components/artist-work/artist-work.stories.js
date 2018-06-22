/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';

import ArtistWork from './artist-work';

storiesOf('Artist Work', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Default', () => (
    <ArtistWork
        artist="The Band"
        title="Something They Did"
        image="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a"
        year="2018"
        path="/some/place" />
  ))
  .add('With no path to link to', () => (
    <ArtistWork
        artist="The Same Band"
        title="Another Work"
        image="https://i.scdn.co/image/20fccd3b7b907c57a1f8a21660843bac5967b5e8"
        background="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a"
        year="2018" />
  ));
