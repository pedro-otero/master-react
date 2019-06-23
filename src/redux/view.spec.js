import { viewTrack, viewAlbum, viewArtist, reduce } from 'state/view';

describe('View actions', () => {
  describe('View track', () => {
    const track = { albumId: 'L1', artistId: 'R1' };
    const dispatch = jest.fn(() => Promise.resolve(track));
    const loadTrack = jest.fn(() => track);
    const mocks = [jest.fn(), jest.fn(), jest.fn()];
    const [loadAlbum, loadArtist, setAlbumInView] = mocks;
    const actions = {
      loadTrack, loadAlbum, loadArtist, setAlbumInView,
    };

    beforeAll(() => {
      const thunk = viewTrack('T1');
      thunk(dispatch, () => ({}), { actions });
    });

    it('loads track', () => {
      expect(loadTrack).toBeCalledWith('T1');
    });

    it('loads album', () => {
      expect(loadAlbum).toBeCalledWith('L1');
    });

    it('loads artist', () => {
      expect(loadArtist).toBeCalledWith('R1');
    });

    it('sets album in view', () => {
      expect(setAlbumInView).toBeCalledWith('L1');
    });
  });

  describe('View album', () => {
    const album = { artistId: 'R1' };
    const dispatch = jest.fn(() => Promise.resolve(album));
    const mocks = [jest.fn(), jest.fn(), jest.fn()];
    const [loadAlbum, loadArtist, setAlbumInView] = mocks;
    const actions = { loadAlbum, loadArtist, setAlbumInView };

    beforeAll(() => {
      const thunk = viewAlbum('A1');
      thunk(dispatch, () => ({}), { actions });
    });

    it('loads album', () => {
      expect(loadAlbum).toBeCalledWith('A1');
    });

    it('loads artist', () => {
      expect(loadArtist).toBeCalledWith('R1');
    });

    it('sets album in view', () => {
      expect(setAlbumInView).toBeCalledWith('A1');
    });
  });

  describe('View artist', () => {
    const dispatch = jest.fn(() => Promise.resolve());
    const mocks = [jest.fn(), jest.fn()];
    const [loadArtist] = mocks;
    const actions = { loadArtist };

    beforeAll(() => {
      const thunk = viewArtist('A1');
      thunk(dispatch, () => ({}), { actions });
    });

    it('loads artist', () => {
      expect(loadArtist).toBeCalledWith('A1');
    });
  });

  describe('Reducer', () => {
    it('sets an album in view', () => {
      const state = reduce(undefined, {
        type: 'SET_ALBUM_IN_VIEW',
        data: {
          id: 'ALBUM_ID',
        },
      });

      expect(state).toEqual('ALBUM_ID');
    });

    it('clears an album from view', () => {
      const state = reduce('PREVIOUSLY_SET', {
        type: 'CLEAR_ALBUM_IN_VIEW',
      });

      expect(state).toEqual(null);
    });
  });
});
