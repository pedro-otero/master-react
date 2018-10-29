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

export const loadSavedItems = (nextPage, dispatch, load, set) => {
  if (nextPage) {
    const { offset = -20, limit = 20 } = nextPage;
    return load({
      offset: offset + limit,
      limit,
    }).then(({ body }) => dispatch(set(body)));
  }
  return Promise.resolve();
};
