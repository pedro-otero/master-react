/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Producers from './producers';

storiesOf('Producers list', module)
  .add('Default', () => (
    <Producers list={['It\'s', 'just', 'JointList', 'with', 'start & end', 'set']} />
  ));
