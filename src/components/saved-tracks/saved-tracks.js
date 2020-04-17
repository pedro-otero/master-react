import React, { Fragment } from 'react';

import SavedTrackItem from 'components/SavedTrackItem';
import NoItems from 'components/NoItems';
import GlobalAppContext from '../../context';
import DataContext from '../../data-context';
import { compareTrack, getItems } from '../../data/library';

export function SavedTracks() {
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
      spotify.get('/me/tracks', { params: items.next }).then(response => setItems(getItems(items, response)));
    }
  }, [spotify, items]);

  const tracks = items.items
    .map(savedTrack => ({
      id: savedTrack.track.id,
      name: savedTrack.track.name,
      artist: savedTrack.track.artists[0].name,
      album: savedTrack.track.album.name,
    }))
    .filter(compareTrack(filter));
  return (
    <Fragment>
      {tracks.map(({
        id, name, artist, album,
      }) => <SavedTrackItem
          key={id}
          id={id}
          name={name}
          artist={artist}
          album={album} />)}
      {!tracks.length && <NoItems />}
    </Fragment>
  );
}

export default SavedTracks;
