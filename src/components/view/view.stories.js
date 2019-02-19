/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import View from './view';
import storyData from './story-data.json';

storiesOf('View', module)
  .add('Loading', () => (
    <View loading loadingMessage="This is the loadingMessage prop" />
  ))
  .add('Failed', () => (
    <View failed failedMessage="And this one is the failedMessage prop" />
  ))
  .add('All OK', () => (
    <View>
      <h4>{storyData.viewDescription}</h4>
    </View>
  ));
