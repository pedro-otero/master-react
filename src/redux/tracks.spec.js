import { FAIL_TRACK_LOAD, loadTrack, reduce, SET_TRACK, setTrack, START_TRACK_LOAD } from './tracks';

describe('REDUX: Tracks', () => {
  const dispatch = jest.fn(v => v);
  const track = {
    id: 'T1',
    artists: [{ id: 'AR1' }],
    album: { id: 'AL1' },
    duration_ms: 299500,
  };
  const successApi = {
    getTrack: jest.fn(() => Promise.resolve({
      body: track,
    })),
  };
  const failureApi = {
    getTrack: jest.fn(() => Promise.reject(Error())),
  };
  const actions = {
    loadAlbum: jest.fn(),
    setTrack: jest.fn(() => ({
      data: { id: 'T1' },
    })),
    startTrackLoad: jest.fn(),
    failTrackLoad: jest.fn(),
    loadSearchResult: jest.fn(),
  };
  const clearActionMocks = () => Object.entries(actions)
    .forEach(([_, action]) => action.mockClear());
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
      expect(response.id).toEqual('T1');
    });

    it('calls api method', () => {
      expect(successApi.getTrack).toHaveBeenCalledWith('T1');
    });

    it('informs load started', () => {
      expect(actions.startTrackLoad).toHaveBeenCalledWith('T1');
    });

    it('informs load failed', () => {
      expect(actions.setTrack).toHaveBeenCalledWith(track);
    });

    afterAll(() => {
      successApi.getTrack.mockClear();
      clearActionMocks();
    });
  });

  it('Avoids to load tracks already in state', (done) => {
    const thunk = loadTrack('T1');
    thunk(null, () => ({ tracks: { T1: {} } }), { spotifyApi: successApi, actions }).then(() => {
      expect(successApi.getTrack).not.toBeCalled();
      done();
    });
  });

  it('Reloads a failed track', (done) => {
    const thunk = loadTrack('T1');
    thunk(dispatch, () => ({
      tracks: { T1: { failed: true } },
    }), {
      spotifyApi: successApi, actions,
    }).then(() => {
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
      expect(actions.startTrackLoad).toHaveBeenCalledWith('T1');
    });

    it('informs load failed', () => {
      expect(actions.failTrackLoad).toHaveBeenCalledWith('T1');
    });

    afterAll(() => {
      failureApi.getTrack.mockClear();
      clearActionMocks();
    });
  });

  describe('reducer', () => {
    it('adds tracks', () => {
      const tracks = reduce({}, {
        type: SET_TRACK,
        data: track,
      });
      expect(tracks.T1).toEqual(Object.assign({
        loading: false,
        failed: false,
      }, track));
    });

    it('sets track as loading', () => {
      const tracks = reduce({}, {
        type: START_TRACK_LOAD,
        data: {
          id: track.id,
        },
      });
      expect(tracks.T1).toEqual({ loading: true, failed: false, searchStarted: false });
    });

    it('sets track as failed', () => {
      const tracks = reduce({}, {
        type: FAIL_TRACK_LOAD,
        data: {
          id: track.id,
        },
      });
      expect(tracks.T1).toEqual({ loading: false, failed: true });
    });
  });

  describe('Actions', () => {
    it('setTrack', () => {
      const action = setTrack(track);
      expect(action).toEqual({
        type: SET_TRACK,
        data: {
          id: 'T1',
          artistId: 'AR1',
          albumId: 'AL1',
          duration: '4:59',
        },
      });
    });
  });
});
