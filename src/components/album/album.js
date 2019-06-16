import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArtistWork from 'components/ArtistWork';
import TrackItem from 'components/TrackItem';
import { Block } from 'components/Utils';
import { clearAlbumInView, viewAlbum } from 'state/view';
import View from 'components/View';
import { loadSearchResult } from 'state/actions/backend';
import * as actions from 'state/errors';

export class Album extends React.Component {
  componentWillUnmount() {
    this.props.clearAlbumInView();
  }

  render() {
    const {
      background,
      image,
      tracks,
      year,
      name,
      artist,
      failed,
      load,
      artistId,
      clearErrors,
    } = this.props;
    return (
      <View
          clearErrors={clearErrors}
          canStartLoadingDetails={() => false}
          shouldStopSearching={() => true}
          loadSearchResult={() => {}}
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
  }
}

Album.propTypes = {
  artist: PropTypes.string,
  artistId: PropTypes.string,
  background: PropTypes.string,
  clearAlbumInView: PropTypes.func,
  clearErrors: PropTypes.func,
  failed: PropTypes.bool,
  image: PropTypes.string,
  load: PropTypes.func,
  name: PropTypes.string,
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
      name, failed, year, image, artistId,
    },
    artist: { name: artistName, image: background },
  } = base;
  const props = {
    name,
    failed,
    image,
    year,
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
  clearErrors: () => dispatch(actions.clearErrors()),
  clearAlbumInView: () => dispatch(clearAlbumInView()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);
