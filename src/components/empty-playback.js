import * as React from 'react';

import './empty-playback.css';

const EmptyPlayback = () => (
  <div className="emptyPlaybackMessage">
    <p>Nothing found</p>
    <p>{"When asked for the song you're currently listening to, Spotify said it's got nothing!"}</p>
    <p>Please start playing a song and then refresh the page.</p>
  </div>
);

export default EmptyPlayback;
