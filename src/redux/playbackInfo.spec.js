import { setPlaybackInfo, loadPlaybackInfo, reduce, SET_PLAYBACK_INFO } from './playbackInfo';

describe('Playback info', () => {
  const dispatch = jest.fn(action => action);
  const playbackInfo = {
    item: {
      id: 'T1',
      artists: [{ id: 'AR1' }],
      album: { id: 'AL1' },
    },
  };
  const successApi = {
    getCurrentPlayback: jest.fn(() => Promise.resolve({
      body: playbackInfo,
    })),
  };
  const failureApi = {
    getCurrentPlayback: jest.fn(() => Promise.reject(Error())),
  };
  const actions = {
    loadArtist: jest.fn(),
    loadAlbum: jest.fn(() => Promise.resolve()),
    setTrack: jest.fn(),
    loadSearchResult: jest.fn(),
    addError: jest.fn(),
    setPlaybackInfo: jest.fn(),
  };
  const clearActionMocks = () => Object.entries(actions)
    .forEach(([_, action]) => action.mockClear());
  const emptyGetState = () => ({
    searches: { },
    albums: { },
    artists: { },
    tracks: { },
  });

  it('SET_PLAYBACK_INFO', () => {
    const action = setPlaybackInfo('val');
    expect(action).toEqual({
      type: SET_PLAYBACK_INFO,
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

    it('informs load started', () => {
      expect(actions.setPlaybackInfo).toHaveBeenCalledWith('LOADING');
    });

    it('informs load finished', () => {
      expect(actions.setPlaybackInfo).toHaveBeenCalledWith(playbackInfo);
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
      expect(actions.setPlaybackInfo).toHaveBeenCalledWith('LOADING');
    });

    it('informs load finished', () => {
      expect(actions.setPlaybackInfo).toHaveBeenCalledWith(null);
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
      expect(actions.setPlaybackInfo).toHaveBeenCalledWith('LOADING');
    });

    it('informs load failed', () => {
      expect(actions.setPlaybackInfo).toHaveBeenCalledWith('FAILED');
    });

    it('adds error', () => {
      expect(actions.addError).toBeCalled();
    });

    afterAll(() => {
      failureApi.getCurrentPlayback.mockClear();
      clearActionMocks();
    });
  });

  it('Reduces SET_PLAYBACK_INFO action', () => {
    const info = reduce(null, {
      type: SET_PLAYBACK_INFO, data: 'val',
    });
    expect(info).toEqual('val');
  });
});

