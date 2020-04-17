import React, { Fragment } from 'react';

import NoItems from 'components/NoItems';
import GlobalAppContext from '../../context';
import DataContext from '../../data-context';
import { comparePlaylist, getItems } from '../../data/library';
import ListItem from '../list-item/list-item';

export function FollowedPlaylists() {
  const {
    spotify,
  } = React.useContext(GlobalAppContext);
  const { filter } = React.useContext(DataContext);

  const [items, setItems] = React.useState({
    next: { offset: 0, limit: 20 },
    items: [],
    progress: { display: false },
  });

  React.useEffect(() => {
    if (items.next) {
      spotify.get('/me/playlists', { params: items.next }).then(response => setItems(getItems(items, response)));
    }
  }, [items, spotify]);

  const playlists = items.items.map(({
    id, name, owner: { display_name: owner }, tracks: { total: tracks },
  }) => ({
    id, name, owner, tracks,
  })).filter(comparePlaylist(filter));
  return (
    <Fragment>
      {playlists.map(({
         id, name, owner, tracks,
       }) => (
         <ListItem
             key={id}
             path={`/playlist/${id}`}
             name={name}
             additional={`${owner} (${tracks})`} />
         ))}
      {!playlists.length && <NoItems />}
    </Fragment>
  );
}

export default FollowedPlaylists;
