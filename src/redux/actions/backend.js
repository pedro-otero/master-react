export const loadSearchResult = id => (dispatch, getState, { backend, actions }) => {
  dispatch(actions.setSearchResult('AL1', 'LOADING'));
  backend.getCredits(id)
    .subscribe((response) => {
      dispatch(actions.setSearchResult(id, response));
    }, () => dispatch(actions.setSearchResult(id, 'FAILED')), () => {});
  return Promise.resolve({});
};
