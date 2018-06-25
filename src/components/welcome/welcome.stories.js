/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Welcome from './welcome';

storiesOf('Welcome', module)
  .add('Default', () => (
    <Welcome />
  ));
