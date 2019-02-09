import React from 'react';
import PropTypes from 'prop-types';

import LoadingCircle from 'components/LoadingCircle';
import Progress from 'components/Progress';
import Credits from 'components/Credits';
import Composers from 'components/Composers';
import Producers from 'components/Producers';
import ArtistWork from 'components/ArtistWork';
import { Block } from 'components/Utils';

const TrackDetails = ({
  name,
  artist,
  artistId,
  albumId,
  image,
  background,
  year,
  progress,
  credits,
  composers,
  producers,
  loading,
  searchStarted,
  failed,
}) => {
  if (loading) {
    return <LoadingCircle message="Loading data from Spotify..." />;
  }
  if (failed) {
    return <div>
      <i className="em em--1"></i>
      <h1>Could not load this track</h1>
    </div>;
  }
  return <article>
    <ArtistWork
        title={name}
        artist={artist}
        artistId={artistId}
        year={year}
        image={image}
        background={background}
        path={`/album/${albumId}`}>
      <span>
        <Composers list={composers} />
        <br />
        <Producers list={producers} />
      </span>
    </ArtistWork>
    {!searchStarted && <LoadingCircle message="Starting search..." />}
    <Block>
      <Credits data={credits} />
    </Block>
    {searchStarted && progress !== 100 &&
      <Progress
          size={Object.keys(credits).length === 0 ? 'big' : 'small'}
          value={progress} />}
  </article>;
};

TrackDetails.propTypes = {
  albumId: PropTypes.string,
  artist: PropTypes.string,
  background: PropTypes.string,
  composers: PropTypes.array,
  credits: PropTypes.object,
  failed: PropTypes.bool,
  image: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  producers: PropTypes.array,
  progress: PropTypes.number,
  searchStarted: PropTypes.bool,
  year: PropTypes.string,
};

TrackDetails.defaultProps = {
  credits: {},
  composers: [],
  producers: [],
};

export default TrackDetails;
