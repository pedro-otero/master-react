export const loadSearchResult = id => (dispatch, getState, { backend, actions }) => {
  backend.getCredits(id)
    .subscribe((response) => {
      response.bestMatch.tracks
        .map(track => actions.addTrackCredits(track.id, track, response.progress))
        .forEach(action => dispatch(action));
    }, () => {
      dispatch(actions.addError('Loading credits failed'));
    }, () => {
    });
};
