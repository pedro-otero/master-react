import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadAlbum } from '../../redux/albums';
import Album from '../album/album';
import { loadArtist } from '../../redux/artists';
import EntityContainer from '../entity-container/entity-container';

export class AlbumContainer extends React.Component {
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
    dispatch(loadAlbum(albumId)).then(({ artistId }) => {
      dispatch(loadArtist(artistId));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityContainer(AlbumContainer));
