/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Progress from './progress';

storiesOf('Progress bar', module)
  .add('Big', () => (
    <Progress
        size="big"
        value={50} />
  ))
  .add('Small', () => (
    <Progress
        size="small"
        value={50} />
  ));
