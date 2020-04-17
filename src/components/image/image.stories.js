/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Image from './image';

storiesOf('Image', module)
  .addDecorator(withKnobs)
  .add('Tweak it!', () => (
    <Image
        rounded={boolean('Rounded')}
        src="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
        size={text('Size', '8em')} />
  ));
