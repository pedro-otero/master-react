/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import LoadingCircle from './loading-circle';

storiesOf('Loading Circle', module)
  .add('Default', () => (
    <LoadingCircle />
  ))
  .add('With message', () => (
    <LoadingCircle message="With a message" />
  ));
