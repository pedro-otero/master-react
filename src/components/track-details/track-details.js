import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Credits from 'components/Credits';
import Composers from 'components/Composers';
import Producers from 'components/Producers';
import ArtistWork from 'components/ArtistWork';
import { Block } from 'components/Utils';
import { viewTrack } from 'state/view';
import View from 'components/View';
import { loadSearchResult } from 'state/actions/backend';
import { clearErrors } from 'state/errors';

export const TrackDetails = ({
  name,
  artist,
  artistId,
  albumId,
  image,
  background,
  year,
  progress,
  credits,
  composers,
  producers,
  load,
  failed,
  loadSearchResult,
  clearErrors,
}) => (
  <View
      clearErrors={clearErrors}
      canStartLoadingDetails={() => !!albumId}
      shouldStopSearching={() => progress === 100}
      load={load}
      loadSearchResult={() => loadSearchResult(albumId)}
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

TrackDetails.propTypes = {
  albumId: PropTypes.string,
  artist: PropTypes.string,
  background: PropTypes.string,
  composers: PropTypes.array,
  credits: PropTypes.object,
  failed: PropTypes.bool,
  image: PropTypes.string,
  name: PropTypes.string,
  producers: PropTypes.array,
  progress: PropTypes.number,
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
      id: albumId, year, image, progress,
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
    progress,
    artist: artistName,
    background,
  };
  return props;
};

const mapDispatchToProps = (dispatch, { trackId }) => ({
  load: () => dispatch(viewTrack(trackId)),
  loadSearchResult: id => dispatch(loadSearchResult(id)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetails);
