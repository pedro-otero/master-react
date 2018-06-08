/* eslint-disable import/no-extraneous-dependencies,global-require */
import { configure } from '@storybook/react';

import '../src/index.css';

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
