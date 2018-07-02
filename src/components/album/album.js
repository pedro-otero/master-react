import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './album.css';
import ArtistWork from '../artist-work/artist-work';
import TrackItem from '../track-item/track-item';
import Progress from '../progress/progress';
import LoadingCircle from '../loading-circle/loading-circle';

export const Album = ({
  background, image, tracks, progress, year, name, artist, failed, loading, searchStarted,
}) => {
  if (loading) {
    return <LoadingCircle message="Loading data from Spotify..." />;
  }
  if (failed) {
    return <div>
      <i className="em em--1"></i>
      <h1>Could not load this album</h1>
    </div>;
  }
  return <Fragment>
    <ArtistWork
        title={name}
        artist={artist}
        year={year}
        image={image}
        background={background} />
    {!searchStarted && <LoadingCircle message="Starting search..." />}
    {progress < 100 && <Progress
        size="small"
        value={progress} />}
    <ol className={styles.tracklist}>
      {tracks.map(track => (
        <li key={`${track.name}-${track.id}`}>
          <TrackItem
              id={track.id}
              name={track.name}
              duration={track.duration}
              composers={track.composers}
            />
        </li>))}
    </ol>
  </Fragment>;
};

Album.propTypes = {
  artist: PropTypes.string,
  background: PropTypes.string,
  failed: PropTypes.bool,
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  progress: PropTypes.number,
  searchStarted: PropTypes.bool,
  tracks: PropTypes.array,
  year: PropTypes.string,
};

Album.defaultProps = {
  tracks: [],
};

const mapStateToProps = ({ albums, tracks }, { albumId }) => {
  const album = albums[albumId];
  if (album) {
    return {
      image: album.image,
      failed: album.failed,
      loading: album.loading,
      name: album.name,
      progress: album.progress,
      tracks: album.tracks.map(id => tracks[id]),
      year: album.year,
      background: album.background,
      artist: album.artist,
      searchStarted: album.searchStarted,
    };
  }
  return {};
};

export default connect(mapStateToProps)(Album);
