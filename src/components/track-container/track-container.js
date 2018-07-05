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
      artist,
    } = this.props;
    const props = {
      ...track, background: artist.image,
    };
    return <TrackDetails {...props } />;
  }
}

TrackContainer.propTypes = {
  artist: PropTypes.object,
  clearErrors: PropTypes.func,
  loadTrack: PropTypes.func,
  stopAlbumSearch: PropTypes.func,
  track: PropTypes.object,
};

const mapStateToProps = ({ tracks, artists }, { trackId }) => {
  const track = tracks[trackId] || {};
  return {
    track,
    artist: artists[track.artistId] || {},
  };
};

const mapDispatchToProps = (dispatch, { trackId }) => ({
  clearErrors: () => dispatch(clearErrors()),
  loadTrack: () => dispatch(loadTrack(trackId)),
  stopAlbumSearch: albumId => dispatch(stopAlbumSearch(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackContainer);
