/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Cover from './cover';
import './cover.stories.css';

storiesOf('Cover', module)
  .add('Default', () => (
    <Cover src="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730" />
  )).add('With yearClass', () => (
    <Cover
        src="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
        yearClass="year-for-story" />
  ));
