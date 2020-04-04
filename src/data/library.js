export function getItems(current, { body: response }) {
  let next = null;
  if (response.next) {
    next = {
      offset: response.offset + response.limit,
      limit: response.limit,
    };
  }
  const progressValue = 100 * (response.offset + response.limit) / response.total;
  const progress = {
    display: progressValue < 100,
    value: next ? progressValue : 100,
  };
  return {
    next,
    progress,
    items: [
      ...current.items,
      ...response.items,
    ],
  };
}

export function compareTrack(filter) {
  return track => !filter
    || track.name.toUpperCase().includes(filter.toUpperCase())
    || track.album.toUpperCase().includes(filter.toUpperCase())
    || track.artist.toUpperCase().includes(filter.toUpperCase());
}

export function compareAlbum(filter) {
  return album => !filter
    || album.name.toUpperCase().includes(filter.toUpperCase())
    || album.artist.toUpperCase().includes(filter.toUpperCase());
}

export function comparePlaylist(filter) {
  return playlist => !filter || playlist.name.toUpperCase().includes(filter.toUpperCase());
}
