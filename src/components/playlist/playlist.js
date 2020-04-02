import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ArtistWork from 'components/ArtistWork';
import { Block } from 'components/Utils';
import { ViewContext } from 'components/View';
import LoadingCircle from 'components/LoadingCircle';
import GlobalAppContext from '../../context';
import Progress from '../progress/progress';
import { getItems } from '../../data/library';
import ListItem from '../list-item/list-item';

export function Playlist({
  id,
}) {
  const {
    spotifyApi,
  } = React.useContext(GlobalAppContext);
  const { setIsError } = React.useContext(ViewContext);

  const [details, setDetails] = useState();
  const [tracks, setTracks] = useState(({
    next: { offset: 0, limit: 20 },
    items: [],
    progress: { display: false },
  }));

  useEffect(() => {
    spotifyApi.getPlaylist(id)
      .then((response) => {
        setDetails(response.body);
      })
      .catch(() => setIsError(true));
  }, [id, setIsError, spotifyApi]);

  React.useEffect(() => {
    if (tracks.next) {
      spotifyApi.getPlaylistTracks(id, tracks.next)
        .then(response => setTracks(getItems(tracks, response)));
    }
  }, [id, spotifyApi, tracks]);

  return (
    <Fragment>
      {!details && <LoadingCircle message="Loading..." />}
      {details && <Fragment>
        {tracks.progress.display && <Progress value={tracks.progress.value} size="small" />}
        <ArtistWork
            title={details.name}
            artist={details.owner.display_name}
            image={details.images[0].url}
            background={details.images[0].url} />
        <Block>
          {tracks.items.map(({ track }) => (
            <ListItem
                key={track.id}
                path={`/track/${track.id}`}
                name={track.name}
                additional={`${track.artists[0].name} - ${track.album.name}`}
                />
              ))}
        </Block>
      </Fragment>}
    </Fragment>
  );
}

Playlist.propTypes = {
  id: PropTypes.string,
};

export default Playlist;
