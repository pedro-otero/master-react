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
