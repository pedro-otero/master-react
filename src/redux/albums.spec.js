import { loadAlbum, setAlbum } from './albums';

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
  setAlbum: jest.fn(),
  loadSearchResult: jest.fn(),
  startAlbumLoad: jest.fn(),
  failAlbumLoad: jest.fn(),
};
const clearActionMocks = () => {
  actions.loadArtist.mockClear();
  actions.loadAlbum.mockClear();
  actions.setTrack.mockClear();
  actions.setAlbum.mockClear();
  actions.loadSearchResult.mockClear();
  actions.startAlbumLoad.mockClear();
  actions.failAlbumLoad.mockClear();
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
      expect(actions.startAlbumLoad).toHaveBeenCalledWith('AL1');
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
      expect(actions.startAlbumLoad).toHaveBeenCalledWith('AL1');
    });

    it('informs load failed', () => {
      expect(actions.failAlbumLoad).toHaveBeenCalledWith('AL1');
    });

    afterAll(() => {
      failureApi.getAlbum.mockClear();
      clearActionMocks();
    });
  });

  it('creates SET_ALBUM action', () => {
    const action = setAlbum('AL1', {
      name: 'The Album',
      artists: [{
        id: 'AR1',
      }],
      images: [{
        url: 'imgUrl',
      }],
      tracks: {
        items: [{
          id: 'T1',
          name: 'Track #1',
        }],
      },
      release_date: '2004',
    });
    expect(action).toEqual({
      type: 'SET_ALBUM',
      data: {
        id: 'AL1',
        value: {
          id: 'AL1',
          name: 'The Album',
          artist: 'AR1',
          image: 'imgUrl',
          tracks: ['T1'],
          year: '2004',
        },
      },
    });
  });
});
