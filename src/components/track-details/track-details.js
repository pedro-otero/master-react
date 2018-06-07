import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './track-details.css';
import LoadingCircle from '../loading-circle/loading-circle';
import Progress from '../progress/progress';
import Credits from '../credits/credits';
import Label from '../label/label';
import Cover from '../cover/cover';
import Banner from '../banner/banner';
import Composers from '../composers/composers';
import Producers from '../producers/producers';

export const TrackDetails = ({
  track,
  bestMatch,
  artist,
  album,
  progress,
}) => {
  const status = (() => {
    if (!track && !artist && !album) {
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

  const artistImg = artist && artist.images.length ? artist.images[0].url : undefined;

  return <article>
    {track && artist && album &&
    <Banner
        src={artistImg}
        className="content">
      <Link
          to={`/album/${album.id}`}
          className="RR-link">
        <Cover
          src={album.images[0].url}
          imageClass="albumCover"
          year={album.release_date.substring(0, 4)}
          yearClass="albumYear" />
      </Link>
      <div>
        <Label
            className="artistName"
            value={track.artists[0].name} />
        <Label
            className="trackName"
            value={track.name} />
        {bestMatch && <span>
          <Composers list={bestMatch.composers} />
          <br />
          <Producers list={bestMatch.producers} />
        </span>}
      </div>
    </Banner>}
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
  album: PropTypes.object,
  artist: PropTypes.object,
  bestMatch: PropTypes.object,
  progress: PropTypes.number,
  track: PropTypes.object,
};

const mapStateToProps = ({
  tracks, albums, artists, searches,
}, { trackId }) => {
  const props = {};
  if (tracks[trackId]) {
    const track = tracks[trackId];
    if (track && track !== 'LOADING' && track !== 'FAILED') {
      Object.assign(props, { track });
      const album = albums[track.album.id];
      if (album && album !== 'LOADING' && album !== 'FAILED') {
        Object.assign(props, { album });
      }
      const artist = artists[track.artists[0].id];
      if (artist && artist !== 'LOADING' && artist !== 'FAILED') {
        Object.assign(props, { artist });
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
