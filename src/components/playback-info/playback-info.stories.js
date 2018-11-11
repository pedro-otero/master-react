/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import PlaybackInfo from './playback-info';

storiesOf('Playback Info', module)
  .add('Default', () => (
    <PlaybackInfo
        name="Give It To Me"
        artist="Cliche Pop"
        image="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730" />
  ))
  .add('Wrapped texts', () => (
    <PlaybackInfo
        name="If this title is too long then it should wrap because otherwise it would take many lines"
        artist="iamamiwhoami willibe whoimsupossedtobe will.i.am whatever i just want to break this"
        image="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730" />
  ));
