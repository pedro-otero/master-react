/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { Errors } from './errors';

storiesOf('Errors list', module)
  .add('Default', () => (
    <Errors list={['This is an error', 'And this is another one']} />
  ));
