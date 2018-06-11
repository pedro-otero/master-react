/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import JointList from './joint-list';
import './joint-list.stories.css';

storiesOf('Joint List', module)
  .add('Just values', () => (
    <JointList values={['A', 'list', 'joint', 'by', 'commnas']} />
  ))
  .add('With wrapping chars', () => (
    <JointList
        start="<"
        values={['You', 'can', 'wrap', 'it', 'in', 'anything']}
        end=">" />))
  .add('With class', () => (
    <JointList
        start="("
        values={['And', 'pass', 'a', 'modifier', 'class']}
        end=")"
        className="story" />
  ));
