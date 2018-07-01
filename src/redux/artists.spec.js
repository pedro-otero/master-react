import { loadArtist, setArtist } from './artists';

const artist = { id: 'AR1' };
const successApi = {
  getArtist: jest.fn(() => Promise.resolve({ body: artist })),
};
const failureApi = {
  getArtist: jest.fn(() => Promise.reject(Error())),
};
const actions = {
  setArtist: jest.fn(),
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

describe('REDUX: Artists', () => {
  it('creates SET_ARTIST action for artists without images', () => {
    const action = setArtist('AR1', {
      name: 'The Artist',
      images: [],
    });
    expect(action).toEqual({
      type: 'SET_ARTIST',
      data: {
        id: 'AR1',
        value: {
          name: 'The Artist',
          id: 'AR1',
        },
      },
    });
  });

  it('creates SET_ARTIST action', () => {
    const action = setArtist('AR1', {
      name: 'The Artist',
      images: [{
        url: 'imgUrl',
      }],
    });
    expect(action).toEqual({
      type: 'SET_ARTIST',
      data: {
        id: 'AR1',
        value: {
          name: 'The Artist',
          id: 'AR1',
          image: 'imgUrl',
        },
      },
    });
  });

  describe('Succesful artist load', () => {
    let response;
    beforeAll((done) => {
      const thunk = loadArtist('AR1');
      thunk(jest.fn(), emptyGetState, { spotifyApi: successApi, actions }).then((resolution) => {
        response = resolution;
        done();
      });
    });

    it('forwards response', () => {
      expect(response.body).toEqual(artist);
    });

    it('calls api method', () => {
      expect(successApi.getArtist).toHaveBeenCalledWith('AR1');
    });

    it('informs load started', () => {
      expect(actions.startArtistLoad).toHaveBeenCalledWith('AR1');
    });

    it('informs load finished', () => {
      expect(actions.setArtist).toHaveBeenCalledWith('AR1', artist);
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
    thunk(jest.fn(), () => ({ artists: { AR1: 'FAILED' } }), { spotifyApi: successApi, actions }).then(() => {
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
});
