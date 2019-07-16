import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Credits from 'components/Credits';
import ArtistWork from 'components/ArtistWork';
import { Block } from 'components/Utils';
import { clearAlbumInView, viewTrack } from 'state/view';
import * as errorsActions from 'state/errors';

const SmallText = styled.span`
  font-size: small;
`;

export class TrackDetails extends React.Component {
  componentDidMount() {
    this.props.load();
    this.props.clearErrors();
  }

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
    } = this.props;
    return (
      <Fragment>
        <ArtistWork
            title={name}
            artist={artist}
            artistId={artistId}
            year={year}
            image={image}
            background={background}
            path={`/album/${albumId}`}>
          <span>
            <SmallText>({composers})</SmallText>
            <br />
            <SmallText>[{producers}]</SmallText>
          </span>
        </ArtistWork>
        <Block>
          <Credits data={credits} />
        </Block>
      </Fragment>
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
  composers: PropTypes.string,
  credits: PropTypes.object,
  image: PropTypes.string,
  load: PropTypes.func,
  name: PropTypes.string,
  producers: PropTypes.string,
  year: PropTypes.string,
};

TrackDetails.defaultProps = {
  credits: {},
  composers: '',
  producers: '',
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
      name, composers, producers, credits, artistId,
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
