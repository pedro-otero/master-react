/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Avatar from './avatar';

const stories = storiesOf('Avatar', module);
['2em', '8em', '16em', '400px'].forEach(size => stories.add(size, () => (
  <Avatar
      src="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
      size={size} />
)));
