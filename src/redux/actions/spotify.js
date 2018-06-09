export const setPlaybackInfo = data => ({
  type: 'SET_PLAYBACK_INFO',
  data,
});

export const loadPlaybackInfo = () => (dispatch, getState, { spotifyApi, actions }) => {
  dispatch(setPlaybackInfo('LOADING'));
  return spotifyApi.getCurrentPlayback().then((response) => {
    dispatch(setPlaybackInfo(response.body));
    if (response.body) {
      const albumId = response.body.item.album.id;
      dispatch(actions.loadSearchResult(albumId));
      dispatch(actions.setTrack(response.body.item.id, response.body.item));
      const artistId = response.body.item.artists[0].id;
      dispatch(actions.loadArtist(artistId));
      dispatch(actions.loadAlbum(albumId));
    }
    return response;
  }, () => dispatch(setPlaybackInfo('FAILED')));
};

export const loadAlbum = id => (dispatch, getState, { spotifyApi, actions }) => {
  const album = getState().albums[id];
  if (!album || album === 'FAILED') {
    dispatch(actions.setAlbum(id, 'LOADING'));
    return spotifyApi
      .getAlbum(id).then((response) => {
        dispatch(actions.setAlbum(id, response.body));
        response.body.tracks.items.forEach(track => actions.setTrack(track.id, track));
        const artistId = response.body.artists[0].id;
        dispatch(actions.loadArtist(artistId));
        return response;
      }, () => dispatch(actions.setAlbum(id, 'FAILED')));
  }
  return Promise.resolve(album);
};

export const loadArtist = id => (dispatch, getState, { spotifyApi, actions }) => {
  const artist = getState().artists[id];
  if (!artist || artist === 'FAILED') {
    dispatch(actions.setArtist(id, 'LOADING'));
    return spotifyApi
      .getArtist(id).then((response) => {
        dispatch(actions.setArtist(id, response.body));
        return response;
      }, () => dispatch(actions.setArtist(id, 'FAILED')));
  }
  return Promise.resolve(artist);
};

export const loadTrack = id => (dispatch, getState, { spotifyApi, actions }) => {
  const track = getState().tracks[id];
  if (!track || track === 'FAILED') {
    dispatch(actions.setTrack(id, 'LOADING'));
    return spotifyApi
      .getTrack(id).then((response) => {
        dispatch(actions.setTrack(id, response.body));
        const albumId = response.body.album.id;
        dispatch(actions.loadSearchResult(albumId));
        dispatch(actions.loadAlbum(albumId));
        return response;
      }, () => dispatch(actions.setTrack(id, 'FAILED')));
  }
  return Promise.resolve(track);
};
