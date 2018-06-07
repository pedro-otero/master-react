/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Composers from './composers';

storiesOf('Composers list', module)
  .add('Default', () => (
    <Composers list={['It\'s', 'just', 'JointList', 'with', 'start & end', 'set']} />
  ));
