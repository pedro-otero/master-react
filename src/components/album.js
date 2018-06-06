import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './album.css';
import Banner from './banner';
import Cover from './cover';
import Label from './label';
import TrackItem from './track-item';
import Progress from './progress';

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
      {search.progress < 100 && <Progress
          size="small"
          value={search.progress} />}
      <ol className="tracklist">
        {album.tracks.items.map((fromSpotify, i) => (
          <li key={`${album.id}-${fromSpotify.id}`}>
            <TrackItem
                fromSearch={search.bestMatch.tracks[i]}
                fromSpotify={fromSpotify} />
          </li>))}
      </ol>
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
      const artist = artists[album.artists[0].id];
      if (artist && artist !== 'LOADING' && artist !== 'FAILED') {
        Object.assign(props, { artist });
      }
    }
    const search = searches[albumId];
    if (search && search !== 'LOADING' && search !== 'FAILED') {
      Object.assign(props, { search });
    }
  }
  return props;
};

export default connect(mapStateToProps)(Album);
