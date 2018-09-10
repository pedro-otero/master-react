/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from './image';

const sizes = ['2em', '8em', '16em', '400px'];

const StoryImage = ({ rounded, size }) => (
  <Image
      rounded={rounded}
      src="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
      size={size} />
);

const avatarStories = storiesOf('Image/Avatars (props[rounded]=true)', module);
sizes.forEach(size => avatarStories.add(size, () => <StoryImage rounded size={size} />));

const regularStories = storiesOf('Image/Regular (props[rounded]=false)', module);
sizes.forEach(size => regularStories.add(size, () => <StoryImage size={size} />));
