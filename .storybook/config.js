/* eslint-disable import/no-extraneous-dependencies,global-require */
import { configure } from '@storybook/react';

import '../src/index.css';

function loadStories() {
  require('../src/components/track-item.stories.js');
}

configure(loadStories, module);
