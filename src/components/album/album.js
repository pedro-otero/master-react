import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArtistWork from 'components/ArtistWork';
import TrackItem from 'components/TrackItem';
import { Block } from 'components/Utils';
import { viewAlbum } from 'state/view';
import View from 'components/View';
import { loadSearchResult } from 'state/actions/backend';
import { clearErrors } from 'state/errors';

export const Album = ({
  background, image, tracks, progress, year, name, artist, failed, load, artistId, albumId, loadSearchResult, clearErrors,
}) => (
  <View
      clearErrors={clearErrors}
      canStartLoadingDetails={() => !!albumId}
      shouldStopSearching={() => progress === 100}
      loadSearchResult={() => loadSearchResult(albumId)}
      load={load}
      failed={failed}
      failedMessage="Could not load this album">
    <ArtistWork
        title={name}
        artist={artist}
        artistId={artistId}
        year={year}
        image={image}
        background={background} />
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
  name: PropTypes.string,
  progress: PropTypes.number,
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
      name, failed, year, image, progress, artistId,
    },
    artist: { name: artistName, image: background },
  } = base;
  const props = {
    name,
    failed,
    image,
    year,
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
