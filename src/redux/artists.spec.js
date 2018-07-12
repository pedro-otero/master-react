import { FAIL_ARTIST_LOAD, loadArtist, reduce, SET_ARTIST, setArtist, START_ARTIST_LOAD } from './artists';

describe('REDUX: Artists', () => {
  const dispatch = jest.fn(v => v);
  const artist = { id: 'AR1' };
  const successApi = {
    getArtist: jest.fn(() => Promise.resolve({ body: artist })),
  };
  const failureApi = {
    getArtist: jest.fn(() => Promise.reject(Error())),
  };
  const actions = {
    setArtist: jest.fn(() => ({
      data: { id: 'AR1' },
    })),
    startArtistLoad: jest.fn(),
    failArtistLoad: jest.fn(),
  };
  const clearActionMocks = () => Object.entries(actions)
    .forEach(([_, action]) => action.mockClear());
  const emptyGetState = () => ({
    searches: { },
    albums: { },
    artists: { },
    tracks: { },
  });

  it('creates SET_ARTIST action for artists without images', () => {
    const action = setArtist({
      id: 'AR1',
      name: 'The Artist',
      images: [],
    });
    expect(action).toEqual({
      type: SET_ARTIST,
      data: {
        name: 'The Artist',
        id: 'AR1',
      },
    });
  });

  it('creates SET_ARTIST action', () => {
    const action = setArtist({
      id: 'AR1',
      name: 'The Artist',
      images: [{
        url: 'imgUrl',
      }],
    });
    expect(action).toEqual({
      type: SET_ARTIST,
      data: {
        id: 'AR1',
        name: 'The Artist',
        image: 'imgUrl',
      },
    });
  });

  describe('Successful artist load', () => {
    let response;
    beforeAll((done) => {
      const thunk = loadArtist('AR1');
      thunk(dispatch, emptyGetState, { spotifyApi: successApi, actions }).then((resolution) => {
        response = resolution;
        done();
      });
    });

    it('forwards response', () => {
      expect(response.id).toEqual('AR1');
    });

    it('calls api method', () => {
      expect(successApi.getArtist).toHaveBeenCalledWith('AR1');
    });

    it('informs load started', () => {
      expect(actions.startArtistLoad).toHaveBeenCalledWith('AR1');
    });

    it('informs load finished', () => {
      expect(actions.setArtist).toHaveBeenCalledWith(artist);
    });

    afterAll(() => {
      successApi.getArtist.mockClear();
      clearActionMocks();
    });
  });

  it('Avoids to load artists already in state', (done) => {
    const thunk = loadArtist('AR1');
    thunk(null, () => ({ artists: { AR1: {} } }), { spotifyApi: successApi, actions }).then(() => {
      expect(successApi.getArtist).not.toBeCalled();
      done();
    });
  });

  it('Reloads a failed artist', (done) => {
    const thunk = loadArtist('AR1');
    thunk(dispatch, () => ({ artists: { AR1: { failed: true } } }), {
      spotifyApi: successApi, actions,
    }).then(() => {
      expect(successApi.getArtist).toBeCalled();
      done();
    });
  });

  describe('Artist load failure', () => {
    beforeAll((done) => {
      const thunk = loadArtist('AR1');
      thunk(jest.fn(), emptyGetState, { spotifyApi: failureApi, actions }).then(done);
    });

    it('calls api method', () => {
      expect(failureApi.getArtist).toHaveBeenCalledWith('AR1');
    });

    it('informs load started', () => {
      expect(actions.startArtistLoad).toHaveBeenCalledWith('AR1');
    });

    it('informs load failed', () => {
      expect(actions.failArtistLoad).toHaveBeenCalledWith('AR1');
    });

    afterAll(() => {
      failureApi.getArtist.mockClear();
      clearActionMocks();
    });
  });

  describe('reducer', () => {
    it('adds artists', () => {
      const artists = reduce({}, {
        type: SET_ARTIST,
        data: artist,
      });
      expect(artists.AR1).toEqual(Object.assign({ loading: false, failed: false }, artist));
    });

    it('sets artist as loading', () => {
      const artists = reduce({}, {
        type: START_ARTIST_LOAD,
        data: {
          id: artist.id,
        },
      });
      expect(artists.AR1).toEqual({ loading: true, failed: false });
    });

    it('sets artist as failed', () => {
      const artists = reduce({}, {
        type: FAIL_ARTIST_LOAD,
        data: {
          id: artist.id,
        },
      });
      expect(artists.AR1).toEqual({ loading: false, failed: true });
    });
  });
});
