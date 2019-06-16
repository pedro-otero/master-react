import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Credits from 'components/Credits';
import Composers from 'components/Composers';
import Producers from 'components/Producers';
import ArtistWork from 'components/ArtistWork';
import { Block } from 'components/Utils';
import { clearAlbumInView, viewTrack } from 'state/view';
import View from 'components/View';
import * as errorsActions from 'state/errors';

export class TrackDetails extends React.Component {
  componentWillUnmount() {
    this.props.clearAlbumInView();
  }

  render() {
    const {
      name,
      artist,
      artistId,
      albumId,
      image,
      background,
      year,
      credits,
      composers,
      producers,
      load,
      failed,
      clearErrors,
    } = this.props;
    return (
      <View
          clearErrors={clearErrors}
          canStartLoadingDetails={() => false}
          shouldStopSearching={() => true}
          loadSearchResult={() => {}}
          load={load}
          failed={failed}
          failedMessage="Could not load this track">
        <ArtistWork
            title={name}
            artist={artist}
            artistId={artistId}
            year={year}
            image={image}
            background={background}
            path={`/album/${albumId}`}>
          <span>
            <Composers list={composers} />
            <br />
            <Producers list={producers} />
          </span>
        </ArtistWork>
        <Block>
          <Credits data={credits} />
        </Block>
      </View>
    );
  }
}

TrackDetails.propTypes = {
  albumId: PropTypes.string,
  artist: PropTypes.string,
  artistId: PropTypes.string,
  background: PropTypes.string,
  clearAlbumInView: PropTypes.func,
  clearErrors: PropTypes.func,
  composers: PropTypes.array,
  credits: PropTypes.object,
  failed: PropTypes.bool,
  image: PropTypes.string,
  load: PropTypes.func,
  name: PropTypes.string,
  producers: PropTypes.array,
  year: PropTypes.string,
};

TrackDetails.defaultProps = {
  credits: {},
  composers: [],
  producers: [],
};

const mapStateToProps = ({ tracks, albums, artists }, { trackId }) => {
  const track = tracks[trackId] || {};
  const album = albums[track.albumId] || {};
  const base = {
    track,
    album,
    artist: artists[track.artistId] || {},
  };
  const {
    track: {
      name, composers, producers, credits, failed, artistId,
    },
    album: {
      id: albumId, year, image,
    },
    artist: { name: artistName, image: background },
  } = base;
  const props = {
    name,
    composers,
    producers,
    credits,
    failed,
    albumId,
    artistId,
    image,
    year,
    artist: artistName,
    background,
  };
  return props;
};

const mapDispatchToProps = (dispatch, { trackId }) => ({
  load: () => dispatch(viewTrack(trackId)),
  clearErrors: () => dispatch(errorsActions.clearErrors()),
  clearAlbumInView: () => dispatch(clearAlbumInView()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetails);
