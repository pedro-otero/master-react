/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Collaborator from './collaborator';

storiesOf('Collaborator', module)
  .add('Default', () => (
    <Collaborator
        name="Some Guy"
        roles={['Piano', 'Drums']} />
  ));
