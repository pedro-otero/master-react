/* eslint-disable import/no-extraneous-dependencies,global-require */
import { configure } from '@storybook/react';

import '../src/index.css';

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
