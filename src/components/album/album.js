import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './album.css';
import ArtistWork from '../artist-work/artist-work';
import TrackItem from '../track-item/track-item';
import Progress from '../progress/progress';

export const Album = ({
  artistImg, albumImg, tracks, progress, year, name, artist,
}) => <Fragment>
  {artist && name &&
  <ArtistWork
      title={name}
      artist={artist}
      year={year}
      image={albumImg}
      background={artistImg} />}
  {name && <Fragment>
      {progress < 100 && <Progress
          size="small"
          value={progress} />}
    <ol className={styles.tracklist}>
      {tracks.map(track => (
        <li key={`${track.name}-${track.id}`}>
          <TrackItem
              id={track.id}
              name={track.name}
              duration={track.duration}
              composers={track.composers}
            />
        </li>))}
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
  tracks: PropTypes.array,
  year: PropTypes.string,
};

const mapStateToProps = ({ albums, tracks }, { albumId }) => {
  const album = albums[albumId];
  if (album) {
    return {
      albumImg: album.image,
      name: album.name,
      tracks: album.tracks.map(id => tracks[id]),
      year: album.year,
      artistImg: album.artistImg,
      artist: album.artist,
    };
  }
  return {};
};

export default connect(mapStateToProps)(Album);
