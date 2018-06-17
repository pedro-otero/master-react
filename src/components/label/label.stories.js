/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import styles from './label.stories.css';
import Label from './label';

storiesOf('Label', module)
  .add('Default', () => (
    <Label value="A label" />
  ))
  .add('With class', () => (
    <Label
        value="Another label"
        className={styles.story} />
  ));
