import { setPlaybackInfo, loadPlaybackInfo, loadAlbum, loadArtist, loadTrack } from './spotify';

describe('Spotify actions', () => {
  const dispatch = jest.fn();
  const playbackInfo = {
    item: {
      id: 'T1',
      artists: [{ id: 'AR1' }],
      album: { id: 'AL1' },
    },
  };
  const album = { id: 'AL1', artists: [{ id: 'AR1' }], tracks: { items: [{ id: 'T1' }] } };
  const successApi = {
    getCurrentPlayback: jest.fn(() => Promise.resolve({
      body: playbackInfo,
    })),
    getAlbum: jest.fn(() => Promise.resolve({ body: album })),
    getArtist: jest.fn(() => Promise.resolve({ body: {} })),
    getTrack: jest.fn(() => Promise.resolve({
      body: playbackInfo.item,
    })),
  };
  const failureApi = {
    getCurrentPlayback: jest.fn(() => Promise.reject(Error())),
    getAlbum: jest.fn(() => Promise.reject(Error())),
    getArtist: jest.fn(() => Promise.reject(Error())),
    getTrack: jest.fn(() => Promise.reject(Error())),
  };
  const actions = {
    setArtist: jest.fn(),
    loadArtist: jest.fn(),
    setAlbum: jest.fn(),
    loadAlbum: jest.fn(),
    setTrack: jest.fn(),
    loadSearchResult: jest.fn(),
    addError: jest.fn(),
    clearErrors: jest.fn(),
  };
  const clearActionMocks = () => {
    actions.setArtist.mockClear();
    actions.loadArtist.mockClear();
    actions.setAlbum.mockClear();
    actions.loadAlbum.mockClear();
    actions.setTrack.mockClear();
    actions.loadSearchResult.mockClear();
    actions.addError.mockClear();
    actions.clearErrors.mockClear();
  };
  const emptyGetState = () => ({
    searches: { },
    albums: { },
    artists: { },
    tracks: { },
  });

  it('SET_PLAYBACK_INFO', () => {
    const action = setPlaybackInfo('val');
    expect(action).toEqual({
      type: 'SET_PLAYBACK_INFO',
      data: 'val',
    });
  });

  describe('Successful playback info load', () => {
    let response;
    beforeAll((done) => {
      const thunk = loadPlaybackInfo();
      thunk(dispatch, emptyGetState, { spotifyApi: successApi, actions }).then((resolution) => {
        response = resolution;
        done();
      });
    });

    it('forwards response', () => {
      expect(response.body).toEqual(playbackInfo);
    });

    it('calls api method', () => {
      expect(successApi.getCurrentPlayback).toHaveBeenCalled();
    });

    it('calls loadSearchResult', () => {
      expect(actions.loadSearchResult).toHaveBeenCalledWith('AL1');
    });

    it('informs load started', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: 'LOADING',
      });
    });

    it('informs load finished', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: playbackInfo,
      });
    });

    it('calls actions.loadArtist', () => {
      expect(actions.loadArtist).toHaveBeenCalledWith('AR1');
    });

    it('calls actions.loadAlbum', () => {
      expect(actions.loadAlbum).toHaveBeenCalledWith('AL1');
    });

    it('calls actions.setTrack', () => {
      expect(actions.setTrack).toHaveBeenCalledWith('T1', playbackInfo.item);
    });

    afterAll(() => {
      successApi.getCurrentPlayback.mockClear();
      clearActionMocks();
    });
  });

  describe('Succesful empty playback info load', () => {
    let response;
    const api = {
      getCurrentPlayback: jest.fn(() => Promise.resolve({
        body: null,
      })),
    };
    beforeAll((done) => {
      const thunk = loadPlaybackInfo();
      thunk(dispatch, emptyGetState, { spotifyApi: api, actions }).then((resolution) => {
        response = resolution;
        done();
      });
    });

    it('forwards response', () => {
      expect(response.body).toEqual(null);
    });


    it('calls api method', () => {
      expect(api.getCurrentPlayback).toHaveBeenCalled();
    });

    it('informs load started', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: 'LOADING',
      });
    });

    it('informs load finished', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: null,
      });
    });

    it('does not call actions.loadArtist', () => {
      expect(actions.loadArtist).not.toHaveBeenCalled();
    });

    it('does not call actions.loadAlbum', () => {
      expect(actions.loadAlbum).not.toHaveBeenCalled();
    });

    it('does not call actions.setTrack', () => {
      expect(actions.setTrack).not.toHaveBeenCalled();
    });

    afterAll(clearActionMocks);
  });

  describe('Failed playback info load', () => {
    beforeAll((done) => {
      const thunk = loadPlaybackInfo();
      thunk(dispatch, emptyGetState, { spotifyApi: failureApi, actions }).then(done);
    });

    it('calls api method', () => {
      expect(failureApi.getCurrentPlayback).toHaveBeenCalled();
    });

    it('informs load started', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: 'LOADING',
      });
    });

    it('informs load failed', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SET_PLAYBACK_INFO',
        data: 'FAILED',
      });
    });

    it('adds error', () => {
      expect(actions.addError).toBeCalled();
    });

    afterAll(() => {
      failureApi.getCurrentPlayback.mockClear();
      clearActionMocks();
    });
  });

  describe('Succesful album load', () => {
    let response;
    beforeAll((done) => {
      const thunk = loadAlbum('AL1');
      thunk(dispatch, emptyGetState, { spotifyApi: successApi, actions }).then((resolution) => {
        response = resolution;
        done();
      });
    });

    it('forwards response', () => {
      expect(response.body).toEqual(album);
    });

    it('calls api method', () => {
      expect(successApi.getAlbum).toHaveBeenCalledWith('AL1');
    });

    it('informs load started', () => {
      expect(actions.setAlbum).toHaveBeenCalledWith('AL1', 'LOADING');
    });

    it('calls actions.loadArtist', () => {
      expect(actions.loadArtist).toHaveBeenCalledWith('AR1');
    });

    it('calls actions.setTrack', () => {
      expect(actions.setTrack).toHaveBeenCalledWith('T1', { id: 'T1', album: { id: 'AL1' } });
    });

    it('informs load succeded', () => {
      expect(actions.setAlbum).toHaveBeenCalledWith('AL1', album);
    });

    afterAll(() => {
      successApi.getAlbum.mockClear();
      clearActionMocks();
    });
  });

  it('Avoids to load albums already in state', (done) => {
    const thunk = loadAlbum('AL1');
    thunk(null, () => ({ albums: { AL1: {} } }), { spotifyApi: successApi }).then(() => {
      expect(successApi.getAlbum).not.toBeCalled();
      done();
    });
  });

  it('Reloads a failed album', (done) => {
    const thunk = loadAlbum('AL1');
    thunk(dispatch, () => ({ albums: { AL1: 'FAILED' } }), { spotifyApi: successApi, actions }).then(() => {
      expect(successApi.getAlbum).toBeCalled();
      done();
    });
  });

  describe('Album load failure', () => {
    beforeAll((done) => {
      const thunk = loadAlbum('AL1');
      thunk(dispatch, emptyGetState, { spotifyApi: failureApi, actions }).then(done);
    });

    it('calls api method', () => {
      expect(failureApi.getAlbum).toHaveBeenCalledWith('AL1');
    });

    it('informs load started', () => {
      expect(actions.setAlbum).toHaveBeenCalledWith('AL1', 'LOADING');
    });

    it('informs load failed', () => {
      expect(actions.setAlbum).toHaveBeenCalledWith('AL1', 'FAILED');
    });

    it('adds error', () => {
      expect(actions.addError).toBeCalled();
    });

    afterAll(() => {
      failureApi.getAlbum.mockClear();
      clearActionMocks();
    });
  });

  describe('Succesful artist load', () => {
    let response;
    beforeAll((done) => {
      const thunk = loadArtist('AR1');
      thunk(dispatch, emptyGetState, { spotifyApi: successApi, actions }).then((resolution) => {
        response = resolution;
        done();
      });
    });

    it('forwards response', () => {
      expect(response.body).toEqual({});
    });

    it('calls api method', () => {
      expect(successApi.getArtist).toHaveBeenCalledWith('AR1');
    });

    it('informs load started', () => {
      expect(actions.setArtist).toHaveBeenCalledWith('AR1', 'LOADING');
    });

    it('informs load finished', () => {
      expect(actions.setArtist).toHaveBeenCalledWith('AR1', {});
    });

    afterAll(() => {
      successApi.getArtist.mockClear();
      clearActionMocks();
    });
  });

  it('Avoids to load artists already in state', (done) => {
    const thunk = loadArtist('AR1');
    thunk(null, () => ({ artists: { AR1: {} } }), { spotifyApi: successApi }).then(() => {
      expect(successApi.getArtist).not.toBeCalled();
      done();
    });
  });

  it('Reloads a failed artist', (done) => {
    const thunk = loadArtist('AR1');
    thunk(dispatch, () => ({ artists: { AR1: 'FAILED' } }), { spotifyApi: successApi, actions }).then(() => {
      expect(successApi.getArtist).toBeCalled();
      done();
    });
  });

  describe('Artist load failure', () => {
    beforeAll((done) => {
      const thunk = loadArtist('AR1');
      thunk(dispatch, emptyGetState, { spotifyApi: failureApi, actions }).then(done);
    });

    it('calls api method', () => {
      expect(failureApi.getArtist).toHaveBeenCalledWith('AR1');
    });

    it('informs load started', () => {
      expect(actions.setArtist).toHaveBeenCalledWith('AR1', 'LOADING');
    });

    it('informs load failed', () => {
      expect(actions.setArtist).toHaveBeenCalledWith('AR1', 'FAILED');
    });

    it('adds error', () => {
      expect(actions.addError).toBeCalled();
    });

    afterAll(() => {
      failureApi.getArtist.mockClear();
      clearActionMocks();
    });
  });

  describe('Succesful track load', () => {
    let response;
    beforeAll((done) => {
      const thunk = loadTrack('T1');
      thunk(dispatch, emptyGetState, { spotifyApi: successApi, actions }).then((resolution) => {
        response = resolution;
        done();
      });
    });

    it('forwards response', () => {
      expect(response.body).toEqual(playbackInfo.item);
    });

    it('calls api method', () => {
      expect(successApi.getTrack).toHaveBeenCalledWith('T1');
    });

    it('calls actions.loadAlbum', () => {
      expect(actions.loadAlbum).toHaveBeenCalledWith('AL1');
    });

    it('informs load started', () => {
      expect(actions.setTrack).toHaveBeenCalledWith('T1', 'LOADING');
    });

    it('informs load failed', () => {
      expect(actions.setTrack).toHaveBeenCalledWith('T1', playbackInfo.item);
    });

    afterAll(() => {
      successApi.getTrack.mockClear();
      clearActionMocks();
    });
  });

  it('Avoids to load tracks already in state', (done) => {
    const thunk = loadTrack('T1');
    thunk(null, () => ({ tracks: { T1: {} } }), { spotifyApi: successApi }).then(() => {
      expect(successApi.getTrack).not.toBeCalled();
      done();
    });
  });

  it('Reloads a failed track', (done) => {
    const thunk = loadTrack('T1');
    thunk(dispatch, () => ({ tracks: { T1: 'FAILED' } }), { spotifyApi: successApi, actions }).then(() => {
      expect(successApi.getTrack).toBeCalled();
      done();
    });
  });

  describe('Track load failure', () => {
    beforeAll((done) => {
      const thunk = loadTrack('T1');
      thunk(dispatch, emptyGetState, { spotifyApi: failureApi, actions }).then(done);
    });

    it('calls api method', () => {
      expect(failureApi.getTrack).toHaveBeenCalledWith('T1');
    });

    it('informs load started', () => {
      expect(actions.setTrack).toHaveBeenCalledWith('T1', 'LOADING');
    });

    it('informs load failed', () => {
      expect(actions.setTrack).toHaveBeenCalledWith('T1', 'FAILED');
    });

    it('adds error', () => {
      expect(actions.addError).toBeCalled();
    });

    afterAll(() => {
      failureApi.getTrack.mockClear();
      clearActionMocks();
    });
  });
});
