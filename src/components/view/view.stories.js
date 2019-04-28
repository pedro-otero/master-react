/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import View from './view';
import storyData from './story-data.json';

storiesOf('View', module)
  .add('Failed', () => (
    <View
        failed
        failedMessage="And this one is the failedMessage prop"
        load={() => {}}
        canStartLoadingDetails ={() => {}}
        clearErrors={() => {}} />
  ))
  .add('All OK', () => (
    <View
        canStartLoadingDetails ={() => {}}
        load={() => {}}
        clearErrors={() => {}}
    >
      <h4>{storyData.viewDescription}</h4>
    </View>
  ));
