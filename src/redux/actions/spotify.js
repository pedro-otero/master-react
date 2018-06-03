import generateCreator from '../actions/generate-creator';

const setAlbum = generateCreator('SET_ALBUM');
const setArtist = generateCreator('SET_ARTIST');

export const setPlaybackInfo = data => ({
  type: 'SET_PLAYBACK_INFO',
  data,
});

export const loadPlaybackInfo = () => (dispatch, getState, spotifyApi) => {
  dispatch(setPlaybackInfo('LOADING'));
  return spotifyApi.getCurrentPlayback().then((response) => {
    dispatch(setPlaybackInfo(response.body));
    return response;
  }, () => dispatch(setPlaybackInfo('FAILED')));
};

export const loadAlbum = id => (dispatch, getState, spotifyApi) => {
  dispatch(setAlbum(id, 'LOADING'));
  return spotifyApi
    .getAlbum(id).then((response) => {
      dispatch(setAlbum(id, response.body));
      return response;
    }, () => dispatch(setAlbum(id, 'FAILED')));
};

export const loadArtist = id => (dispatch, getState, spotifyApi) => {
  dispatch(setArtist(id, 'LOADING'));
  return spotifyApi
    .getArtist(id).then((response) => {
      dispatch(setArtist(id, response.body));
      return response;
    }, () => dispatch(setArtist(id, 'FAILED')));
};
