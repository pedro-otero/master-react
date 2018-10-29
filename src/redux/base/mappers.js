export function trackToState(track) {
  const minutes = Math.floor(track.duration_ms / 60000);
  const seconds = Math.floor((track.duration_ms % 60000) / 1000);
  const duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return {
    id: track.id,
    albumId: track.album.id,
    name: track.name,
    artistId: track.artists[0].id,
    duration,
  };
}
