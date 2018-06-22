import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingCircle from '../loading-circle/loading-circle';
import Progress from '../progress/progress';
import Credits from '../credits/credits';
import Composers from '../composers/composers';
import Producers from '../producers/producers';
import ArtistWork from '../artist-work/artist-work';

export const TrackDetails = ({
  name,
  artist,
  albumId,
  image,
  background,
  year,
  bestMatch,
  progress,
}) => {
  const status = (() => {
    if (!name) {
      return 'empty';
    }
    if (typeof progress === 'undefined') {
      return 'search-not-started';
    }
    if (progress === 100) {
      return 'finished';
    }
    if (!Object.keys(bestMatch.credits).length) {
      return 'no-credits';
    }
    return 'with-credits';
  })();

  return <article>
    <ArtistWork
        title={name}
        artist={artist}
        year={year}
        image={image}
        background={background}
        path={`/album/${albumId}`}>
      {bestMatch && <span>
        <Composers list={bestMatch.composers} />
        <br />
        <Producers list={bestMatch.producers} />
      </span>}
    </ArtistWork>
    {status === 'empty' && <LoadingCircle message="Loading data from Spotify..." />}
    {status === 'search-not-started' && <LoadingCircle message="Starting search..." />}
    {status === 'with-credits' &&
    <Progress
        size="small"
        value={progress} />}
    {bestMatch && <Credits data={bestMatch.credits} />}
    {status === 'no-credits' &&
    <Progress
        size="big"
        value={progress} />}
  </article>;
};

TrackDetails.propTypes = {
  albumId: PropTypes.string,
  artist: PropTypes.string,
  background: PropTypes.string,
  bestMatch: PropTypes.object,
  image: PropTypes.string,
  name: PropTypes.string,
  progress: PropTypes.number,
  year: PropTypes.string,
};

const mapStateToProps = ({
  tracks, albums, artists, searches,
}, { trackId }) => {
  const props = {};
  if (tracks[trackId]) {
    const track = tracks[trackId];
    if (track && track !== 'LOADING' && track !== 'FAILED') {
      Object.assign(props, {
        name: track.name,
        albumId: track.album.id,
        artist: track.artists[0].name,
      });
      const album = albums[track.album.id];
      if (album && album !== 'LOADING' && album !== 'FAILED') {
        Object.assign(props, {
          image: album.images[0].url,
          year: album.release_date.substring(0, 4),
        });
      }
      const artist = artists[track.artists[0].id];
      if (artist && artist !== 'LOADING' && artist !== 'FAILED') {
        Object.assign(props, {
          background: artist.images.length ? artist.images[0].url : '',
        });
      }
      const search = searches[track.album.id];
      if (search && search !== 'LOADING' && search !== 'FAILED') {
        Object.assign(props, {
          bestMatch: search.bestMatch.tracks.find(t => t.id === track.id),
          progress: search.progress,
        });
      }
    }
  }
  return props;
};

export default connect(mapStateToProps)(TrackDetails);
