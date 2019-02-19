import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArtistWork from 'components/ArtistWork';
import TrackItem from 'components/TrackItem';
import Progress from 'components/Progress';
import LoadingCircle from 'components/LoadingCircle';
import { Block } from 'components/Utils';
import { viewAlbum } from 'state/view';
import View from 'components/View';
import { loadSearchResult } from 'state/actions/backend';
import { clearErrors } from 'state/errors';

export const Album = ({
  background, image, tracks, progress, year, name, artist, failed, loading, load, searchStarted, artistId, albumId, loadSearchResult, clearErrors,
}) => (
  <View
      clearErrors={clearErrors}
      canStartLoadingDetails={() => !!albumId}
      shouldStopSearching={() => progress === 100}
      loadSearchResult={() => loadSearchResult(albumId)}
      load={load}
      loading={loading}
      loadingMessage="Loading data from Spotify..."
      failed={failed}
      failedMessage="Could not load this album">
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
  </View>
);

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

const mapStateToProps = ({ tracks, albums, artists }, { albumId }) => {
  const album = albums[albumId] || { trackIds: [] };
  const base = {
    tracks: (album.trackIds || []).map(id => tracks[id]),
    album,
    artist: artists[album.artistId] || {},
  };
  const {
    album: {
      name, loading, failed, year, image, progress, artistId,
    },
    artist: { name: artistName, image: background },
  } = base;
  const props = {
    name,
    loading,
    failed,
    image,
    year,
    searchStarted: !!progress,
    progress,
    tracks: base.tracks,
    artist: artistName,
    artistId,
    background,
  };
  return props;
};

const mapDispatchToProps = (dispatch, { albumId }) => ({
  load: () => dispatch(viewAlbum(albumId)),
  loadSearchResult: id => dispatch(loadSearchResult(id)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);
