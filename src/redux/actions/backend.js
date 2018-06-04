export const loadSearchResult = id => (dispatch, getState, { backend, actions }) => {
  actions.setSearchResult('AL1', 'LOADING');
  backend.getCredits(id)
    .subscribe((response) => {
      actions.setSearchResult(id, response);
    }, () => actions.setSearchResult(id, 'FAILED'), () => {});
  return Promise.resolve({});
};
