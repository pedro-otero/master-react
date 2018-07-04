/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import TitleBar from './title-bar';

storiesOf('Title Bar', module)
  .add('Default', () => (
    <TitleBar
        avatar="https://i.scdn.co/image/edb1577fa1a7b3e9e0f07297071cf6076a1946c3"
        title="User name" />
  ));
