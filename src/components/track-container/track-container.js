import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TrackDetails from 'components/TrackDetails';
import EntityContainer from 'components/EntityContainer';
import { loadTrack } from 'state/tracks';
import { loadAlbum } from 'state/albums';
import { loadArtist } from 'state/artists';

export class TrackContainer extends React.Component {
  render() {
    const {
      track: {
        name, composers, producers, credits, loading, failed,
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
  load: () => {
    dispatch(loadTrack(trackId)).then(({ albumId, artistId }) => {
      dispatch(loadAlbum(albumId));
      dispatch(loadArtist(artistId));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityContainer(TrackContainer, 'trackId'));
