export const loadSearchResult = id => (dispatch, getState, { backend, actions }) => {
  actions.setSearchResult('AL1', 'LOADING');
  backend.getCredits(id)
    .subscribe((response) => {
      actions.setSearchResult(id, response);
    });
  return Promise.resolve({});
};
