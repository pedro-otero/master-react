export const loadSearchResult = id => (dispatch, getState, { backend, actions }) => {
  const search = getState().searches[id];
  if (!search || search === 'FAILED') {
    dispatch(actions.setSearchResult(id, 'LOADING'));
    backend.getCredits(id)
      .subscribe((response) => {
        dispatch(actions.setSearchResult(id, response));
      }, () => {
        dispatch(actions.setSearchResult(id, 'FAILED'));
        dispatch(actions.addError('Loading credits failed'));
      }, () => {
      });
  }
  return Promise.resolve({});
};
