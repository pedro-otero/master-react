import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ArtistWork from 'components/ArtistWork';
import TrackItem from 'components/TrackItem';
import Progress from 'components/Progress';
import LoadingCircle from 'components/LoadingCircle';
import { Block } from 'components/Utils';

const Album = ({
  background, image, tracks, progress, year, name, artist, failed, loading, searchStarted, artistId,
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
        artistId={artistId}
        year={year}
        image={image}
        background={background} />
    {!searchStarted && <LoadingCircle message="Starting search..." />}
    {progress < 100 && <Progress
        size="small"
        value={progress} />}
    <Block>
      <ol>
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
    </Block>
  </Fragment>;
};

Album.propTypes = {
  artist: PropTypes.string,
  artistId: PropTypes.string,
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

export default Album;
