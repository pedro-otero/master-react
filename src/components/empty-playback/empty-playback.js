import * as React from 'react';
import { Link } from 'react-router-dom';

import './empty-playback.css';

const EmptyPlayback = () => (
  <div className="emptyPlaybackMessage">
    <div>
      <i className="em-svg em-thinking_face"></i>
    </div>
    <p>Nothing found</p>
    <p>{"When asked for the song you're currently listening to, Spotify said it's got nothing!"}</p>
    <p>Start playing a song, dust it off and...</p>
    <Link
        to="/"
        className="RR-link">
      <p className="try-again-button">Try again</p>
    </Link>
  </div>
);

export default EmptyPlayback;
