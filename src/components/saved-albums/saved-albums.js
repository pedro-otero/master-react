import React, { Fragment } from 'react';

import SavedAlbumItem from 'components/SavedAlbumItem';
import NoItems from 'components/NoItems';
import GlobalAppContext from '../../context';
import DataContext from '../../data-context';
import { compareAlbum, getItems } from '../../data/library';

export function SavedAlbums() {
  const {
    spotifyApi,
  } = React.useContext(GlobalAppContext);
  const { filter } = React.useContext(DataContext);

  const [items, setItems] = React.useState({
    next: { offset: 0, limit: 20 },
    items: [],
    progress: { display: false },
  });

  React.useEffect(() => {
    if (items.next) {
      spotifyApi.getMySavedAlbums(items.next).then(response => setItems(getItems(items, response)));
    }
  }, [spotifyApi, items]);

  const albums = items.items.map(({
    album: {
      id, name, artists: [{ name: artist }],
    },
    added_at: addedAt,
  }) => ({
    id, name, artist, addedAt,
  })).filter(compareAlbum(filter));
  return (
    <Fragment>
      {albums.map(({
         id, name, artist,
       }) => <SavedAlbumItem
           key={id}
           id={id}
           name={name}
           artist={artist} />)}
      {!albums.length && <NoItems />}
    </Fragment>
  );
}

export default SavedAlbums;
