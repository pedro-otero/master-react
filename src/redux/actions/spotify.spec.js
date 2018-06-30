import { setPlaybackInfo, loadPlaybackInfo, loadTrack } from './spotify';

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
    loadArtist: jest.fn(),
    loadAlbum: jest.fn(),
    setTrack: jest.fn(),
    loadSearchResult: jest.fn(),
    addError: jest.fn(),
  };
  const clearActionMocks = () => {
    actions.loadArtist.mockClear();
    actions.loadAlbum.mockClear();
    actions.setTrack.mockClear();
    actions.loadSearchResult.mockClear();
    actions.addError.mockClear();
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
});
