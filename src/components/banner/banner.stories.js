/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Banner from './banner';
import styles from './banner.stories.css';

storiesOf('Banner', module)
  .add('Without class name', () => (
    <Banner src="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730">
      <p>
        <strong>The banner is as big as its content. </strong>It is also a horizontal flexbox
        <br />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </p>
    </Banner>
  ))
  .add('With class name', () => (
    <Banner
        src="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
        className={styles['banner-story-margins']}>
      <p>
        <strong>You can pass a classname. </strong>In this example, margins are added.
        <br />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </p>
    </Banner>
  ));
