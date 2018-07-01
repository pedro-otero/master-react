import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingCircle from '../loading-circle/loading-circle';
import Progress from '../progress/progress';
import Credits from '../credits/credits';
import Composers from '../composers/composers';
import Producers from '../producers/producers';
import ArtistWork from '../artist-work/artist-work';

export const TrackDetails = ({
  name,
  artist,
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
    <Credits data={credits} />
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

const mapStateToProps = ({ tracks }, { trackId }) => {
  const track = tracks[trackId];
  if (track) {
    return {
      name: track.name,
      loading: track.loading,
      failed: track.failed,
      albumId: track.album,
      composers: track.composers,
      producers: track.producers,
      credits: track.credits,
      progress: track.progress,
      searchStarted: typeof track.progress !== 'undefined',
      image: track.image,
      year: track.year,
      background: track.background,
      artist: track.artistName,
    };
  }
  return {};
};

export default connect(mapStateToProps)(TrackDetails);
