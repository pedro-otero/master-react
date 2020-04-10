import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Credits from 'components/Credits';
import ArtistWork from 'components/ArtistWork';
import { Block } from 'components/Utils';
import Progress from 'components/Progress';
import { ViewContext } from 'components/View';
import LoadingCircle from 'components/LoadingCircle';
import GlobalAppContext from '../../context';
import { trackToState } from '../../data/tracks';
import { albumToState } from '../../data/albums';
import { artistToState } from '../../data/artists';

const SmallText = styled.span`
  font-size: smaller;
`;

export function TrackDetails({
  trackId,
}) {
  const {
    spotify,
    observeAlbumSearch,
  } = React.useContext(GlobalAppContext);
  const { setIsError } = React.useContext(ViewContext);

  const [track, setTrack] = useState();
  const [album, setAlbum] = useState();
  const [artist, setArtist] = useState();
  const [releaseData, setReleaseData] = useState({ searchNotStarted: true });
  const [canDisplay, setCanDisplay] = useState(false);

  useEffect(() => {
    spotify.get(`/tracks/${trackId}`)
      .then(response => setTrack(trackToState(response.data)))
      .catch(() => setIsError(true));
  }, [setIsError, spotify, trackId]);

  useEffect(() => {
    if (track) {
      spotify.get(`/albums/${track.albumId}`)
        .then(response => setAlbum(albumToState(response.data)))
        .catch(() => setIsError(true));
    }
  }, [setIsError, spotify, track]);

  useEffect(() => {
    if (track) {
      spotify.get(`/artists/${track.artistId}`)
        .then(response => setArtist(artistToState(response.data)))
        .catch(() => setIsError(true));
    }
  }, [setIsError, spotify, track]);

  useEffect(() => {
    if (track && artist && album) {
      setCanDisplay(true);
    }
  }, [album, artist, track]);

  useEffect(() => {
    if (track) {
      const searchSubscription = observeAlbumSearch(track.albumId).subscribe({
        next: (res) => {
          const releaseTrack = res.bestMatch.tracks.find(t => t.id === trackId);
          setReleaseData({
            composers: releaseTrack.composers.join(', '),
            producers: releaseTrack.producers.join(', '),
            credits: releaseTrack.credits,
            progress: res.progress,
          });
        },
      });
      return searchSubscription.unsubscribe.bind(searchSubscription);
    }
    return () => {};
  }, [observeAlbumSearch, track, trackId]);

  return (
    <Fragment>
      {!canDisplay && <LoadingCircle message="Loading..." />}
      {canDisplay && <Fragment>
        {releaseData.progress !== 100 && <Progress value={releaseData.progress} size="small" />}
        <ArtistWork
            title={track.name}
            artist={artist.name}
            artistId={track.artistId}
            year={album.year}
            image={album.image}
            background={artist.image}
            path={`/album/${track.albumId}`}>
          {!releaseData.searchNotStarted && <span>
            <SmallText>({releaseData.composers})</SmallText>
            <br />
            <SmallText>[{releaseData.producers}]</SmallText>
          </span>}
        </ArtistWork>
        {releaseData.searchNotStarted && <LoadingCircle message="Starting search..." />}
        {!releaseData.searchNotStarted && <Block>
          <Credits data={releaseData.credits} />
        </Block>}
      </Fragment>}
    </Fragment>
  );
}

TrackDetails.propTypes = {
  trackId: PropTypes.string,
};

export default TrackDetails;
