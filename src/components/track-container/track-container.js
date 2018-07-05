import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadTrack } from '../../redux/tracks';
import { stopAlbumSearch } from '../../redux/albums';
import { TrackDetails } from '../track-details/track-details';

export class TrackContainer extends React.Component {
  componentDidMount() {
    this.props.loadTrack();
  }

  componentWillUnmount() {
    if (this.props.track.albumId) {
      this.props.stopAlbumSearch(this.props.track.albumId);
    }
  }

  render() {
    const { track } = this.props;
    return <TrackDetails {...track } />;
  }
}

TrackContainer.propTypes = {
  loadTrack: PropTypes.func,
  stopAlbumSearch: PropTypes.func,
  track: PropTypes.object,
};

const mapStateToProps = ({ tracks }, { trackId }) => ({ track: tracks[trackId] });

const mapDispatchToProps = (dispatch, { trackId }) => ({
  loadTrack: () => dispatch(loadTrack(trackId)),
  stopAlbumSearch: albumId => dispatch(stopAlbumSearch(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackContainer);
