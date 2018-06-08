import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './album.css';
import ArtistWork from '../artist-work/artist-work';
import TrackItem from '../track-item/track-item';
import Progress from '../progress/progress';

export const Album = ({
  artistImg, albumImg, tracks, progress, year, name, artist, searchTracks,
}) => <Fragment>
  {artist && name &&
  <ArtistWork
      title={name}
      artist={artist}
      year={year}
      image={artistImg}
      background={albumImg} />}
  {name && searchTracks && <Fragment>
      {progress < 100 && <Progress
          size="small"
          value={progress} />}
    <ol className="tracklist">
      {tracks.map((fromSpotify, i) => {
          const { composers } = searchTracks[i];
          const { name: trackName, duration_ms: millis, id } = fromSpotify;
          return <li key={`${trackName}-${id}`}>
            <TrackItem
                id={id}
                name={trackName}
                millis={millis}
                composers={composers}
            />
          </li>;
        })}
    </ol>
    </Fragment>}
</Fragment>;

Album.propTypes = {
  albumImg: PropTypes.string,
  artist: PropTypes.string,
  artistImg: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  progress: PropTypes.number,
  searchTracks: PropTypes.array,
  tracks: PropTypes.array,
  year: PropTypes.string,
};

const mapStateToProps = ({
  albums, artists, searches,
}, { albumId }) => {
  const props = {};
  if (albums[albumId]) {
    const album = albums[albumId];
    if (album && album !== 'LOADING' && album !== 'FAILED') {
      Object.assign(props, {
        albumImg: album.images.length ? album.images[0].url : null,
        artist: album.artists[0].name,
        name: album.name,
        tracks: album.tracks.items,
        year: album.release_date.substring(0, 4),
      });
      const artist = artists[album.artists[0].id];
      if (artist && artist !== 'LOADING' && artist !== 'FAILED') {
        Object.assign(props, {
          artistImg: artist.images[0].url,
        });
      }
    }
    const search = searches[albumId];
    if (search && search !== 'LOADING' && search !== 'FAILED') {
      Object.assign(props, {
        progress: search.progress,
        searchTracks: search.bestMatch.tracks,
      });
    }
  }
  return props;
};

export default connect(mapStateToProps)(Album);
