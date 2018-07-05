import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadAlbum, stopAlbumSearch } from '../../redux/albums';
import { clearErrors } from '../../redux/errors';
import { Album } from '../album/album';

export class AlbumContainer extends React.Component {
  componentDidMount() {
    this.props.clearErrors();
    this.props.loadAlbum();
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
  loadAlbum: PropTypes.func,
  stopAlbumSearch: PropTypes.func,
  tracks: PropTypes.array,
};

const mapStateToProps = ({ tracks, albums, artists }, { albumId }) => {
  const album = albums[albumId] || {};
  return {
    tracks: album.tracks.map(id => tracks[id]),
    album,
    artist: artists[album.artistId] || {},
  };
};

const mapDispatchToProps = (dispatch, { albumId }) => ({
  clearErrors: () => dispatch(clearErrors()),
  loadAlbum: () => dispatch(loadAlbum(albumId)),
  stopAlbumSearch: () => dispatch(stopAlbumSearch(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);
