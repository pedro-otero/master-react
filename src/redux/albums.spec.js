import { loadAlbum, reduce, setAlbum } from './albums';

const dispatch = jest.fn();
const album = { id: 'AL1', artists: [{ id: 'AR1' }], tracks: { items: [{ id: 'T1' }] } };
const successApi = {
  getAlbum: jest.fn(() => Promise.resolve({ body: album })),
};
const failureApi = {
  getAlbum: jest.fn(() => Promise.reject(Error())),
};
const actions = {
  loadArtist: jest.fn(),
  setTrack: jest.fn(),
  setAlbum: jest.fn(),
  startAlbumLoad: jest.fn(),
  failAlbumLoad: jest.fn(),
};
const clearActionMocks = () => Object.entries(actions)
  .forEach(([_, action]) => action.mockClear());
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
        name: 'The Album',
        artistId: 'AR1',
        image: 'imgUrl',
        tracks: [{
          album: { id: 'AL1' },
          id: 'T1',
          name: 'Track #1',
        }],
        year: '2004',
      },
    });
  });

  describe('reducer', () => {
    it('adds albums', () => {
      const albums = reduce({}, {
        type: 'SET_ALBUM',
        data: Object.assign(album, { tracks: [{ id: 'T1' }] }),
      });
      expect(albums.AL1).toEqual(Object.assign({ loading: false, failed: false }, album, { tracks: ['T1'] }));
    });

    it('sets album as loading', () => {
      const albums = reduce({}, {
        type: 'START_ALBUM_LOAD',
        data: {
          id: album.id,
        },
      });
      expect(albums.AL1).toEqual({ loading: true, failed: false, tracks: [] });
    });

    it('sets album as failed', () => {
      const albums = reduce({}, {
        type: 'FAIL_ALBUM_LOAD',
        data: {
          id: album.id,
        },
      });
      expect(albums.AL1).toEqual({ loading: false, failed: true, tracks: [] });
    });
  });
});
