import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingCircle from 'components/LoadingCircle';
import Progress from 'components/Progress';
import Credits from 'components/Credits';
import Composers from 'components/Composers';
import Producers from 'components/Producers';
import ArtistWork from 'components/ArtistWork';
import { Block } from 'components/Utils';
import View from 'components/View';
import { viewTrack } from 'state/view';
import EntityContainer from 'components/EntityContainer';

export const TrackDetails = ({
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
}) => (
  <View
      loading={loading}
      loadingMessage="Loading data from Spotify..."
      failed={failed}
      failedMessage="Could not load this track">
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
  </View>
);

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

const mapStateToProps = ({ tracks, albums, artists }, { trackId }) => {
  const track = tracks[trackId] || {};
  const album = albums[track.albumId] || {};
  const base = {
    track,
    album,
    artist: artists[track.artistId] || {},
  };
  const {
    track: {
      name, composers, producers, credits, loading, failed, artistId,
    },
    album: {
      id: albumId, year, image, progress,
    },
    artist: { name: artistName, image: background },
  } = base;
  const props = {
    album,
    name,
    composers,
    producers,
    credits,
    loading,
    failed,
    albumId,
    artistId,
    image,
    year,
    searchStarted: !!progress,
    progress,
    artist: artistName,
    background,
  };
  return props;
};

const mapDispatchToProps = (dispatch, { trackId }) => ({
  load: () => dispatch(viewTrack(trackId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityContainer(TrackDetails, props => props.album && props.album.id));
