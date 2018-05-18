import React from 'react';
import PropTypes from 'prop-types';

import './song.css';
import LoadingCircle from './loading-circle';
import Progress from './progress';
import Credits from './credits';
import Label from './label';
import Cover from './cover';
import JointList from './joint-list';
import Banner from './banner';

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

  const artistImg = artist && artist.images.length ? artist.images[0].url : undefined;

  return <article>
    {track && artist && album &&
    <Banner
        src={artistImg}
        className="content">
      <Cover
          album={album}
          imageClass="albumCover"
          yearClass="albumYear" />
      <div>
        <Label
            className="artistName"
            value={track.artists[0].name} />
        <Label
            className="trackName"
            value={track.name} />
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
    </Banner>}
    {status === 'empty' && <LoadingCircle message="Loading data from Spotify..." />}
    {status === 'search-not-started' && <LoadingCircle message="Starting search..." />}
    {status === 'with-credits' &&
    <Progress
        size="small"
        value={progress} />}
    {bestMatch && <Credits data={bestMatch.credits} />}
    {status === 'no-credits' &&
    <Progress
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
