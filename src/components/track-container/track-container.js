import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadTrack } from '../../redux/tracks';
import { stopAlbumSearch } from '../../redux/albums';
import TrackDetails from '../track-details/track-details';
import { clearErrors } from '../../redux/errors';

export class TrackContainer extends React.Component {
  componentDidMount() {
    this.props.clearErrors();
    this.props.loadTrack();
  }

  componentWillUnmount() {
    if (this.props.track.albumId) {
      this.props.stopAlbumSearch(this.props.track.albumId);
    }
  }

  render() {
    const {
      track,
      album,
      artist,
    } = this.props;
    const props = {
      ...track,
      background: artist.image,
      year: album.year,
      image: album.image,
    };
    return <TrackDetails {...props } />;
  }
}

TrackContainer.propTypes = {
  album: PropTypes.object,
  artist: PropTypes.object,
  clearErrors: PropTypes.func,
  loadTrack: PropTypes.func,
  stopAlbumSearch: PropTypes.func,
  track: PropTypes.object,
};

const mapStateToProps = ({ tracks, albums, artists }, { trackId }) => {
  const track = tracks[trackId] || {};
  return {
    track,
    album: albums[track.albumId] || {},
    artist: artists[track.artistId] || {},
  };
};

const mapDispatchToProps = (dispatch, { trackId }) => ({
  clearErrors: () => dispatch(clearErrors()),
  loadTrack: () => dispatch(loadTrack(trackId)),
  stopAlbumSearch: albumId => dispatch(stopAlbumSearch(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackContainer);
