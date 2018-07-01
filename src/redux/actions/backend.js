export const loadSearchResult = id => (dispatch, getState, { backend, actions }) => {
  backend.getCredits(id)
    .subscribe((response) => {
      dispatch(actions.setSearchResult(response));
    }, () => {
      dispatch(actions.addError('Loading credits failed'));
    }, () => {
    });
};

export function setSearchResult(result) {
  return {
    type: 'SET_SEARCH_RESULT',
    data: {
      tracks: result.bestMatch.tracks.map(({
        id, composers, producers, credits,
      }) => ({
        id,
        value: {
          composers, producers, credits, progress: result.progress, searchStarted: true,
        },
      })),
    },
  };
}
