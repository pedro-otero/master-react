import React from 'react';
import PropTypes from 'prop-types';

import './song.css';
import LoadingCircle from './loading-circle';
import Progress from './progress';
import Credits from './credits';
import Label from './label';
import Cover from './cover';
import JointList from './joint-list';

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
    {status === 'empty' && <LoadingCircle message="Loading data from Spotify..." />}
    <div className="header">
      <div className="content">
        {track && album && <Cover
            album={album}
            imageClass="albumCover"
            yearClass="albumYear" />}
        <div>
          {track && <span>
            <Label
                className="artistName"
                value={track.artists[0].name} />
            <Label
                className="trackName"
                value={track.name} />
            </span>}
          {bestMatch && <span>
            <JointList
                className="composers"
                start="("
                values={bestMatch.composers}
                end=")" />
            <br />
            <JointList
                className="producers"
                start="["
                values={bestMatch.producers}
                end="]" />
          </span>}
        </div>
      </div>
      {artist && <div
          className="artistImg"
          style={layers(artist.images[0])}>

        </div>}
    </div>
    {status === 'search-not-started' && <LoadingCircle message="Starting search..." />}
    {status === 'with-credits' && <Progress
        size="small"
        value={progress} />}
    {bestMatch && <Credits data={bestMatch.credits} />}
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
