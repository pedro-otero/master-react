import { trackToState } from './tracks';

export function albumToState(album) {
  const {
    id,
    name,
    artists,
    images: [firstImage = {}],
    tracks: { items: tracks },
    release_date: releaseDate,
  } = album;
  const image = firstImage.url;
  const artistId = artists[0].id;
  const year = releaseDate.substring(0, 4);
  return {
    id,
    name,
    artistId,
    image,
    trackIds: tracks.map(track => track.id),
    tracks: tracks.map(track => Object.assign({
      album: { id },
      artists: [{ id: artistId }],
    }, track)).map(trackToState),
    year,
  };
}
