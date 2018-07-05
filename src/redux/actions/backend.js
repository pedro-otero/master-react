import { SET_SEARCH_RESULT } from '../albums';

export const loadSearchResult = id => (dispatch, getState, { backend, actions }) => {
  const album = getState().albums[id];
  if (album && album.searchStarted && album.progress === 100) {
    return;
  }
  backend.getCredits(id)
    .subscribe((response) => {
      dispatch(actions.setSearchResult(response));
      const updatedAlbum = getState().albums[id];
      if (updatedAlbum && updatedAlbum.searchStarted) {
        backend.stopSearch(id);
      }
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
          composers, producers, credits, progress: result.progress, searchStarted: true,
        },
      })),
    },
  };
}
