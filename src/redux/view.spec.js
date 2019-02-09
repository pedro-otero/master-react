import { viewTrack, viewAlbum, viewArtist } from 'state/view';

describe('View actions', () => {
  describe('View track', () => {
    const track = { albumId: 'L1', artistId: 'R1' };
    const dispatch = jest.fn(() => Promise.resolve(track));
    const loadTrack = jest.fn(() => track);
    const mocks = [jest.fn(), jest.fn()];
    const [loadAlbum, loadArtist] = mocks;
    const actions = { loadTrack, loadAlbum, loadArtist };

    beforeAll(() => {
      const thunk = viewTrack('T1');
      thunk(dispatch, () => ({}), { actions });
    });

    it('calls loadTrack', () => {
      expect(loadTrack).toBeCalledWith('T1');
    });

    it('calls loadAlbum', () => {
      expect(loadAlbum).toBeCalledWith('L1');
    });

    it('calls loadArtist', () => {
      expect(loadArtist).toBeCalledWith('R1');
    });
  });

  describe('View album', () => {
    const album = { artistId: 'R1' };
    const dispatch = jest.fn(() => Promise.resolve(album));
    const mocks = [jest.fn(), jest.fn()];
    const [loadAlbum, loadArtist] = mocks;
    const actions = { loadAlbum, loadArtist };

    beforeAll(() => {
      const thunk = viewAlbum('A1');
      thunk(dispatch, () => ({}), { actions });
    });

    it('calls loadAlbum', () => {
      expect(loadAlbum).toBeCalledWith('A1');
    });

    it('calls loadArtist', () => {
      expect(loadArtist).toBeCalledWith('R1');
    });
  });

  describe('View artist', () => {
    const dispatch = jest.fn(() => Promise.resolve());
    const mocks = [jest.fn(), jest.fn()];
    const [loadArtist, loadArtistAlbums] = mocks;
    const actions = { loadArtist, loadArtistAlbums };

    beforeAll(() => {
      const thunk = viewArtist('A1');
      thunk(dispatch, () => ({}), { actions });
    });

    it('calls loadArtist', () => {
      expect(loadArtist).toBeCalledWith('A1');
    });

    it('calls loadArtistAlbums', () => {
      expect(loadArtistAlbums).toBeCalledWith('A1');
    });
  });
});
