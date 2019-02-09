import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TrackDetails from 'components/TrackDetails';
import EntityContainer from 'components/EntityContainer';
import { viewTrack } from 'state/view';

export class TrackContainer extends React.Component {
  render() {
    const {
      track: {
        name, composers, producers, credits, loading, failed, artistId,
      },
      album: {
        id: albumId, year, image, progress,
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
      artistId,
      image,
      year,
      searchStarted: !!progress,
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
  load: () => dispatch(viewTrack(trackId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityContainer(TrackContainer, 'trackId'));
