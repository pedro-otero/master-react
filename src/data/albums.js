import { trackToState } from './tracks';
import getFirstImageUrl from './get-first-image-url';

export function albumToState(album) {
  const {
    id,
    name,
    artists,
    images,
    tracks: { items: tracks } = { items: [] },
    release_date: releaseDate,
  } = album;
  const artistId = artists[0].id;
  const year = releaseDate.substring(0, 4);
  return {
    id,
    name,
    artistId,
    image: getFirstImageUrl(images),
    trackIds: tracks.map(track => track.id),
    tracks: tracks.map(track => Object.assign({
      album: { id },
      artists: [{ id: artistId }],
    }, track)).map(trackToState),
    year,
  };
}
