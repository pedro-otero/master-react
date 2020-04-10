import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ArtistWork from 'components/ArtistWork';
import TrackItem from 'components/TrackItem';
import { Block } from 'components/Utils';
import { ViewContext } from 'components/View';
import LoadingCircle from 'components/LoadingCircle';
import GlobalAppContext from '../../context';
import Progress from '../progress/progress';
import { albumToState } from '../../data/albums';
import { artistToState } from '../../data/artists';

export function Album({
  albumId,
}) {
  const {
    spotify,
    observeAlbumSearch,
  } = React.useContext(GlobalAppContext);
  const { setIsError } = React.useContext(ViewContext);

  const [album, setAlbum] = useState();
  const [artist, setArtist] = useState();
  const [releaseData, setReleaseData] = useState({ searchNotStarted: true });
  const [canDisplay, setCanDisplay] = useState(false);

  useEffect(() => {
    spotify.get(`/albums/${albumId}`)
      .then(response => setAlbum(albumToState(response.data)))
      .catch(() => setIsError(true));
  }, [albumId, setIsError, spotify]);

  useEffect(() => {
    if (album) {
      spotify.get(`/artists/${album.artistId}`)
        .then(response => setArtist(artistToState(response.data)))
        .catch(() => setIsError(true));
    }
  }, [album, setIsError, spotify]);

  useEffect(() => {
    if (artist && album) {
      setCanDisplay(true);
    }
  }, [album, artist]);

  useEffect(() => {
    const searchSubscription = observeAlbumSearch(albumId).subscribe({
      next: (res) => {
        if (album) {
          const tracks = res.bestMatch.tracks.map((releaseTrack, i) => {
            const albumTrack = album.tracks[i];
            return {
              id: albumTrack.id,
              name: albumTrack.name,
              duration: albumTrack.duration,
              composers: releaseTrack.composers.join(', '),
            };
          });
          setReleaseData({
            tracks,
            progress: res.progress,
          });
        }
      },
    });
    return searchSubscription.unsubscribe.bind(searchSubscription);
  }, [album, albumId, observeAlbumSearch]);

  return (
    <Fragment>
      {!canDisplay && <LoadingCircle message="Loading..." />}
      {canDisplay && <Fragment>
        {releaseData.progress !== 100 && <Progress value={releaseData.progress} size="small" />}
        <ArtistWork
            title={album.name}
            artist={artist.name}
            artistId={album.artistId}
            year={album.year}
            image={album.image}
            background={artist.image} />
        {releaseData.searchNotStarted && <LoadingCircle message="Starting search..." />}
        {!releaseData.searchNotStarted && <Block>
          <ol>
            {releaseData.tracks.map(track => (
              <li key={`${track.name}-${track.id}`}>
                <TrackItem
                    id={track.id}
                    name={track.name}
                    duration={track.duration}
                    composers={track.composers}
                />
              </li>))}
          </ol>
        </Block>}
      </Fragment>}
    </Fragment>
  );
}

Album.propTypes = {
  albumId: PropTypes.string,
};

export default Album;
