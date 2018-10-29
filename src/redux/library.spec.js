import {
  loadSavedAlbums,
  loadSavedTracks,
  setSavedAlbums,
  setSavedTracks,
  SET_SAVED_ALBUMS,
  SET_SAVED_TRACKS,
  savedAlbumsReducer,
  savedTracksReducer,
} from './library';

describe('REDUX: Library', () => {
  describe('loadSavedTracks', () => {
    describe('fetch page', () => {
      const state = {
        user: {
          library: {
            tracks: {
              items: {},
              nextPage: { offset: 0, limit: 20 },
            },
          },
        },
      };
      const response = {
        items: [{}, {}],
      };
      const spotifyApi = {
        getMySavedTracks: jest.fn(() => Promise.resolve({
          body: response,
        })),
      };
      const actions = { setSavedTracks: jest.fn(), setTrack: jest.fn() };
      loadSavedTracks()(jest.fn(), () => state, { spotifyApi, actions });

      it('calls getMySavedTracks', () => {
        expect(spotifyApi.getMySavedTracks).toBeCalledWith({
          offset: 20,
          limit: 20,
        });
      });

      it('calls setSavedTracks', () => {
        expect(actions.setSavedTracks).toBeCalledWith(response);
      });
    });

    describe('nextPage is null', () => {
      const state = {
        user: {
          library: {
            tracks: {
              items: {},
              nextPage: null,
            },
          },
        },
      };
      const spotifyApi = {
        getMySavedTracks: jest.fn(() => Promise.resolve({
          body: {
            items: [],
          },
        })),
      };
      const actions = { setSavedTracks: jest.fn() };
      loadSavedTracks()(jest.fn(), () => state, { spotifyApi, actions });

      it('does not call getMySavedTracks', () => {
        expect(spotifyApi.getMySavedTracks).not.toBeCalled();
      });

      it('does not call setSavedTracks', () => {
        expect(actions.setSavedTracks).not.toBeCalled();
      });
    });
  });

  describe('setSavedTracks', () => {
    it('creates non final action', () => {
      const action = setSavedTracks({
        items: [
          {
            track: {
              id: 't1', name: 'Track 1', album: { name: 'Album' }, artists: [{ name: 'Artist' }],
            },
            added_at: 'yesterday',
          },
          {
            track: {
              id: 't2', name: 'Track 2', album: { name: 'Album' }, artists: [{ name: 'Artist' }],
            },
            added_at: 'tomorrow',
          },
        ],
        offset: 40,
        limit: 20,
        total: 500,
        next: 'url/to/next',
      });
      expect(action).toEqual({
        type: SET_SAVED_TRACKS,
        data: {
          items: [
            {
              id: 't1', name: 'Track 1', album: 'Album', artist: 'Artist', addedAt: 'yesterday',
            },
            {
              id: 't2', name: 'Track 2', album: 'Album', artist: 'Artist', addedAt: 'tomorrow',
            },
          ],
          nextPage: { offset: 40, limit: 20 },
          total: 500,
        },
      });
    });

    it('creates final action', () => {
      const action = setSavedTracks({
        items: [
          {
            track: {
              id: 't1', name: 'Track 1', album: { name: 'Album' }, artists: [{ name: 'Artist' }],
            },
            added_at: 'yesterday',
          },
          {
            track: {
              id: 't2', name: 'Track 2', album: { name: 'Album' }, artists: [{ name: 'Artist' }],
            },
            added_at: 'tomorrow',
          },
        ],
        offset: 40,
        limit: 20,
        total: 500,
        next: null,
      });
      expect(action).toEqual({
        type: SET_SAVED_TRACKS,
        data: {
          items: [
            {
              id: 't1', name: 'Track 1', album: 'Album', artist: 'Artist', addedAt: 'yesterday',
            },
            {
              id: 't2', name: 'Track 2', album: 'Album', artist: 'Artist', addedAt: 'tomorrow',
            },
          ],
          nextPage: null,
          total: 500,
        },
      });
    });
  });

  describe('saved tracks reducer', () => {
    it('adds saved tracks', () => {
      const state = savedTracksReducer({
        items: { 1: { id: 1 } },
        nextPage: { offset: 0, limit: 20 },
        total: 0,
      }, {
        type: SET_SAVED_TRACKS,
        data: {
          items: [{ id: 2 }, { id: 3 }],
          nextPage: { offset: 220, limit: 20 },
          total: 500,
        },
      });
      expect(state).toEqual({
        items: {
          1: { id: 1 },
          2: { id: 2, loading: false, failed: false },
          3: { id: 3, loading: false, failed: false },
        },
        nextPage: { offset: 220, limit: 20 },
        total: 500,
      });
    });
  });

  describe('loadSavedAlbums', () => {
    describe('fetch page', () => {
      const state = {
        user: {
          library: {
            albums: {
              items: {},
              nextPage: { offset: 0, limit: 20 },
            },
          },
        },
      };
      const response = {
        items: [{}, {}],
      };
      const spotifyApi = {
        getMySavedAlbums: jest.fn(() => Promise.resolve({
          body: response,
        })),
      };
      const actions = { setSavedAlbums: jest.fn(), setAlbum: jest.fn() };
      loadSavedAlbums()(jest.fn(), () => state, { spotifyApi, actions });

      it('calls getMySavedAlbums', () => {
        expect(spotifyApi.getMySavedAlbums).toBeCalledWith({
          offset: 20,
          limit: 20,
        });
      });

      it('calls setSavedAlbums', () => {
        expect(actions.setSavedAlbums).toBeCalledWith(response);
      });
    });

    describe('nextPage is null', () => {
      const state = {
        user: {
          library: {
            albums: {
              items: {},
              nextPage: null,
            },
          },
        },
      };
      const spotifyApi = {
        getMySavedAlbums: jest.fn(() => Promise.resolve({
          body: {
            items: [],
          },
        })),
      };
      const actions = { setSavedAlbums: jest.fn() };
      loadSavedAlbums()(jest.fn(), () => state, { spotifyApi, actions });

      it('does not call getMySavedAlbums', () => {
        expect(spotifyApi.getMySavedAlbums).not.toBeCalled();
      });

      it('does not call setSavedAlbums', () => {
        expect(actions.setSavedAlbums).not.toBeCalled();
      });
    });
  });

  describe('setSavedAlbums', () => {
    it('creates action', () => {
      const action = setSavedAlbums({
        items: [
          {
            album: {
              id: 'L1', name: 'Album 1', artists: [{ name: 'Artist' }],
            },
            added_at: 'yesterday',
          },
          {
            album: {
              id: 'L2', name: 'Album 2', artists: [{ name: 'Artist' }],
            },
            added_at: 'tomorrow',
          },
        ],
        offset: 40,
        limit: 20,
        total: 500,
        next: 'url/to/next',
      });
      expect(action).toEqual({
        type: SET_SAVED_ALBUMS,
        data: {
          items: [
            {
              id: 'L1', name: 'Album 1', artist: 'Artist', addedAt: 'yesterday',
            },
            {
              id: 'L2', name: 'Album 2', artist: 'Artist', addedAt: 'tomorrow',
            },
          ],
          nextPage: { offset: 40, limit: 20 },
          total: 500,
        },
      });
    });
  });

  describe('saved albums reducer', () => {
    it('adds saved albums', () => {
      const state = savedAlbumsReducer({
        items: { 1: { id: 1 } },
        nextPage: { offset: 0, limit: 20 },
        total: 0,
      }, {
        type: SET_SAVED_ALBUMS,
        data: {
          items: [{ id: 2 }, { id: 3 }],
          nextPage: { offset: 220, limit: 20 },
          total: 500,
        },
      });
      expect(state).toEqual({
        items: {
          1: { id: 1 },
          2: { id: 2, loading: false, failed: false },
          3: { id: 3, loading: false, failed: false },
        },
        nextPage: { offset: 220, limit: 20 },
        total: 500,
      });
    });
  });
});
