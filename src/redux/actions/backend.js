import { SET_SEARCH_RESULT } from '../albums';

export const loadSearchResult = id => (dispatch, getState, { actions, config }) => {
  const album = getState().albums[id];
  if (album && album.progress === 100) {
    return;
  }
  const { request, backendUrl } = config;
  request.get(`${backendUrl}/${id}`).end((err, res) => {
    if (err) {
      dispatch(actions.addError('Loading credits failed'));
    } else {
      dispatch(actions.setSearchResult(res.body));
    }
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
        composers,
        producers,
        credits,
      })),
    },
  };
}
