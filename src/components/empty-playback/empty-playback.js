import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './empty-playback.css';
import globalStyles from '../../index.css';

const EmptyPlayback = () => (
  <div className={styles.emptyPlaybackMessage}>
    <div>
      <i className="em-svg em-thinking_face"></i>
    </div>
    <p>Nothing found</p>
    <p>{"When asked for the song you're currently listening to, Spotify said it's got nothing!"}</p>
    <p>Start playing a song, dust it off and...</p>
    <Link
        to="/"
        className={globalStyles.RRlink}>
      <p className={styles.tryAgainButton}>Try again</p>
    </Link>
  </div>
);

export default EmptyPlayback;
