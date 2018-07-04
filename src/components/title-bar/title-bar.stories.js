/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import TitleBar from './title-bar';

storiesOf('Title Bar', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Default', () => (
    <TitleBar
        avatar="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        title="User name" />
  ));
