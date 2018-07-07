import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadAlbum, stopAlbumSearch } from '../../redux/albums';
import { clearErrors } from '../../redux/errors';
import Album from '../album/album';
import { loadSearchResult } from '../../redux/actions/backend';
import { loadArtist } from '../../redux/artists';

export class AlbumContainer extends React.Component {
  componentDidMount() {
    this.props.load();
  }

  componentWillUnmount() {
    this.props.stopAlbumSearch();
  }

  render() {
    const {
      tracks,
      album: {
        name, loading, failed, year, image, searchStarted, progress,
      },
      artist: { name: artistName, image: background },
    } = this.props;
    const props = {
      name,
      loading,
      failed,
      image,
      year,
      searchStarted,
      progress,
      tracks,
      artist: artistName,
      background,
    };
    return <Album {...props} />;
  }
}

AlbumContainer.propTypes = {
  album: PropTypes.object,
  artist: PropTypes.object,
  clearErrors: PropTypes.func,
  load: PropTypes.func,
  stopAlbumSearch: PropTypes.func,
  tracks: PropTypes.array,
};

const mapStateToProps = ({ tracks, albums, artists }, { albumId }) => {
  const album = albums[albumId] || { tracks: [] };
  return {
    tracks: album.tracks.map(id => tracks[id]),
    album,
    artist: artists[album.artistId] || {},
  };
};

const mapDispatchToProps = (dispatch, { albumId }) => ({
  load: () => {
    dispatch(clearErrors());
    dispatch(loadAlbum(albumId)).then(({ artistId }) => {
      dispatch(loadArtist(artistId));
    });
    dispatch(loadSearchResult(albumId));
  },
  stopAlbumSearch: () => dispatch(stopAlbumSearch(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);
