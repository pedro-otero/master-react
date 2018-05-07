import React from 'react';
import PropTypes from 'prop-types';

import './song.css';
import LoadingCircle from './LoadingCircle';
import Progress from './progress';
import Collaborator from './collaborator';

const Song = ({
  track,
  bestMatch,
  artist,
  album,
  progress,
}) => {
  const status = (() => {
    if (!track && !artist && !album) {
      return 'empty';
    }
    if (typeof progress === 'undefined') {
      return 'search-not-started';
    }
    if (progress === 100) {
      return 'finished';
    }
    if (!Object.keys(bestMatch.credits).length) {
      return 'no-credits';
    }
    return 'with-credits';
  })();

  const layers = image => ({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 65%, black), 
            url(${image.url})`,
  });

  return <article>
    {status === 'empty' && <div className="all-data-empty">
      <LoadingCircle />
      <h1>Loading data from Spotify...</h1>
      </div>}
    <div className="header">
      <div className="content">
        {track && album && <div
            className="albumCover"
            style={{ backgroundImage: `url(${track.album.images[0].url})` }}>
          <span className="albumYear">{album.release_date.substring(0, 4)}</span>
          </div>}
        <div>
          {track && <span>
            <span className="artistName">{track.artists[0].name}</span>
            <br />
            <span className="trackName">{track.name}</span>
            <br />
            </span>}
          {bestMatch && bestMatch.composers.length > 0 && <span className="composers">
              {bestMatch.composers.map((name, i) => (
                <span key={`composer-${name}-${i}`}>{name}</span>
              ))}
            </span>}
          <br />
          {bestMatch && bestMatch.producers.length > 0 && <span className="producers">
              {bestMatch.producers.map((name, i) => (
                <span key={`producer-${name}-${i}`}>{name}</span>
              ))}
            </span>}
        </div>
      </div>
      {artist && <div
          className="artistImg"
          style={layers(artist.images[0])}>

        </div>}
    </div>
    {status === 'search-not-started' && <div className="search-not-started">
      <LoadingCircle />
      <h1>Starting search...</h1>
      </div>}
    {status === 'with-credits' && <Progress
        size="small"
        value={progress} />}
    {bestMatch && <div className="credits">
        {Object.keys(bestMatch.credits).map((collaborator, i) => (
          <span key={i}>
            <Collaborator
                name={collaborator}
                roles={bestMatch.credits[collaborator]} />
          </span>
        ))}
      </div>}
    {status === 'no-credits' && <Progress
        size="big"
        value={progress} />}
  </article>;
};
Song.propTypes = {
  album: PropTypes.object,
  artist: PropTypes.object,
  bestMatch: PropTypes.object,
  progress: PropTypes.number,
  track: PropTypes.object,
};

export default Song;
