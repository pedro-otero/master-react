/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import EntityContainer from './entity-container';
import storyData from './story-data.json';

storiesOf('View', module)
  .add('Loading', () => (
    <EntityContainer loading loadingMessage="This is the loadingMessage prop" />
  ))
  .add('Failed', () => (
    <EntityContainer failed failedMessage="And this one is the failedMessage prop" />
  ))
  .add('All OK', () => (
    <EntityContainer>
      <h4>{storyData.viewDescription}</h4>
    </EntityContainer>
  ));
