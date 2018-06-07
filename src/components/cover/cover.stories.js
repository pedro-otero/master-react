/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Cover from './cover';
import './cover.stories.css';

storiesOf('Cover', module)
  .add('Default', () => (
    <Cover
        album={{ images: [{ url: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730' }], release_date: '2004' }}
        imageClass="image-for-story" />
  )).add('With yearClass', () => (
    <Cover
        album={{ images: [{ url: 'https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730' }], release_date: '2004' }}
        imageClass="image-for-story"
        yearClass="year-for-story" />
  ));
