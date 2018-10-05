import { loadPlaybackInfo, reduce, SET_PLAYBACK_INFO } from './playbackInfo';

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
    getMyCurrentPlaybackState: jest.fn(() => Promise.resolve({
      body: playbackInfo,
    })),
  };
  const failureApi = {
    getMyCurrentPlaybackState: jest.fn(() => Promise.reject(Error())),
  };
  const actions = {
    startPlaybackInfoLoad: jest.fn(),
    addError: jest.fn(),
    setPlaybackInfo: jest.fn(),
    failPlaybackInfoLoad: jest.fn(),
  };
  const clearActionMocks = () => Object.entries(actions)
    .forEach(([_, action]) => action.mockClear());
  const emptyGetState = () => ({
    searches: { },
    albums: { },
    artists: { },
    tracks: { },
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
      expect(successApi.getMyCurrentPlaybackState).toHaveBeenCalled();
    });

    it('informs load started', () => {
      expect(actions.startPlaybackInfoLoad).toHaveBeenCalled();
    });

    it('informs load finished', () => {
      expect(actions.setPlaybackInfo).toHaveBeenCalledWith(playbackInfo);
    });

    afterAll(() => {
      successApi.getMyCurrentPlaybackState.mockClear();
      clearActionMocks();
    });
  });

  describe('Succesful empty playback info load', () => {
    let response;
    const api = {
      getMyCurrentPlaybackState: jest.fn(() => Promise.resolve({
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
      expect(api.getMyCurrentPlaybackState).toHaveBeenCalled();
    });

    it('informs load started', () => {
      expect(actions.startPlaybackInfoLoad).toHaveBeenCalled();
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
      expect(failureApi.getMyCurrentPlaybackState).toHaveBeenCalled();
    });

    it('informs load started', () => {
      expect(actions.startPlaybackInfoLoad).toHaveBeenCalled();
    });

    it('informs load failed', () => {
      expect(actions.failPlaybackInfoLoad).toHaveBeenCalled();
    });

    it('adds error', () => {
      expect(actions.addError).toBeCalled();
    });

    afterAll(() => {
      failureApi.getMyCurrentPlaybackState.mockClear();
      clearActionMocks();
    });
  });
});

