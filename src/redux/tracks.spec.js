import { loadTrack } from './actions/spotify';

describe('REDUX: Tracks', () => {
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
    startArtistLoad: jest.fn(),
    failArtistLoad: jest.fn(),
  };
  const clearActionMocks = () => {
    actions.setArtist.mockClear();
    actions.loadArtist.mockClear();
    actions.setAlbum.mockClear();
    actions.loadAlbum.mockClear();
    actions.setTrack.mockClear();
    actions.loadSearchResult.mockClear();
    actions.startArtistLoad.mockClear();
    actions.failArtistLoad.mockClear();
  };
  const emptyGetState = () => ({
    searches: {},
    albums: {},
    artists: {},
    tracks: {},
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

    afterAll(() => {
      failureApi.getTrack.mockClear();
      clearActionMocks();
    });
  });
});
