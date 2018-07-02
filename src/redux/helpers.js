export const updateState = (state, defaultItem) => tracks => tracks.reduce((all, track) => {
  const merged = Object.assign(
    { ...(all[track.id] || defaultItem) },
    track.value,
  );
  return Object.assign({ ...all }, { [track.id]: merged });
}, state);
