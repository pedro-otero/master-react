/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Credits from './credits';

storiesOf('Credits list', module)
  .add('Default', () => (
    <Credits data={{
      'Goto Producer': ['Guitar', 'Vocal Arrangements'],
      'Guy Bass': ['Bass'],
      'Up&Coming Songwriter': ['Backing Vocals', 'Beatbox', 'Programming'],
      'Jonh Doe': ['Engineer'],
    }} />
  ));
