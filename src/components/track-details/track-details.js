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
}) => <article>
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
  {loading && <LoadingCircle message="Loading data from Spotify..." />}
  {!searchStarted && <LoadingCircle message="Starting search..." />}
  <Credits data={credits} />
  {searchStarted && progress !== 100 &&
    <Progress
        size={Object.keys(credits).length === 0 ? 'big' : 'small'}
        value={progress} />}
</article>;

TrackDetails.propTypes = {
  albumId: PropTypes.string,
  artist: PropTypes.string,
  background: PropTypes.string,
  composers: PropTypes.array,
  credits: PropTypes.object,
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
  const props = {};
  if (tracks[trackId]) {
    const track = tracks[trackId];
    if (!track.loading && !track.failed) {
      Object.assign(props, {
        name: track.name,
        loading: track.loading,
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
      });
    }
  }
  return props;
};

export default connect(mapStateToProps)(TrackDetails);
