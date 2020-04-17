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
    spotify,
  } = React.useContext(GlobalAppContext);
  const { setIsError } = React.useContext(ViewContext);

  const [details, setDetails] = useState();
  const [tracks, setTracks] = useState(({
    next: { offset: 0, limit: 20 },
    items: [],
    progress: { display: false },
  }));

  useEffect(() => {
    spotify.get(`/playlists/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch(() => setIsError(true));
  }, [id, setIsError, spotify]);

  React.useEffect(() => {
    if (tracks.next) {
      spotify.get(`/playlists/${id}/tracks`, { params: tracks.next })
        .then(response => setTracks(getItems(tracks, response)));
    }
  }, [id, spotify, tracks]);

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
