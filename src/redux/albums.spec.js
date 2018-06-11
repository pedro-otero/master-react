import { loadAlbum } from './actions/spotify';

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
  searches: { },
  albums: { },
  artists: { },
  tracks: { },
});

describe('REDUX: Albums', () => {
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

    afterAll(() => {
      failureApi.getAlbum.mockClear();
      clearActionMocks();
    });
  });
});
