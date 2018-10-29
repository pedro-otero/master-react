/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { Menu } from './menu';

const outer = {
  display: 'flex',
  justifyContent: 'center',
};

const inner = {
  border: '1px solid grey',
  width: '300px',
};

storiesOf('Menu', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Default', () => (
    <div style={outer}>
      <div style={inner}>
        <Menu
            playback={{}}
            avatar="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
            name="Someone McSomething"
            userId="someone_97" />
      </div>
    </div>
  ));
