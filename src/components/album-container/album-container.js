import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Album from 'components/Album';
import EntityContainer from 'components/EntityContainer';
import { viewAlbum } from 'state/view';

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
  const album = albums[albumId] || { trackIds: [] };
  return {
    tracks: (album.trackIds || []).map(id => tracks[id]),
    album,
    artist: artists[album.artistId] || {},
  };
};

const mapDispatchToProps = (dispatch, { albumId }) => ({
  load: () => dispatch(viewAlbum(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityContainer(AlbumContainer, 'albumId'));
