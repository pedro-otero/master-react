export const updateState = (state, defaultItem) => tracks => tracks.reduce((all, track) => {
  const merged = Object.assign(
    { ...(all[track.id] || defaultItem) },
    track.value,
  );
  return Object.assign({ ...all }, { [track.id]: merged });
}, state);

export const loadThunk = (id, items, dispatch, start, load, set, fail) => {
  const item = items[id];
  if (!item || item.failed) {
    dispatch(start(id));
    return load(id).then(
      response =>
        dispatch(set(response.body)).data,
      () =>
        dispatch(fail(id)),
    );
  }
  return Promise.resolve(item);
};
