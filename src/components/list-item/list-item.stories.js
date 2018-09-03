/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import ListItem from './list-item';

const outer = {
  display: 'flex',
  justifyContent: 'center',
};

const inner = {
  border: '1px solid grey',
  width: '300px',
};

storiesOf('List item', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('List of demo items', () => (
    <div style={outer}>
      <div style={inner}>
        <ListItem name="This is a list item" additional="It has an additional info slot" />
        <ListItem name="Here's Another One" additional="And its additional" />
        <ListItem name="One More" additional="You get the deal" />
        <ListItem name="A filler one" additional="Lorem Ipsum" />
      </div>
    </div>
  ));
