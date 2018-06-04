import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Banner from './banner';
import Cover from './cover';
import Label from './label';
import TrackItem from './track-item';

export const Album = ({ artist, album, search }) => {
  const artistImg = artist && artist.images.length ? artist.images[0].url : undefined;
  return <Fragment>
    {artist && album &&
      <Banner
          src={artistImg}
          className="content">
        <Cover
            album={album}
            imageClass="albumCover"
            yearClass="albumYear" />
        <div>
          <Label
              className="artistName"
              value={album.artists[0].name} />
          <Label
              className="trackName"
              value={album.name} />
        </div>
      </Banner>}
    {album && search && <Fragment>
      {album.tracks.items.map((fromSpotify, i) => <TrackItem
          key={`${album.id}-${fromSpotify.id}`}
          fromSearch={search.bestMatch.tracks[i]}
          fromSpotify={fromSpotify}
          number={i + 1} />)}
    </Fragment>}
  </Fragment>;
};

Album.propTypes = {
  album: PropTypes.object,
  artist: PropTypes.object,
  id: PropTypes.string.isRequired,
  search: PropTypes.object,
};

const mapStateToProps = ({
  albums, artists, searches,
}, { albumId }) => {
  const props = {};
  if (albums[albumId]) {
    const album = albums[albumId];
    if (album && album !== 'LOADING' && album !== 'FAILED') {
      Object.assign(props, { album });
    }
    const search = searches[albumId];
    if (search && search !== 'LOADING' && search !== 'FAILED') {
      Object.assign(props, { search });
    }
    const artist = artists[album.artists[0].id];
    if (artist && artist !== 'LOADING' && artist !== 'FAILED') {
      Object.assign(props, { artist });
    }
  }
  return props;
};

export default connect(mapStateToProps)(Album);
