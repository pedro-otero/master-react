import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadAlbum } from '../../redux/albums';
import { clearErrors } from '../../redux/errors';
import Album from '../album/album';
import { loadSearchResult } from '../../redux/actions/backend';
import { loadArtist } from '../../redux/artists';

export class AlbumContainer extends React.Component {
  componentDidMount() {
    this.props.load();
  }

  componentDidUpdate() {
    if (this.props.album.id && !this.albumSearch) {
      this.albumSearch = this.props.loadSearchResult(this.props.album.id);
    }
  }

  componentWillUnmount() {
    if (this.albumSearch) {
      this.albumSearch.unsubscribe();
    }
  }

  render() {
    const {
      tracks,
      album: {
        name, loading, failed, year, image, progress,
      },
      artist: { name: artistName, image: background },
    } = this.props;
    const props = {
      name,
      loading,
      failed,
      image,
      year,
      searchStarted: !!progress,
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
  loadSearchResult: PropTypes.func,
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
  },
  loadSearchResult: id => dispatch(loadSearchResult(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);
