import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadTrack } from '../../redux/tracks';
import { loadAlbum, stopAlbumSearch } from '../../redux/albums';
import TrackDetails from '../track-details/track-details';
import { clearErrors } from '../../redux/errors';
import { loadSearchResult } from '../../redux/actions/backend';

export class TrackContainer extends React.Component {
  componentDidMount() {
    this.props.load();
  }

  componentWillUnmount() {
    if (this.props.track.albumId) {
      this.props.stopAlbumSearch(this.props.track.albumId);
    }
  }

  render() {
    const {
      track: {
        name, composers, producers, credits, loading, failed,
      },
      album: {
        id: albumId, year, image, searchStarted, progress,
      },
      artist: { name: artistName, image: background },
    } = this.props;
    const props = {
      name,
      composers,
      producers,
      credits,
      loading,
      failed,
      albumId,
      image,
      year,
      searchStarted,
      progress,
      artist: artistName,
      background,
    };
    return <TrackDetails {...props} />;
  }
}

TrackContainer.propTypes = {
  album: PropTypes.object,
  artist: PropTypes.object,
  clearErrors: PropTypes.func,
  load: PropTypes.func,
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
  load: () => {
    dispatch(clearErrors());
    dispatch(loadTrack(trackId)).then(({ album: { id: albumId } }) => {
      dispatch(loadSearchResult(albumId));
      dispatch(loadAlbum(albumId));
    });
  },
  stopAlbumSearch: albumId => dispatch(stopAlbumSearch(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackContainer);
