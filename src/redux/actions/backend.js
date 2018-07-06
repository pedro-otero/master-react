import { SET_SEARCH_RESULT } from '../albums';

export const loadSearchResult = id => (dispatch, getState, { backend, actions }) => {
  const album = getState().albums[id];
  if (album && album.progress === 100) {
    return;
  }
  return backend.getCredits(id)
    .subscribe((response) => {
      dispatch(actions.setSearchResult(response));
    }, () => {
      dispatch(actions.addError('Loading credits failed'));
    }, () => {
    });
};

export function setSearchResult(result) {
  return {
    type: SET_SEARCH_RESULT,
    data: {
      id: result.id,
      progress: result.progress,
      tracks: result.bestMatch.tracks.map(({
        id, composers, producers, credits,
      }) => ({
        id,
        value: {
          composers, producers, credits,
        },
      })),
    },
  };
}
